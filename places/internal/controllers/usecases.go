package controllers

import (
	"github.com/labstack/echo"
	"github.com/vic3r/travelogue-back/places/models"
)

type Usecases interface {
	GetCountries(echo.Context) ([]*models.Country, error)
}
