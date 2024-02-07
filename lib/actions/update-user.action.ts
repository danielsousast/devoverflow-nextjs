
import { UserModel } from "@/models/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";

interface UpdateUserParams {
    clerkId: string;
    updateData: {
        name: string;
        username: string;
        email: string;
        picture: string;
    };
    path: string;

}

export async function updateUser(params: UpdateUserParams) {
    try {
        connectToDatabase();
        const { clerkId, updateData, path } = params;
        await UserModel.findOneAndUpdate({ clerkId }, updateData, {
            new: true,
        })

        revalidatePath(path);
    } catch (error) {
        throw error
    }
}