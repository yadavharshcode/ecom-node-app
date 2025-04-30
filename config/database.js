const mysql = require('mysql2/promise');
const { CosmosClient } = require('@azure/cosmos');
const fs = require('fs')

let mysqlPool;
let cosmosClient;
let cosmosDatabase;

const connectMySQL = async () => {
  try {
    mysqlPool = mysql.createPool({
      host: process.env.MYSQL_HOST || "localhost",
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER  || "root",
      password: process.env.MYSQL_PASSWORD || "password",
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: false
      }
    });


    // console.log("Mysqlpool", mysqlPool)
    console.log('MySQL connected successfully');
  } catch (error) {
    console.error('MySQL connection error:', error);
    process.exit(1);
  }
};

// const connectCosmosDB = async () => {
//   try {
//     cosmosClient = new CosmosClient({
//       endpoint: process.env.COSMOS_ENDPOINT,
//       key: process.env.COSMOS_KEY
//     });

//     const { database } = await cosmosClient.databases.createIfNotExists({
//       id: process.env.COSMOS_DATABASE
//     });

//     cosmosDatabase = database;
//     console.log('Cosmos DB connected successfully');
//   } catch (error) {
//     console.error('Cosmos DB connection error:', error);
//     process.exit(1);
//   }
// };

// const getCosmosDB = () => cosmosDatabase;

const getMySQLPool = () => mysqlPool;


module.exports = {
  connectMySQL,
  // connectCosmosDB,
  getMySQLPool,
  // getCosmosDB
};