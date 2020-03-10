package controllers

import (
	"errors"
	"net/http"

	"github.com/labstack/echo"
	"github.com/vic3r/travelogue-back/places/internal"
)

type controller struct {
	usecases Usecases
}

var _ internal.Controller = &controller{}

func New(usecases Usecases) (internal.Controller, error) {
	if usecases == nil {
		return nil, errors.New("usecases undefined")
	}

	return &controller{usecases}, nil
}

func (c *controller) GetCountries(ctx echo.Context) error {

	countries, err := c.usecases.GetCountries(ctx)
	if err != nil {
		return ctx.String(http.StatusNotFound, "countries not found")
	}

	return ctx.JSON(http.StatusOK, countries)
}
