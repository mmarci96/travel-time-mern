# Travel Time MERN Stack (v2)

![GitHub repo size](https://img.shields.io/github/repo-size/mmarci96/travel-time-mern?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/mmarci96/travel-time-mern?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/mmarci96/travel-time-mern?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/mmarci96/travel-time-mern?style=for-the-badge)

A social media app about traveling with a **TypeScript Express backend** and **React frontend** with a **MongoDB database**.

## Table of Contents

1. [Collaboration](#collaboration)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Quick Start](#quick-start)
   - [Prerequisites](#prerequisites)
   - [Docker Compose Setup](#docker-compose-setup)
   - [Accessing the Application](#accessing-the-application)
5. [Required Environment Variables](#required-environment-variables)
6. [Optional Features](#optional-features)
   - [Image Upload - AWS S3 Bucket Setup & Cleanup Guide](#image-upload---aws-s3-bucket-setup--cleanup-guide)
     - [Requirements](#requirements)
     - [Setup Instructions](#setup-instructions)
7. [Naming Conventions](#naming-conventions)

## Collaboration

- **dr. Ditrói-Tóth Zsuzsa**  
  GitHub: [DTZsuzsi](https://img.shields.io/github.com/DTZsuzsi)

  [![LinkedIn][linkedin-shield]][linkedin-url-d]

- **Sárosdi Márton**  
  GitHub: [mmarci96](https://github.com/mmarci96)  
   Email: sarosdimarci@gmail.com  
  [![LinkedIn][linkedin-shield]][linkedin-url-ms]

## Features

We started to develop a social website focused on travelling and sharing experience. After registration the users can:

- Post about their travels.
- Follow fellow travellers.
- Like, comment on others' posts.
- Search for posts.

We implemented a **basic security system** and **picture sharing**.

Technologies & Tools Used:   
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-623CE4?style=for-the-badge&logo=terraform&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
---

## Quick start
### Prerequisites

Ensure the following are installed on your system:

![Node.js](https://img.shields.io/badge/Node.js-16%2B-green?style=for-the-badge&logo=node.js)
![NPM](https://img.shields.io/badge/npm-7%2B-blue?style=for-the-badge&logo=npm)
![Docker](https://img.shields.io/badge/Docker-Latest-blue?style=for-the-badge&logo=docker)

### Docker Compose setup

1. Verify installations:
    ```bash
    node -v
    npm -v
    docker -v
    ```
2. Copy the `.env.sample` file and rename it to `.env`:

   ```bash
   cp .env.sample .env
   ```

3. Open the `.env` file in your favorite text editor and fill it out with your details. The **Docker Compose** setup will configure a **MongoDB** Docker image locally, so the `MONGO_URI` value can remain as in the sample. To use the image upload feature, you will need to create an **S3 bucket on AWS** and set it to public.

4. To run the application, simply execute:

   ```bash
   docker-compose up --build -d
   ```

   This will:

   - Set up the MongoDB database.
   - Create a build for frontend from **Vite build** and an **NGINX as reverse proxy server**.
   - Build the backend server.
   - Purge and populate the database with **Faker-generated data**.

### Accessing the Application

- **Docker**: The app's front-end is available at `http://localhost`.
- Use your credentials or the seeded user data to log in.
- Sample users with default credentials:
  - Email: `testuser@example.com`
  - Password: `password123`

---

### Required Environment Variables

In your `.env` file, make sure to set the following variables:

- `MONGO_URI`: **MongoDB** connection string. Use `mongodb://localhost:27017` if you set up the database locally using **Docker**. Alternatively, create a free cluster with **MongoDB Atlas** and use the connection URI.
- `JWT_SECRET`: Secret key for JWT authentication.
- `JWT_REFRESH_SECRET_KEY`: Secret key for JWT refresh tokens. Generate one using:

  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

### Optional Features

### Image Upload - AWS S3 Bucket Setup & Cleanup Guide

### Requirements

Before proceeding, ensure you have:

- ✅  **AWS CLI** installed and configured
- ✅ **An AWS IAM user** with the required permissions to create **S3 buckets**, **IAM policies**, and **roles**

### Setup Instructions

1. **Choose a unique S3 bucket name** and add it to your `.env` file:
   ```sh
   AWS_BUCKET_NAME=your-unique-bucket-name
   ```
2. Make setup scripts executable (if not done already):
   ```bash
   chmod +x ./setup-scripts/aws_s3_setup.sh
   chmod +x ./setup-scripts/set_temp_credentials.sh
   chmod +x ./setup-scripts/destroy_aws_resources.sh
   ```
3. Run the **S3 setup script** to create the bucket, IAM policy, and role:
   ```bash
   ./setup-scripts/aws_s3_setup.sh
   ```
4. Assume the **IAM role** to obtain AWS credentials:
   ```bash
   source ./setup-scripts/set_temp_credentials.sh
   ```
5. Cleanup after use:

   ```bash
   unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN

   ./setup-scripts/destroy_aws_resources.sh
   ```

---

## Naming Conventions

- **MongoDB**: `snake_case`
- **Branches**: `hyphen-separated`
- **JSX/TypeScript**: `camelCase`, `Capital`
- **Models**: `Capital`, singular form

<!-- ACKNOWLEDGMENTS -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url-d]: https://www.linkedin.com/in/zsuzsa-ditroi-toth-8b339a54/
[linkedin-url-ms]: https://www.linkedin.com/in/maton-sarosdi
