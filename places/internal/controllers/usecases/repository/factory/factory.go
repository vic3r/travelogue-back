package factory

import (
	"errors"
	"fmt"

	"github.com/vic3r/travelogue-back/places/models"

	"github.com/vic3r/travelogue-back/places/internal/controllers/usecases/repository/cassandra"
	"github.com/vic3r/travelogue-back/places/internal/controllers/usecases/repository/fake"

	"github.com/vic3r/travelogue-back/places/internal/controllers/usecases/repository"
)

var factories = map[string]bool{
	"cassandra": true,
	"fake":      true,
}

var createdFactories = map[string]repository.Repository{}

func Create(config models.RepositoryConfig) (repository.Repository, error) {
	implementation := config.Implementation
	instance := factories[implementation]
	if instance {
		keyspace := config.Namespace
		host := config.Host
		port := config.Port
		switch implementation {
		case "cassandra":
			if createdFactories[implementation] == nil {
				clientInstance, err := cassandra.New(keyspace, host, port)
				if err != nil {
					return nil, err
				}
				fmt.Println("cassandra client created")
				createdFactories[implementation] = clientInstance
			}
		default:
			if createdFactories[implementation] == nil {
				clientInstance, err := fake.New()
				if err != nil {
					return nil, err
				}
				fmt.Println("fake client created")
				createdFactories[implementation] = clientInstance
			}
		}

		return createdFactories[implementation], nil
	}

	return nil, errors.New("error creating repository")
}
