
interface Tag {
    _id: string;
    name: string;
}

interface Author {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
}

export interface Question {
    _id: string;
    title: string;
    tags: Tag[];
    createdAt: string;
    upvotes: number;
    views: number;
    author: Author;
    answers: Array<object>;
}