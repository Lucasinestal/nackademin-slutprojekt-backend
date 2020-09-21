require('dotenv').config()
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
let mongoMemory

async function connect() {
    switch (process.env.NODE_ENV) {
        case 'PROD' || 'STAGE':
            if (!process.env.DB_NAME) throw new Error('No database name specified');
            //prod/stage db connection
            console.log('connected to prod/stage DB')

            break;
        case 'TEST' || 'DEV':
            mongoMemory = new MongoMemoryServer({ binary: { version: '4.4.1' } })
            let uri = await mongoMemory.getUri()
            await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }, () => console.log('connected to TEST DB'))
            break;

        default:
            throw new Error('No NODE_ENV specified');
    }
}

async function disconnect() {
    await mongoose.disconnect()
    if (process.env.NODE_ENV === 'TEST') {
        await mongoMemory.stop()
    }
}

module.exports = { connect, disconnect }