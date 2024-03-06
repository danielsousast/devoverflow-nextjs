import { Question } from "@/types/models/Question";

export const questions: Question[] = [
    {
        _id: "1",
        title: "How to solve a math problem?",
        tags: [
            { _id: "1", name: "math" },
            { _id: "2", name: "problems" },
        ],
        createdAt: "2023-12-31T10:00:00Z",
        upvotes: 5,
        views: 100,
        author: {
            _id: "1",
            name: "John",
            picture: "john.jpg",
        },
        answers: [
            { text: "You can try using method X to solve the problem.", author: { name: "Maria", picture: "maria.jpg" } },
            { text: "I recommend studying more about the topic before attempting to solve it.", author: { name: "Peter", picture: "peter.jpg" } },
        ],
    },
    {
        _id: "2",
        title: "What is the formula to calculate the area of a circle?",
        tags: [
            { _id: "3", name: "geometry" },
            { _id: "4", name: "circle" },
        ],
        createdAt: "2024-01-15T14:30:00Z",
        upvotes: 10,
        views: 5000000,
        author: {
            _id: "2",
            name: "Anna",
            picture: "anna.jpg",
        },
        answers: [
            { text: "The formula to calculate the area of a circle is A = π * r^2.", author: { name: "Carlos", picture: "carlos.jpg" } },
            { text: "You can use the formula A = π * d^2 / 4, where d is the diameter of the circle.", author: { name: "Mariana", picture: "mariana.jpg" } },
        ],
    },
    // Add more questions here...
];