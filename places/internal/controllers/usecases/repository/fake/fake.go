package fake

import (
	"fmt"

	"github.com/labstack/echo"
	"github.com/vic3r/travelogue-back/places/internal/controllers/usecases/repository"
	"github.com/vic3r/travelogue-back/places/models"
)

type fake struct{}

var _ repository.Repository = &fake{}

func New() (repository.Repository, error) {
	return &fake{}, nil
}

func (f *fake) GetCountries(ctx echo.Context) ([]*models.Country, error) {
	fmt.Println("fake get countries")

	return nil, nil
}
