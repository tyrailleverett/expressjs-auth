terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }
  }
}

provider "docker" {}

variable "DB_PASSWORD" {
  description = "Database password"
  type        = string
  sensitive   = true
}


resource "docker_image" "postgres_dev" {
  name         = "postgres:14-alpine"
  keep_locally = false
}

resource "docker_container" "postgres_dev" {
  image = docker_image.postgres_dev.latest
  name  = "postgres_dev"
  ports {
    internal = 5432
    external = 5432
  }
  restart = "always"
  env     = ["POSTGRES_PASSWORD=${var.DB_PASSWORD}"]
  volumes {
    container_path = "/var/lib/postgresql/data"
  }
}

resource "docker_image" "postgres_test" {
  name         = "postgres:14-alpine"
  keep_locally = false
}

resource "docker_container" "postgres_test" {
  image   = docker_image.postgres_test.latest
  name    = "postgres_test"
  restart = "always"
  env     = ["POSTGRES_PASSWORD=${var.DB_PASSWORD}"]
  ports {
    internal = 5432
    external = 5433
  }

}