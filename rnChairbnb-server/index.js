'use strict';

const db = require('./db')
const app = require('./app')
const PORT = 3000;
//{ force: true }
db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
.then(() => {
  console.log('db synced')
  app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
});
