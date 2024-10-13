package models

type RentalProperty struct {
	ID          string   `json:"id" firestore:"id"`
	Name        string   `json:"name" firestore:"name"`
	Description string   `json:"description" firestore:"description"`
	Address     string   `json:"address" firestore:"address"`
	Price       float64  `json:"price" firestore:"price"`
	Bedrooms    int      `json:"bedrooms" firestore:"bedrooms"`
	Bathrooms   int      `json:"bathrooms" firestore:"bathrooms"`
	Area        float64  `json:"area" firestore:"area"`
	ImageURLs   []string `json:"imageUrls" firestore:"imageUrls"`
}
