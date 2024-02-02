"use server"

import { connectToDatabase } from "../database";

export async function createQuestion(params: any) {
    try {
        connectToDatabase();
    } catch (error) {

    }
}