import mongoose from 'mongoose'
import { faker } from "@faker-js/faker"
import User from '../model/User';
import UserDetails from '../model/UserDetails';

const userDetails = []

const deleteUsers = async () => {
    await UserDetails.deleteMany()
    await User.deleteMany()
    console.log('users deleted')
}

const createUsers = async (count) => {
    for (let i = 0; i < count; i++){
        const userDetails = new UserDetails({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            birthdate: faker.date.birthdate(),
            bio: faker.person.bio(),
            location: faker.location.city(),
            avatar: faker.image.avatar(),
            gender: faker.person.gender(),
            visitingList: [faker.location.country(), faker.location.country()],
            socialMediaLinks: { platform: faker.internet.domainName(), link: faker.internet.url }
        })
        const details = await userDetails.save()
        
        const user = new User({
            email: faker.internet.email(),
            username: faker.internet.username(),
            password: faker.internet.password(),
            createdAt: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2024-04-20T00:00:00.000Z' }),
            updatedAt: Date.now(),
            userDetails: details._id
        })
        users.push(user)
    }
    console.log('Created ' + count + ' new users')
    await User.insertMany(users)
    console.log('Users saved!')
}

const main = async () => {
    const url = 'mongodb+srv://sarosdimarci4:qzDiAaBMcHE6cjU5@funcluster.tddj6.mongodb.net/'
    mongoose.connect(url)
    console.log('Database connection secured...')
    await createUsers(120)

    console.log('Disconnecting from db...')
    await mongoose.disconnect()
    console.log('Woooo we did it!')
}

main()