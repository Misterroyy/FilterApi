const{MongoClient} = require('mongodb');
const url = 'mongodb://0.0.0.0:27017';
const databaseName='mango_db' 
const express = require('express')      
const client = new MongoClient(url);
const app = express();

app.use(express.json());


app.get("/color/:key", async(req, resp)=>{
    // console.log(req.params.key)
    let result = await client.connect();
    db= result.db(databaseName);
    collection = db.collection('fruit');
    let data =  await collection.find({
        "$or":[
            {"color":{$regex:req.params.key}}
        ]
    }).toArray();
    resp.send(data)
})


app.listen(5000);