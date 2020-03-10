package repository

import (
	"github.com/labstack/echo"
	"github.com/vic3r/travelogue-back/places/models"
)

type Repository interface {
	GetCountries(echo.Context) ([]*models.Country, error)
}
