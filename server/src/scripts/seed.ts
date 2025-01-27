import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { UserModel } from '../model/UserModel';
import { UserDetailsModel } from '../model/UserDetailsModel';
import { PostModel } from '../model/PostModel';
import { CommentModel } from '../model/CommentModel';
import { FollowModel } from '../model/FollowModel';
import { LikeModel } from '../model/LikeModel';

dotenv.config();

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || '';

mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const generateFakeUsers = async (count: number) => {
    await UserDetailsModel.deleteMany();
    await UserModel.deleteMany();
    // Generate fake user details
    const fakeUserDetails = Array.from({ length: count }).map(() => ({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        birthdate: faker.date.past(),
        bio: faker.lorem.sentence(),
        location: faker.location.city(),
        interests: faker.helpers.arrayElements(['sports', 'reading', 'coding']),
        visiting_list: faker.helpers.arrayElements(['Paris', 'London']),
        gender: faker.person.sexType(),
        social_media_links: { platform: 'Twitter', link: faker.internet.url() },
        languages_spoken: faker.helpers.arrayElements(['English', 'Spanish']),
        avatar_url: faker.image.avatar(),
    }));

    // Insert fake user details and fetch their `_id`s
    const insertedUserDetails =
        await UserDetailsModel.insertMany(fakeUserDetails);

    // Generate fake users with references to the inserted user details
    const fakeUsers = insertedUserDetails.map((userDetails) => ({
        username: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password(),
        createdAt: faker.date.past(),
        user_details: userDetails._id, // Properly reference `_id`
    }));

    console.log(`${count} fake users created!`);
    return await UserModel.insertMany(fakeUsers);
};

const generateFakePosts = async (count: number, users: any[]) => {
    await PostModel.deleteMany();
    const posts = Array.from({ length: count }).map(() => {
        const randomUser = faker.helpers.arrayElement(users);
        return {
            author_id: randomUser._id,
            author_name: randomUser.username,
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            image_url: faker.image.urlPicsumPhotos({
                width: 400,
                height: 420,
                grayscale: false,
                blur: 0,
            }),
            location: faker.lorem.sentence(),
        };
    });

    console.log(`${count} fake posts created!`);
    return await PostModel.insertMany(posts);
};

const generateFakeComments = async (users: any[], posts: any[]) => {
    await CommentModel.deleteMany();
    const comments = posts.flatMap((post) => {
        const numComments = faker.number.int({ min: 1, max: 5 });
        return Array.from({ length: numComments }).map(() => {
            const randomUser = faker.helpers.arrayElement(users);
            return {
                author_id: randomUser._id,
                author_name: randomUser.username,
                post_id: post._id,
                content: faker.lorem.sentence(),
            };
        });
    });

    console.log(`Created ${comments.length} comments`);
    await CommentModel.insertMany(comments);
};

const generateFakeLikes = async (users: any[], posts: any[]) => {
    await LikeModel.deleteMany();
    const likes = posts.flatMap((post) => {
        const numLikes = faker.number.int({ min: 1, max: 10 });
        return Array.from({ length: numLikes }).map(() => {
            const randomUser = faker.helpers.arrayElement(users);
            return {
                user: randomUser._id,
                post: post._id,
            };
        });
    });

    console.log(`Created ${likes.length} likes`);
    await LikeModel.insertMany(likes);
};

const generateFakeFollows = async (users: any[]) => {
    await FollowModel.deleteMany();
    const follows = users.flatMap((user) => {
        const numFollows = faker.number.int({ min: 1, max: 5 });
        return Array.from({ length: numFollows })
            .map(() => {
                const randomUser = faker.helpers.arrayElement(users);
                // Avoid self-follow
                if (randomUser._id.equals(user._id)) {
                    return null;
                }
                return {
                    follower: user._id,
                    following: randomUser._id,
                };
            })
            .filter(Boolean);
    });

    console.log(`Created ${follows.length} follow relationships`);
    await FollowModel.insertMany(follows);
};

const runSeeder = async () => {
    try {
        const users = await generateFakeUsers(50); // Adjust the count as needed
        const posts = await generateFakePosts(20, users);
        await generateFakeComments(users, posts);
        await generateFakeLikes(users, posts);
        await generateFakeFollows(users);
    } catch (err) {
        console.error('Error while seeding data:', err);
    } finally {
        await mongoose.connection.close();
    }
};

runSeeder()
    .then(() => console.log('Seeder ready'))
    .catch((err) => console.log(err));
