"use server"

import { IUser, UserModel } from "@/models/user.model";
import { connectToDatabase } from "../database";

interface GetUserDTO {
    userId: string;
}

export async function getUserById({ userId }: GetUserDTO) {
    try {
        connectToDatabase();
        const user = await UserModel.findOne({
            clerkId: userId
        })
        return user;
    } catch (error) {
        return null;
    }
}

interface GetAllUsersParams {
    page?: number;
    pageSize?: number;
    filter?: string;
    searchQuery?: string;
}

export async function getAllUsers({ page = 1, pageSize = 20, filter, searchQuery }: GetAllUsersParams): Promise<IUser[]> {
    try {
        connectToDatabase();

        const users = UserModel.find().sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize);
        return users;
    } catch (error) {
        throw error
    }

}