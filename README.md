# Travel Time MERN stack (v2)

A social media app about traveling with typescript express backend and react frontend with mongo database

# Database:

To start the application you need to first create a cluster on mongodb to run it locally

# Jwt:

To create a secret key for serving session token you can run the following command:

    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Enviroment:
The upload path will be an aws bucket for storing the images upladed, for now just save it locally,
using absolute path is highly recomended c:
Copy the .env.sample and create your own .env so far it should look something like this:

    MONGO_URL=mongodb+srv://<username>:<password>@<YourCluster>.mongodb.net/?retryWrites=true&w=majority
    JWT_SECRET_KEY=c77d3f18c1ad41781353648cfa7d084468aef13ef4bc9b1d7f7394a8cf5f65fe
    UPLOAD_PATH=/YOUR/ABSOLUTE/PATH/travel-time-mern/server/img_uploads_temp


# Install node packages
Make sure to step into each sub folder and run:

    npm install

