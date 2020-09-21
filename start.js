const app = require('./app')
const db = require('./db/index')

db.connect().then(app.listen(process.env.PORT || 5000, () => console.log("It's running birch!")))

