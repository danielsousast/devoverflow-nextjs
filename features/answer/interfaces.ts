export interface CreateAnswerParams {
    content: string;
    authorId: string; // User ID
    questionId: string; // Question ID
    path: string;
}

export interface GetAnswersParams {
    questionId: string;
    sortBy?: string;
    page?: number;
    pageSize?: number;
}

export interface AnswerVoteParams {
    answerId: string;
    userId: string;
    hasupVoted: boolean;
    hasdownVoted: boolean;
    path: string;
}

export interface DeleteAnswerParams {
    answerId: string;
    path: string;
}
