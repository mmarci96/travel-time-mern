output "client_external_ip" {
  value       = kubernetes_service.traveltime_client.status[0].load_balancer[0].ingress[0].hostname
  description = "External IP for the Client service"
}

