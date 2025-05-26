const express = require('express');
   const { MongoClient } = require('mongodb');
   const app = express();
   const port = process.env.PORT || 3000;
   const uri = process.env.MONGO_URI || 'mongodb://mongo-svc:27017/devops';
   app.get('/', async (_req, res) => {
     const client = new MongoClient(uri);
     await client.connect();
     await client.db().collection('visits').insertOne({ date: new Date() });
     const count = await client.db().collection('visits').countDocuments();
     await client.close();
     res.send(`Visitas totales: ${count}`);
   });
   app.listen(port, () => console.log(`App corriendo en el puerto ${port}`));
