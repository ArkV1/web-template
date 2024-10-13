package handlers

import (
	"encoding/json"
	"net/http"
)

func GetUserHandler(w http.ResponseWriter, r *http.Request) {
	// Get the user ID from the context (set by the auth middleware)
	userID := r.Context().Value("userID").(string)

	// Create a response
	response := map[string]string{
		"message": "Authenticated successfully",
		"userID":  userID,
	}

	// Send the response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
