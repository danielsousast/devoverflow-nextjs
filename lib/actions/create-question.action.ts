"use server"

import { QuestionModel } from "@/models/question.model";
import { TagModel } from "@/models/tag.model";
import { connectToDatabase } from "../database";

interface CreateQuestionParams {
    title: string;
    content: string;
    tags: string[];
    author: string;
    path: string;
}

export async function createQuestion(params: CreateQuestionParams) {
    try {
        connectToDatabase();

        const question = await QuestionModel.create({
            title: params.title,
            content: params.content,
            author: params.author
        });

        const tagDocuments = []

        for (const tag of params.tags) {
            const existingTag = await TagModel.findByIdAndUpdate({
                name: {
                    $regex: new RegExp(`${tag}$`, "i")
                }
            }, {
                $setOnInsert: { name: tag }, $push: { questions: question._id }
            }, { upsert: true, new: true });

            tagDocuments.push(existingTag._id);
        }

        await QuestionModel.findByIdAndUpdate(question._id, {
            $push: {
                tags: { $each: tagDocuments }
            }
        });
    } catch (error) {

    }
}
