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
output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "eks_module_arn_one" {
  value = module.eks.eks_module_outputs.eks_managed_node_groups.one.iam_role_arn
}

output "eks_module_arn_two" {
  value = module.eks.eks_module_outputs.eks_managed_node_groups.two.iam_role_arn
}

