import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strict', true);

    if (!process.env.MONGO_URL) {
        return console.log('MONGODB_URI is not defined');
    }

    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'devflow'
        })

        isConnected = true;
        console.log('=> using new database connection');
    } catch (error) {
        console.log('error connect db', error);

    }

}