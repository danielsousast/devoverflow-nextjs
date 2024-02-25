"use server";

import { connectToDatabase } from "@/lib/database";
import { QuestionModel } from "@/models/question.model";
import { TagModel } from "@/models/tag.model";
import { UserModel } from "@/models/user.model";
import { GetQuestionsParams } from "./interfaces";
import { Question } from "@/types/models/Question";

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
      author: params.author,
    });

    const tagDocuments = [];

    for (const tag of params.tags) {
      const existingTag = await TagModel.findByIdAndUpdate(
        {
          name: {
            $regex: new RegExp(`${tag}$`, "i"),
          },
        },
        {
          $setOnInsert: { name: tag },
          $push: { questions: question._id },
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await QuestionModel.findByIdAndUpdate(question._id, {
      $push: {
        tags: { $each: tagDocuments },
      },
    });
  } catch (error) {}
}

export async function getQuestions(_params: GetQuestionsParams) {
  try {
    connectToDatabase();
    const questions = await QuestionModel.find({})
      .populate({
        path: "author",
        model: UserModel,
      })
      .populate({
        path: "tags",
        model: TagModel,
      })
      .sort({
        createdAt: -1,
      })
      .exec();

    return { questions };
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestionById(params: {
  questionId: string;
}): Promise<Question> {
  try {
    connectToDatabase();
    const question = await QuestionModel.findById(params.questionId)
      .populate({
        path: "tags",
        model: TagModel,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: UserModel,
        select: "_id clerkId name picture",
      })
      .exec();

    return question;
  } catch (error) {
    throw new Error("Error getting question by id");
  }
}
