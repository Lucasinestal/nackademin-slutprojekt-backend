require('dotenv').config()
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
let mongoMemory
let uri

async function connect() {
    switch (process.env.NODE_ENV) {
        case 'PROD':
        case 'STAGE':
            if (!process.env.DB_NAME) throw new Error('No database name specified');

            const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

            uri =  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`; 

            break;
        case 'DEV':
        case 'TEST':
            mongoMemory = new MongoMemoryServer({ binary: { version: '4.4.1' } })
            uri = await mongoMemory.getUri()
            break;

        default:
            throw new Error('No NODE_ENV specified');
    }

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, () => console.log(`connected to ${process.env.NODE_ENV} DB`))
}

async function disconnect() {
    await mongoose.disconnect()
    if (process.env.NODE_ENV === 'TEST') {
        await mongoMemory.stop()
    }
}

module.exports = { connect, disconnect }