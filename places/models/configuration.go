package models

type Configuration struct {
	Domain []DomainConfiguration
}

type DomainConfiguration struct {
	Places SingleDomain
}

type SingleDomain struct {
	Server     ServerConfig
	Repository RepositoryConfig
}

type ServerConfig struct {
	Host string
	Port int
}

type RepositoryConfig struct {
	Implementation string
	Host           string
	Port           int
	Namespace      string
}
