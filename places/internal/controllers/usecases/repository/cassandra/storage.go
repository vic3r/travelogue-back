package cassandra

import (
	"github.com/gocql/gocql"
	"github.com/labstack/echo"
	"github.com/vic3r/travelogue-back/places/internal/controllers/usecases/repository"
	"github.com/vic3r/travelogue-back/places/models"
)

type storage struct {
	session *gocql.Session
}

var _ repository.Repository = &storage{}

func New(keyspace, host string, port int) (repository.Repository, error) {
	cluster := gocql.NewCluster(host)
	cluster.Port = port
	cluster.Keyspace = keyspace
	cluster.Consistency = gocql.All
	session, err := cluster.CreateSession()
	if err != nil {
		return nil, err
	}

	return &storage{session}, nil
}

func (s *storage) GetCountries(ctx echo.Context) ([]*models.Country, error) {
	return getCountries(ctx, s.session)
}

func getCountries(ctx echo.Context, session *gocql.Session) ([]*models.Country, error) {
	row := map[string]interface{}{}
	countries := make([]*models.Country, 0)
	iter := session.Query("SELECT * FROM country;").Iter()
	for iter.MapScan(row) {
		country := &models.Country{
			ID:          row["id"].(string),
			Name:        row["name"].(string),
			Description: row["description"].(string),
		}
		countries = append(countries, country)
		row = map[string]interface{}{}
	}

	return countries, nil
}
