const mongoose = require("mongoose");
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'? MONGO_DB_URI_TEST : MONGO_DB_URI;

  //conexion con mongo
  mongoose.connect(connectionString)
  .then(() => {
    console.log('Base de datos conectada...');
  })
  .catch(err => console.error(err))