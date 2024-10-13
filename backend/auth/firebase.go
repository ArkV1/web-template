package auth

import (
	"context"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

func InitializeFirebase() (*auth.Client, error) {
	ctx := context.Background()

	// Reference the Firebase Admin SDK JSON file
	sa := option.WithCredentialsFile("silicon-valley-garage-firebase-adminsdk-5ugqy-f4fe78d92d.json")

	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		return nil, err
	}

	client, err := app.Auth(ctx)
	if err != nil {
		return nil, err
	}

	return client, nil
}
