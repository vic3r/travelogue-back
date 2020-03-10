package usecases

import (
	"errors"

	"github.com/labstack/echo"
	"github.com/vic3r/travelogue-back/places/internal/controllers"
	"github.com/vic3r/travelogue-back/places/internal/controllers/usecases/repository"
	"github.com/vic3r/travelogue-back/places/models"
)

type defaultUseCases struct {
	repository repository.Repository
}

var _ controllers.Usecases = &defaultUseCases{}

func New(repository repository.Repository) (controllers.Usecases, error) {
	if repository == nil {
		return nil, errors.New("undefined repository")
	}

	return &defaultUseCases{repository}, nil
}

func (u *defaultUseCases) GetCountries(ctx echo.Context) ([]*models.Country, error) {
	return u.repository.GetCountries(ctx)
}
