// No need to get crazy but I just dont want to serve the password even if its hashed.
// Took some notes last modules
export interface UserDTO {
    id: string;
    username: string;
    email: string;
}

export const toUserDTO = (user: any): UserDTO => ({
    id: user._id.toString(),
    username: user.username,
    email: user.email,
});
