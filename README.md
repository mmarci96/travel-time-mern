# Travel Time MERN Stack (v2)

A social media app about traveling with a TypeScript Express backend and React frontend with a MongoDB database.

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Required Environment Variables](#required-environment-variables)
4. [Docker](#docker)
    - [Quick Start](#quick-start)
    - [Accessing the Application](#accessing-the-application)
5. [Development](#development)
    - [Start](#start)
    - [Accessing the Application](#accessing-the-application-1)
6. [Database Seeding](#database-seeding)
7. [Troubleshooting](#troubleshooting)
8. [Naming Conventions](#naming-conventions)

## Collaboration

- **dr. Ditrói-Tóth Zsuzsa**   
  GitHub: https://github.com/DTZsuzsi  
  [![LinkedIn][linkedin-shield]][linkedin-url-d]
- **Sárosdi Márton**  
  GitHub: https://github.com/mmarci96  
  Email: sarosdimarci@gmail.com  
  [![LinkedIn][linkedin-shield]][linkedin-url-ms]
 
  

## Features

We started to develop a social website focused on travelling and sharing experience. After registration the users can:
- post about their travels,
- follow fellow travellers,
- like, comment others' posts,
- search for countries, posts.

We implemented basic security system and picture sharing.

### Prerequisites

Ensure the following are installed on your system:

- **Node.js**: Version 16.x or higher.
- **npm**: Version 7.x or higher.
- **Docker**: Latest version for your OS.

Verify installations:

```bash
node -v
npm -v
docker -v
```

---

### Required Environment Variables

In your `.env` file, make sure to set the following variables:

- `MONGO_URI`: MongoDB connection string. Use `mongodb://localhost:27017` if you set up the database locally using Docker. Alternatively, create a free cluster with MongoDB Atlas and use the connection URI.
- `JWT_SECRET`: Secret key for JWT authentication.
- `JWT_REFRESH_SECRET_KEY`: Secret key for JWT refresh tokens. Generate one using:

  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

### Optional Features

### Image upload - AWS S3 Bucket Setup & Cleanup Guide

### 📌 Requirements  
Before proceeding, ensure you have:  
- ✅ **AWS CLI** installed and configured  
- ✅ **An AWS IAM user** with the required permissions to create S3 buckets, IAM policies, and roles  

### 🚀 Setup Instructions  

1. **Choose a unique S3 bucket name** and add it to your `.env` file:  
   ```sh
   AWS_BUCKET_NAME=your-unique-bucket-name
2. Make setup scrips executable (if not done already):
    ```bash
    chmod +x ./setup-scripts/aws_s3_setup.sh
    chmod +x ./setup-scripts/set_temp_credentials.sh
    chmod +x ./setup-scripts/destroy_aws_resources.sh
    ```
3. Run the S3 setup script to create the bucket, IAM policy, and role:
    ```bash
    ./setup-scripts/aws_s3_setup.sh
    ```
4. Assume the IAM role to obtain AWS credentials:
    ```bash
    source ./setup-scripts/set_temp_credentials.sh
    ```
5. Cleanup after use:
    ```bash
    unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN

    ./setup-scripts/destroy_aws_resources.sh

    ```

---

## Docker

### Quick Start

1. Copy the `.env.sample` file and rename it to `.env`:

   ```bash
   cp .env.sample .env
   ```

2. Open the `.env` file in your favorite text editor and fill it out with your details. The Docker Compose setup will configure a MongoDB Docker image locally, so the `MONGO_URI` value can remain as in the sample. To use the image upload feature, you will need to create an S3 bucket on AWS and set it to public.

3. To run the application, simply execute:

   ```bash
   docker-compose up --build -d
   ```

   This will:
   - Download a MongoDB image if not already present.
   - Set up the database.
   - Purge and populate the database with Faker-generated data.

### Accessing the Application

- **Docker**: The app's front-end is available at `http://localhost`.
- Use your credentials or the seeded user data to log in.

---

## Development

### Start

1. Install the npm packages:

   ```bash
   cd server
   npm install

   cd ../client
   npm install

   cd ..
   ```

2. The server expects the `.env` file to be in its directory, so set up the file by copying the sample:

   ```bash
   cp .env.sample server/.env
   ```

3. For development, we utilized MongoDB Atlas, a cloud-based database service that provides a scalable and secure MongoDB instance. For local development, you can also run a MongoDB instance using Docker:

   ```bash
   cd mongo-db-local

   docker-compose up --build -d
   ```

   Use the following `MONGO_URI` for local development:

   ```env
   MONGO_URI=mongodb://localhost:27017
   ```

4. If you are on a Unix-based operating system, there is a simple bash script to start the application locally:

   ```bash
   chmod +x RUN.sh
   ./RUN.sh
   ```

   For other systems, spawn two terminal sessions and run:

   ```bash
   cd server
   npm run dev
   ```

   Then, in another terminal:

   ```bash
   cd client
   npm run dev
   ```

### Accessing the Application

- **Local Development**: The front-end is available at the Vite default URL: `http://localhost:5173`.
- Use your credentials or the seeded user data to log in.

---

## Database Seeding

The seeded database includes:

- Sample users with default credentials:
  - Email: `testuser@example.com`
  - Password: `password123`
- Sample travel posts with randomized data.

---

## Troubleshooting

- **Port Conflict**: If `localhost:27017` or `localhost:5173` is already in use, stop the conflicting process or change the port in the `.env` file.

  ```bash
  sudo lsof -i :27017
  sudo kill -9 <PID>
  ```

- **Modules Not Found**: Reinstall dependencies:

  ```bash
  rm -rf node_modules
  npm install
  ```

- **Resetting the Database**: If the database contains unwanted data, restart with a clean slate:

  ```bash
  docker-compose down -v
  docker-compose up --build -d
  ```

---

## Naming Conventions

- **MongoDB**: `snake_case`
- **Branches**: `hyphen-separated`
- **JSX/TypeScript**: `camelCase`, `Capital`
- **Models**: `Capital`, singular form


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/m%C3%A1t%C3%A9-pojbics/
[linkedin-url-d]: https://www.linkedin.com/in/zsuzsa-ditroi-toth-8b339a54/
[linkedin-url-ms]: https://www.linkedin.com/in/maton-sarosdi

