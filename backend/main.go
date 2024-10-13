package main

import (
	"context"
	"log"
	"net/http"

	"backend/auth"
	"backend/handlers"
	"backend/middleware"

	"cloud.google.com/go/firestore"
	"github.com/go-redis/redis/v8"
	"github.com/rs/cors"
	"google.golang.org/api/option"
)

func main() {
	// Initialize Firebase
	firebaseAuth, err := auth.InitializeFirebase()
	if err != nil {
		log.Fatalf("Error initializing Firebase: %v", err)
	}

	// Initialize Firestore client
	ctx := context.Background()
	sa := option.WithCredentialsFile("silicon-valley-garage-firebase-adminsdk-5ugqy-f4fe78d92d.json")
	firestoreClient, err := firestore.NewClient(ctx, "silicon-valley-garage", sa)
	if err != nil {
		log.Fatalf("Error initializing Firestore client: %v", err)
	}
	defer firestoreClient.Close()

	// Initialize Redis client
	redisClient := redis.NewClient(&redis.Options{
		Addr: "localhost:6379", // Update with your Redis server address
	})

	// Create handlers
	rentalPropertyHandler := handlers.NewRentalPropertyHandler(firestoreClient, redisClient)

	// Create a new ServeMux
	mux := http.NewServeMux()

	// Register public routes
	mux.Handle("/api/public/rental-properties", middleware.PublicMiddleware(http.HandlerFunc(rentalPropertyHandler.GetPublicRentalProperties)))

	// Register protected routes
	mux.Handle("/api/user", middleware.AuthMiddleware(firebaseAuth, http.HandlerFunc(handlers.GetUserHandler)))
	mux.Handle("/api/rental-properties", middleware.AuthMiddleware(firebaseAuth, http.HandlerFunc(rentalPropertyHandler.GetRentalProperties)))
	mux.Handle("/api/create-dummy-properties", middleware.AuthMiddleware(firebaseAuth, http.HandlerFunc(rentalPropertyHandler.CreateDummyRentalProperties)))

	// Create a CORS middleware
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Add your frontend origin
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	// Wrap the mux with the LoggerMiddleware and CORS middleware
	handler := c.Handler(middleware.LoggerMiddleware(mux))

	// Start the server
	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
