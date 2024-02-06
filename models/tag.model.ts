import { Document, Schema, model, models } from "mongoose";

export interface ITag extends Document {
    name: string;
    description: string;
    questions: Schema.Types.ObjectId[];
    folowers: Schema.Types.ObjectId[];
    createdOn: Date;
}

export const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    folowers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export const TagModel = models.Tag || model<ITag>('Tag', TagSchema);