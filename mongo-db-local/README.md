
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
