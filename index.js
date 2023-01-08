const express  = require("express");
const cors = require("cors");
const app =express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());

// pass= 6w6wAFteLD*!Qe_;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Pass}@cluster0.zcphb.mongodb.net/?retryWrites=true&w=majority`
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run(){
    try{
           const all_furniture=  client.db('Wood_decor').collection('all_furniture')
      app.get('/products' , async(req, res)=> {
        const query={};
        const allProduct= await all_furniture.find(query).toArray();
        res.send(allProduct)
      })
   
   
   
        }
    finally{

    }
}

run().catch(error =>console.log (error))
async function runHome(){
    try{
           const all_furniture=  client.db('Wood_decor').collection('home_furniture')
      app.get('/products/house' , async(req, res)=> {
        const query={};
        const homeProduct= await all_furniture.find(query).toArray();
        res.send(homeProduct)
      })
   
   
   
        }
    finally{

    }
}

runHome().catch(error =>console.log (error))


async function runoffice(){
    try{
           const office_furniture=  client.db('Wood_decor').collection('office_furniture')
      app.get('/products/office' , async(req, res)=> {
        const query={};
        const officeProduct= await office_furniture.find(query).toArray();
        res.send(officeProduct)
      })
   
   
   
        }
    finally{

    }
}

runoffice().catch(error =>console.log (error))

async function runOther(){
    try{
           const other_furniture=  client.db('Wood_decor').collection('Other_furniture')
      app.get('/products/other' , async(req, res)=> {
        const query={};
        const otherProduct= await other_furniture.find(query).toArray();
        res.send(otherProduct)
      })
      
   
   
        }
    finally{

    }
}

runOther().catch(error =>console.log (error))














app.get('/', (req , res) =>{
    res.send("runnig server")
})


app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})