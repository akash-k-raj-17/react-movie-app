require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 3000;

let db;
let collection;

async function connectDB() {
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        db = client.db('ReactMovieApp');
        collection = db.collection('Movies');
    } catch (error) {
        console.error(`Error connecting to the server`, error);
    }    
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/search', async (req,res) => {
    const {searchTerm, movies} = req.body;
    if(!searchTerm || movies.length === 0) {
        return res.status(400).json({ message : 'Invalid Request Body'})
        }

        const {id, poster_path} = movies[0];
        const poster_url = `https://image.tmdb.org/t/p/w500/${poster_path}`
    try {
        const query = {
        id : id
       }
       const update = {
        $set : {
            poster_url : poster_url,
            searchTerm : searchTerm
        },
        $setOnInsert : {
            id : id
        },
        $inc : {
            count : 1
        }
       }
       const options = { upsert : true }
       
       const result = await collection.updateOne(query, update, options);
       const status = result.upsertedCount > 0 ? 201 : 200

       res.status(status).json({
        message : 'document created successfully'
       })
    } catch (error) {
        res.status(500).json( { message : 'Internal server error' });
    }

})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})