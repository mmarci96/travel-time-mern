variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "development"
}

variable "project_name" {
  description = "Project name for tagging"
  type        = string
}

variable "region" {
  type    = string
  default = "eu-north-1"
}


variable "ecr_repositories" {
  type        = map(string)
  description = "Map of repository names and their configurations"
}

variable "docker_images" {
  description = "Map of Docker image names to their corresponding directories"
  type = map(object({
    directory       = string
    repository_name = string
  }))
}
