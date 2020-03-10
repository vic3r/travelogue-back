package main

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
	"github.com/vic3r/travelogue-back/places/internal"
	"github.com/vic3r/travelogue-back/places/internal/controllers"
	"github.com/vic3r/travelogue-back/places/internal/controllers/usecases"
	"github.com/vic3r/travelogue-back/places/internal/controllers/usecases/repository/factory"
	"github.com/vic3r/travelogue-back/places/models"
)

func main() {

	viper.SetConfigName("default")

	// Set the path to look for the configurations file
	viper.AddConfigPath("../config")

	// Enable VIPER to read Environment Variables
	viper.AutomaticEnv()

	viper.SetConfigType("yaml")
	var configuration models.Configuration
	if err := viper.ReadInConfig(); err != nil {
		fmt.Printf("Error reading config file, %s", err)
	}

	err := viper.Unmarshal(&configuration)
	if err != nil {
		log.Fatalf("Unable to decode into struct, %v", err)
	}

	domainConfig := configuration.Domain[0].Places
	serverConfig := domainConfig.Server
	repositoryConfig := domainConfig.Repository
	repo, err := factory.Create(repositoryConfig)
	if err != nil {
		log.Fatalf("failed to create repository: %v", err)
	}
	usecase, err := usecases.New(repo)
	if err != nil {
		log.Fatalf("failed to create usecase: %v", err)
	}
	controller, err := controllers.New(usecase)
	if err != nil {
		log.Fatalf("failed to create controller: %v", err)
	}
	domain, err := internal.NewDomain(controller)
	if err != nil {
		log.Fatalf("failed to create domain: %v", err)
	}

	domain.SetRoutes()
	domain.Router.Logger.Fatal(domain.Router.Start(fmt.Sprintf("%s:%d", serverConfig.Host, serverConfig.Port)))
}
