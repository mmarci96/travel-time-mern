output "region" {
  description = "AWS region"
  value       = var.aws_region
}

output "repositories" {
  description = "Repository Names"
  value       = var.ecr_repositories
}

output "ecr_repository_urls" {
  value       = { for repo, details in aws_ecr_repository.repositories : repo => details.repository_url }
  description = "The URLs of the ECR repositories."
}
