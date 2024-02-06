"use server"

import { UserModel } from "@/models/user.model";
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