"use server"

import { connectToDatabase } from "@/lib/database";
import { AnswerModel } from "@/models/answer.model";
import { InteractionModel } from "@/models/interaction.model";
import { QuestionModel } from "@/models/question.model";
import { UserModel } from "@/models/user.model";
import { revalidatePath } from "next/cache";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./interfaces";

export async function createAnswer({ content, authorId, questionId, path }: CreateAnswerParams) {
    try {
        connectToDatabase();
        const newAnswer = await AnswerModel.create({ content, author: authorId, question: questionId });

        // Add the answer to the question's answers array
        const questionObject = await QuestionModel.findByIdAndUpdate(questionId, {
            $push: { answers: newAnswer._id }
        })

        await InteractionModel.create({
            user: authorId,
            action: "answer",
            question: questionId,
            answer: newAnswer._id,
            tags: questionObject.tags
        })

        await UserModel.findByIdAndUpdate(authorId, { $inc: { reputation: 10 } })
        revalidatePath(path)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAnswers(params: GetAnswersParams) {
    try {
        connectToDatabase();
        const { questionId, sortBy, page = 1, pageSize = 10 } = params;
        const skipAmount = (page - 1) * pageSize;
        let sortOptions = {};

        switch (sortBy) {
            case "highestUpvotes":
                sortOptions = { upvotes: -1 }
                break;
            case "lowestUpvotes":
                sortOptions = { upvotes: 1 }
                break;
            case "recent":
                sortOptions = { createdAt: -1 }
                break;
            case "old":
                sortOptions = { createdAt: 1 }
                break;

            default:
                break;
        }

        const answers = await AnswerModel.find({ question: questionId })
            .populate("author", "_id clerkId name picture")
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

        const totalAnswer = await AnswerModel.countDocuments({
            question: questionId
        })
        const isNextAnswer = totalAnswer > skipAmount + answers.length;
        return { answers, isNextAnswer };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
    try {
        connectToDatabase();

        const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

        let updateQuery = {};

        if (hasupVoted) {
            updateQuery = { $pull: { upvotes: userId } }
        } else if (hasdownVoted) {
            updateQuery = {
                $pull: { downvotes: userId },
                $push: { upvotes: userId }
            }
        } else {
            updateQuery = { $addToSet: { upvotes: userId } }
        }

        const answer = await AnswerModel.findByIdAndUpdate(answerId, updateQuery, { new: true });

        if (!answer) {
            throw new Error("Answer not found");
        }

        // Increment author's reputation
        await UserModel.findByIdAndUpdate(userId, {
            $inc: { reputation: hasupVoted ? -2 : 2 }
        })

        await UserModel.findByIdAndUpdate(answer.author, {
            $inc: { reputation: hasupVoted ? -10 : 10 }
        })


        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
    try {
        connectToDatabase();

        const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

        let updateQuery = {};

        if (hasdownVoted) {
            updateQuery = { $pull: { downvote: userId } }
        } else if (hasupVoted) {
            updateQuery = {
                $pull: { upvotes: userId },
                $push: { downvotes: userId }
            }
        } else {
            updateQuery = { $addToSet: { downvotes: userId } }
        }

        const answer = await AnswerModel.findByIdAndUpdate(answerId, updateQuery, { new: true });

        if (!answer) {
            throw new Error("Answer not found");
        }

        // Increment author's reputation
        await UserModel.findByIdAndUpdate(userId, {
            $inc: { reputation: hasdownVoted ? -2 : 2 }
        })

        await UserModel.findByIdAndUpdate(answer.author, {
            $inc: { reputation: hasdownVoted ? -10 : 10 }
        })

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
    try {
        connectToDatabase();

        const { answerId, path } = params;

        const answer = await AnswerModel.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found");
        }

        await answer.deleteOne({ _id: answerId });
        await QuestionModel.updateMany({ _id: answer.question }, { $pull: { answers: answerId } });
        await InteractionModel.deleteMany({ answer: answerId });

        revalidatePath(path);
    } catch (error) {
        console.log(error);
    }
}