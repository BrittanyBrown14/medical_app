const mongoose = require('mongoose');
const mongoURI =  "mongodb+srv://brittany:dTmJ3D4CDFnoHN0I@cluster0.probofv.mongodb.net/";
const connectToMongo = async (retryCount) => {
    mongoose.set('strictQuery',true);
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    try {
        await mongoose.connect(mongoURI, { dbName: 'medical_db'});
        console.info('Connected to Mongo Successfully')

        return;
    } catch (error) {
        console.error(error);

        const nextRetryCount = count + 1;

        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo!');
        }

        console.info(`Retrying, retry count: ${nextRetryCount}`)

        return await connectToMongo(nextRetryCount);

    }
};

module.exports = connectToMongo;