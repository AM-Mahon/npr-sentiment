require('dotenv').config();
const  express = require('express');
const { Client } = require('pg');
const pgClient = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});
var cors = require('cors');
const path = require('path');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
});

client.connect();

var app = express();

app.use(cors());

const retrieveArticles = async function(){
    let articles = [];
    const res = await client.query("SELECT * FROM articles WHERE sentiment IN (-1,0,1);", []);
    for(let row of res.rows){
        articles.push(row);
    }
    return articles;
}

var server = app.listen(process.env.PORT || 8080, function() {
    console.log(`App now running on port ${server.address().port}`)
    
    app.get("/", function(req, res, next){
        res.sendFile(path.join(__dirname+'/index.html'))
    })

    app.get("/css", function(req, res, next){
        res.sendFile(path.join(__dirname+'/style.css'))
    })

    app.get("/articles", function(req, res, next){
        retrieveArticles()
        .then(articles => {
            res.json(articles);
        })
    })
})