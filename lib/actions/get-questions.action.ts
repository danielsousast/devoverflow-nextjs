"use server"

import { QuestionModel } from "@/models/question.model";
import { TagModel } from "@/models/tag.model";
import { UserModel } from "@/models/user.model";
import { connectToDatabase } from "../database";

interface Params {
    page?: number;
    pageSize?: number;
    searchQuery?: string;
    filter?: string;
}

export async function getQuestions(params: Params) {
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