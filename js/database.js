const { MongoClient } = require('mongodb');

async function maindb() {
    const uri = "mongodb+srv://CubeIndex-Admin:2zlSi245Z2bDDK86@cubeindex-cluster.rje0w.mongodb.net/?retryWrites=true&w=majority";


    const client = new MongoClient(uri);

    try {
        await client.connect();

        //await listDatabases(client);

        await createListing(client, {
            name: "NameTest",
            summary: "summaryTest",
            room: "1"
        })
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
maindb().catch(console.error);

async function createListing(client, newListing){
    const result = await client.db("cubeindex").collection("col1").insertOne(newListing);
     console.log(`New listing created with the following id: ${result.insertedId}`);
}
/*
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}*/
