let dotenv = require('dotenv');
const express = require("express");
const {MongoClient} = require("mongodb");
dotenv.config();

const url = "mongodb+srv://csewebservice:google419@cluster0.culjqpv.mongodb.net/test"
// process.env.mongodb_URI;

async function mongo() {
    let client = new MongoClient(url);
    try {
        await client.connect();
        await dataList(client);
    }
    catch (e){
         console.error(e)
    }
    finally {
        await client.close();
    }
}

mongo();

async function dataList(client) {
    let listDatabases = await client.db().admin().listDatabases();
    console.log("databases");
    listDatabases.databases.collections.forEach((db) => {
        console.log("--", db);
    })
}