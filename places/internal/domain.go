package internal

import (
	"errors"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type domain struct {
	Router     *echo.Echo
	controller Controller
}

func NewDomain(controller Controller) (*domain, error) {
	if controller == nil {
		return nil, errors.New("undefined controller")
	}
	router := echo.New()
	router.Use(middleware.Logger())
	router.Use(middleware.Recover())
	return &domain{router, controller}, nil
}

func (d *domain) SetRoutes() {
	d.Router.GET("/countries", d.controller.GetCountries)
}
