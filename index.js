const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId=require('mongodb').ObjectId;
const cors = require('cors');

const app = express()
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.edakp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("Car_Mac");
      const serviceCollection = database.collection("services");

      //Get Api

      app.get('/allservices',async(req,res)=>{
        const cursor = serviceCollection.find({});
        const service=await cursor.toArray();
        res.send(service);
      })

      //Get Single Service
      app.get('/allservices/:id',async(req,res)=>{
        const id = req.params.id;
        const query={_id:ObjectId(id)};
        const service = await serviceCollection.findOne(query);
        res.json(service);

      })


    //   Post Api 
     app.post('/allservices',async(req,res)=>{
         const service=req.body
        console.log('hit the post api',service);
        const result = await serviceCollection.insertOne(service);
        console.log(result);
        res.json(result)
     });

    } 



    finally {
    //   await client.close();
    }

  }

  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World Bangladesh!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})