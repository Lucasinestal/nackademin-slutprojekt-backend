require('dotenv').config()
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
let mongoMemory

async function connect() {
    if (process.env.NODE_ENV === 'TEST') {
        mongoMemory = new MongoMemoryServer({ binary: { version: '4.4.1' } })
        let uri = await mongoMemory.getUri()
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log('connected to TEST DB'))
    }
}

async function disconnect() {
    await mongoose.disconnect()
    if (process.env.NODE_ENV === 'TEST') {
        await mongoMemory.stop()
    }
}

module.exports = { connect, disconnect }