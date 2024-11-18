import User from "../model/User";
import bcrypt from "bcrypt"

export const createUser = async (username: string, email: string, password: string) => {

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        throw new Error("Username is already taken");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new Error("Email is already registered");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    const savedUser = await user.save();

    return {
        username: savedUser.username,
        email: savedUser.email,
    };
};
