import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { UserModel } from '../model/UserModel';
import { UserDetailsModel } from '../model/UserDetailsModel';
import { PostModel } from '../model/PostModel';
import { CommentModel } from '../model/CommentModel';
import { FollowModel } from '../model/FollowModel';
import { LikeModel } from '../model/LikeModel';
import { config } from '../config';


const mongoUri = config.MONGO_URI; 
const USER_COUNT = 50;
const POST_COUNT = 50;

mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const createExampleUser = async () => {
    const examplePassword = 'password123';
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(examplePassword, salt);
    const exampleUser = new UserModel({
        email: 'testuser@example.com',
        password: hashedPassword,
        username: 'example_username',
    });

    return await exampleUser.save();
};

const generateFakeUsers = async (count: number) => {
    await UserDetailsModel.deleteMany();
    await UserModel.deleteMany();

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

    const insertedUserDetails =
        await UserDetailsModel.insertMany(fakeUserDetails);

    const fakeUsers = insertedUserDetails.map((userDetails) => ({
        username: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password(),
        createdAt: faker.date.past(),
        user_details: userDetails._id,
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
    const likeSet = new Set<string>();

    const likes = posts.flatMap((post) => {
        const numLikes = faker.number.int({ min: 1, max: 10 });
        return Array.from({ length: numLikes }).flatMap(() => {
            const randomUser = faker.helpers.arrayElement(users);
            const likeKey = `${randomUser._id}-${post._id}`;

            if (!likeSet.has(likeKey)) {
                likeSet.add(likeKey);
                return {
                    user: randomUser._id,
                    post: post._id,
                };
            }
            return [];
        });
    });
    console.log(`Created ${likes.length} likes`);
    await LikeModel.insertMany(likes);
};

const generateFakeFollows = async (users: any[]) => {
    await FollowModel.deleteMany();
    const followSet = new Set<string>();

    const follows = users.flatMap((user) => {
        const numFollows = faker.number.int({ min: 1, max: 5 });
        return Array.from({ length: numFollows })
            .map(() => {
                const randomUser = faker.helpers.arrayElement(users);
                if (randomUser._id.equals(user._id)) {
                    return null;
                }
                const followKey = `${randomUser._id}-${user._id}`;
                if (!followSet.has(followKey)) {
                    followSet.add(followKey);
                    return {
                        follower: user._id,
                        following: randomUser._id,
                    };
                }
                //return [];
            })
            .filter(Boolean);
    });

    console.log(`Created ${follows.length} follow relationships`);
    await FollowModel.insertMany(follows);
};

const runSeeder = async () => {
    try {
        const users = await generateFakeUsers(USER_COUNT);
        const posts = await generateFakePosts(POST_COUNT, users);
        await generateFakeComments(users, posts);
        await generateFakeLikes(users, posts);
        await generateFakeFollows(users);
        await createExampleUser();
    } catch (err) {
        console.error('Error while seeding data:', err);
    } finally {
        await mongoose.connection.close();
    }
};

runSeeder()
    .then(() => console.log('Seeder ready'))
    .catch((err) => console.log(err));
