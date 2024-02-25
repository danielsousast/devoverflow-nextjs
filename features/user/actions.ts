import { connectToDatabase } from "@/lib/database";
import { IUser, UserModel } from "@/models/user.model";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserDTO,
  UpdateUserParams,
} from "./interfaces";
import { revalidatePath } from "next/cache";
import { QuestionModel } from "@/models/question.model";

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await UserModel.create(userData);

    return newUser;
  } catch (error) {
    throw error;
  }
}

export async function getUserById({ userId }: GetUserDTO) {
  try {
    connectToDatabase();
    const user = await UserModel.findOne({
      clerkId: userId,
    });
    return user;
  } catch (error) {
    return null;
  }
}

export async function getAllUsers({
  page = 1,
  pageSize = 20,
}: GetAllUsersParams): Promise<IUser[]> {
  try {
    connectToDatabase();

    const users = UserModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return users;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;
    await UserModel.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await UserModel.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    //const userQuestionIds = await QuestionModel.find({
    //author: user._id
    //}).distinct('_id')

    //delete user questions
    await QuestionModel.deleteMany({
      author: user._id,
    });

    const deletedUser = await UserModel.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    throw error;
  }
}
