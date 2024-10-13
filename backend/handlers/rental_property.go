package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"backend/models"

	"cloud.google.com/go/firestore"
	"github.com/go-redis/redis/v8"
	"google.golang.org/api/iterator"
)

type RentalPropertyHandler struct {
	firestoreClient *firestore.Client
	redisClient     *redis.Client
}

func NewRentalPropertyHandler(firestoreClient *firestore.Client, redisClient *redis.Client) *RentalPropertyHandler {
	return &RentalPropertyHandler{
		firestoreClient: firestoreClient,
		redisClient:     redisClient,
	}
}

func (h *RentalPropertyHandler) GetRentalProperties(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(string)
	h.getRentalPropertiesInternal(w, r, "rental_properties_"+userID)
}

func (h *RentalPropertyHandler) GetPublicRentalProperties(w http.ResponseWriter, r *http.Request) {
	h.getRentalPropertiesInternal(w, r, "public_rental_properties")
}

func (h *RentalPropertyHandler) getRentalPropertiesInternal(w http.ResponseWriter, r *http.Request, cacheKey string) {
	// Try to get the data from Redis cache
	cachedData, err := h.redisClient.Get(r.Context(), cacheKey).Result()
	if err == nil {
		// Cache hit, return the cached data
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(cachedData))
		return
	}

	// Cache miss, fetch data from Firestore
	ctx := context.Background()
	iter := h.firestoreClient.Collection("rental_properties").Documents(ctx)
	var properties []models.RentalProperty

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			// Check if the error is due to the database not existing
			if strings.Contains(err.Error(), "database (default) does not exist") {
				log.Printf("Database does not exist: %v", err)
				break // Exit the loop, returning an empty array
			}
			log.Printf("Error fetching rental properties: %v", err)
			http.Error(w, "Error fetching rental properties", http.StatusInternalServerError)
			return
		}

		var property models.RentalProperty
		if err := doc.DataTo(&property); err != nil {
			log.Printf("Error parsing rental property data: %v", err)
			continue // Skip this property and continue with the next one
		}
		properties = append(properties, property)
	}

	// Marshal the data to JSON (this will be an empty array if no properties were found)
	jsonData, err := json.Marshal(properties)
	if err != nil {
		log.Printf("Error marshaling data: %v", err)
		http.Error(w, "Error marshaling data", http.StatusInternalServerError)
		return
	}

	// Store the data in Redis cache with an expiration time (e.g., 5 minutes)
	if err := h.redisClient.Set(r.Context(), cacheKey, string(jsonData), 5*time.Minute).Err(); err != nil {
		log.Printf("Error caching data in Redis: %v", err)
		// Continue without caching, as we can still return the data to the client
	}

	// Send the response
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}

func (h *RentalPropertyHandler) CreateDummyRentalProperties(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get the user ID from the context (set by the auth middleware)
	userID := r.Context().Value("userID").(string)

	// Create dummy data
	dummyProperties := []models.RentalProperty{
		{
			ID:          "dummy1",
			Name:        "Cozy Apartment",
			Description: "A beautiful cozy apartment in the heart of the city",
			Address:     "123 Main St, Cityville, State 12345",
			Price:       1500.00,
			Bedrooms:    2,
			Bathrooms:   1,
			Area:        800.0,
			ImageURLs:   []string{"https://example.com/image1.jpg", "https://example.com/image2.jpg"},
		},
		{
			ID:          "dummy2",
			Name:        "Spacious House",
			Description: "A large family home with a beautiful garden",
			Address:     "456 Oak Ave, Townsville, State 67890",
			Price:       2500.00,
			Bedrooms:    4,
			Bathrooms:   3,
			Area:        2000.0,
			ImageURLs:   []string{"https://example.com/image3.jpg", "https://example.com/image4.jpg"},
		},
	}

	// Add dummy data to Firestore
	ctx := context.Background()
	for _, property := range dummyProperties {
		_, _, err := h.firestoreClient.Collection("rental_properties").Add(ctx, property)
		if err != nil {
			log.Printf("Error adding dummy property: %v", err)
			http.Error(w, "Error creating dummy data", http.StatusInternalServerError)
			return
		}
	}

	// Clear the cache for rental properties
	h.redisClient.Del(ctx, "rental_properties_"+userID)
	h.redisClient.Del(ctx, "public_rental_properties")

	// Send a success response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Dummy rental properties created successfully"})
}
