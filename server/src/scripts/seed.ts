import dotenv from 'dotenv';
import mongoose, { Types } from 'mongoose';
import { faker } from '@faker-js/faker';
import UserModel from '../model/UserModel';
import UserDetailsModel from '../model/UserDetailsModel';
import PostModel from '../model/PostModel';
import CommentModel from '../model/CommentModel';

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
    visitingList: faker.helpers.arrayElements(['Paris', 'London']),
    gender: faker.person.sexType(),
    socialMediaLinks: { platform: 'Twitter', link: faker.internet.url() },
    languagesSpoken: faker.helpers.arrayElements(['English', 'Spanish']),
    avatarUrl: faker.image.avatar(),
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
    userDetails: userDetails._id, // Properly reference `_id`
  }));

  console.log(`${count} fake users created!`);
  return await UserModel.insertMany(fakeUsers);
};

const generateFakePosts = async (count: number, userId: Types.ObjectId, username: string) => {
  await PostModel.deleteMany();
  const posts = Array.from({ length: count }).map(() => ({
    author_id: userId,
    author_name: username,
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    image_url: faker.image.urlPicsumPhotos({
      width: 400,
      height: 600,
      grayscale: false,
      blur: 0,
    }),
    location: faker.lorem.sentence(),
  }));

  console.log(`${count} fake posts created!`);
  return await PostModel.insertMany(posts);
};

const generateFakeComments = async (
  userId: Types.ObjectId, username: string, posts: Array<Types.ObjectId>) => {
  await CommentModel.deleteMany();
  const comments = posts.map((postId) => ({
      author_id: userId,
      author_name: username,
      post_id: postId,
      content: faker.lorem.sentence()
  }))
  console.log(`Created ${comments.length} comments`);
  await CommentModel.insertMany(comments);
}

const runSeeder = async () => {
  try {
    const users = await generateFakeUsers(50); // Adjust the count as needed
    const posts = await generateFakePosts(20, users[0]._id, users[0].username);
    const postIdList = posts.map((post) => post.id);
    await generateFakeComments(users[0]._id, users[0].username, postIdList);
  } catch (err) {
    console.error('Error while seeding data:', err);
  } finally {
    await mongoose.connection.close();
  }
};

runSeeder().then(r => console.log('Seeder ready')).catch((err) => console.log(err));
