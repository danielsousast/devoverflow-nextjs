import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
    clerkId: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    bio?: string;
    picture: string;
    location?: string;
    portfolioWebsite?: string;
    reputation?: number;
    saved: Schema.Types.ObjectId[];
    joinedAt: Date;
}

export const UserSchema = new Schema({
    clerkId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    portfolioWebsite: {
        type: String,
        default: ''
    },
    reputation: {
        type: Number,
        default: 0
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }

});


export const UserModel = models.User || model<IUser>('User', UserSchema);

