"use server"

import { QuestionModel } from "@/models/question.model";
import { TagModel } from "@/models/tag.model";
import { UserModel } from "@/models/user.model";
import { Question } from "@/types/models/Question";
import { connectToDatabase } from "../database";

interface Params {
    page?: number;
    pageSize?: number;
    searchQuery?: string;
    filter?: string;
}

export async function getQuestions(_params: Params) {
    try {
        connectToDatabase();
        const questions = await QuestionModel.find({}).populate({
            path: "author",
            model: UserModel
        }).populate({
            path: "tags",
            model: TagModel

        }).sort({
            createdAt: -1
        }).exec();

        return { questions };
    } catch (error) {
        console.log(error);
    }
}

export async function getQuestionById(params: { questionId: string }): Promise<Question> {
    try {
        connectToDatabase();
        const question = await QuestionModel.findById(params.questionId).populate({
            path: "tags", model: TagModel, select: "_id name"
        }).populate({
            path: "author", model: UserModel, select: "_id clerkId name picture"
        }).exec();

        return question;
    } catch (error) {
        throw new Error("Error getting question by id");

    }
}