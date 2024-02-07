
import { UserModel } from "@/models/user.model";
import { connectToDatabase } from "../database";

interface CreateUserParams { }

export async function createUser(userData: CreateUserParams) {
    try {
        connectToDatabase();
        const newUser = await UserModel.create(userData);

        return newUser;
    } catch (error) {
        throw error
    }
}