
# For client repository
output "client_repository_url" {
  value = aws_ecr_repository.traveltime-client-ecr.repository_url
}

output "client_repository_arn" {
  value = aws_ecr_repository.traveltime-client-ecr.arn
}

# For server repository
output "server_repository_url" {
  value = aws_ecr_repository.traveltime-server-ecr.repository_url
}

output "server_repository_arn" {
  value = aws_ecr_repository.traveltime-server-ecr.arn
}


output "repositories" {
  description = "Repository Names"
  value       = var.ecr_repositories
}

output "ecr_repository_urls" {
  value       = { for repo, details in aws_ecr_repository.repositories : repo => details.repository_url }
  description = "The URLs of the ECR repositories."
}
