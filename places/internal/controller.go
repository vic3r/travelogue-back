package internal

import (
	"github.com/labstack/echo"
)

type Controller interface {
	GetCountries(c echo.Context) error
}
