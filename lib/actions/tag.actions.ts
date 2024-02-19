"use server"

import { UserModel } from "@/models/user.model";
import { connectToDatabase } from "../database";

interface GetTopInteractedTags {
    limit?: number;
    userId?: number;
}

export async function getTopInteractedTags({ userId, limit = 20, }: GetTopInteractedTags): Promise<any[]> {
    try {
        connectToDatabase();

        const user = await UserModel.findById(userId)

        if (!user) {
            throw new Error("User not found")
        }

        const tags = [{ _id: "1", name: "tag1" }, { _id: "2", name: "tag2" }]
        return tags;
    } catch (error) {
        throw error
    }

}