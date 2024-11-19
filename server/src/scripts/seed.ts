import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import UserModel from '../model/UserModel';
import UserDetailsModel from '../model/UserDetailsModel';
dotenv.config()

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || '';

mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const generateFakeUsers = async (count: number) => {
    await UserDetailsModel.deleteMany()
    await UserModel.deleteMany()
    // Generate fake user details
    const fakeUserDetails = Array.from({ length: count }).map(() => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthdate: faker.date.past(),
        bio: faker.lorem.sentence(),
        location: faker.location.city(),
        interests: faker.helpers.arrayElements(['sports', 'reading', 'coding']),
        visitingList: faker.helpers.arrayElements(['Paris', 'London']),
        gender: faker.person.sexType(),
        socialMediaLinks: { platform: 'Twitter', link: faker.internet.url() },
        languagesSpoken: faker.helpers.arrayElements(['English', 'Spanish']),
        avatarUrl: faker.image.avatar(),
    }));

    // Insert fake user details and fetch their `_id`s
    const insertedUserDetails = await UserDetailsModel.insertMany(fakeUserDetails);

    // Generate fake users with references to the inserted user details
    const fakeUsers = insertedUserDetails.map((userDetails) => ({
        username: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password(),
        createdAt: faker.date.past(),
        userDetails: userDetails._id // Properly reference `_id`
    }));

    await UserModel.insertMany(fakeUsers);
    console.log(`${count} fake users created!`);
};

// Run Seeder
const runSeeder = async () => {
    try {
        await generateFakeUsers(50); // Adjust the count as needed
    } catch (err) {
        console.error('Error while seeding data:', err);
    } finally {
        mongoose.connection.close();
    }
};

runSeeder();
