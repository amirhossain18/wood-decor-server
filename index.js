const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// pass= 6w6wAFteLD*!Qe_;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Pass}@cluster0.zcphb.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const allFurniture = client.db("Wood_decor").collection("all_furniture");
    const homeFurniture = client.db("Wood_decor").collection("home_furniture");
    const officeFurniture = client
      .db("Wood_decor")
      .collection("office_furniture");
    const otherFurniture = client
      .db("Wood_decor")
      .collection("Other_furniture");
    const userCollection = client.db("Wood_decor").collection("users");
    const bookingsCollection = client.db("Wood_decor").collection("bookings");




    app.get("/products", async (req, res) => {
      const query = {};
      const allProduct = await allFurniture.find(query).toArray();
      res.send(allProduct);
    });

    app.get("/products/house", async (req, res) => {
      const query = {};
      const homeProduct = await homeFurniture.find(query).toArray();
      res.send(homeProduct);
    });

    app.get("/products/office", async (req, res) => {
      const query = {};
      const officeProduct = await officeFurniture.find(query).toArray();
      res.send(officeProduct);
    });

    app.get("/products/other", async (req, res) => {
      const query = {};
      const otherProduct = await otherFurniture.find(query).toArray();
      res.send(otherProduct);
    });
    app.get("/bookings", async (req, res) => {
      const email = req.query.email;

      const query = { email: email };
      const bookings = await bookingsCollection.find(query).toArray();
      res.send(bookings);
    });
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      console.log(user);
      res.send(result);
    });

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
       console.log(booking)
      const query = {
        email: booking.email,
        name: booking.name,
      };

      const alreadyBooked = await bookingsCollection.find(query).toArray();

      if (alreadyBooked.length) {
        const message = `You already have a booking on ${booking.name}`;
        return res.send({ acknowledged: false, message });
      }

      const result = await bookingsCollection.insertOne(booking);

      res.send(result);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("runnig server");
});



app.listen(port, () => {
  console.log(`server running on ${port}`);
});
