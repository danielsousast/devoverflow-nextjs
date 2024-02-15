
import { QuestionModel } from "@/models/question.model";
import { UserModel } from "@/models/user.model";
import { connectToDatabase } from "../database";

interface DeleteUserParams {
    clerkId: string;
}

export async function deleteUser(params: DeleteUserParams) {
    try {
        connectToDatabase();
        const { clerkId } = params;
        const user = await UserModel.findOne({ clerkId })

        if (!user) {
            throw new Error('User not found')
        }

        //const userQuestionIds = await QuestionModel.find({
        //author: user._id
        //}).distinct('_id')

        //delete user questions
        await QuestionModel.deleteMany({
            author: user._id
        })

        const deletedUser = await UserModel.findByIdAndDelete(user._id)

        return deletedUser;
    } catch (error) {
        throw error
    }
}