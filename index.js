import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000

const allArticles = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {articles: allArticles});
})

app.get("/new-post", (req, res) => {
    res.render("new-post.ejs");
})

app.post("/submit", (req, res) => {
    // add title to homepage
    let articleObj = req.body;
    allArticles.push(articleObj);

    //res.render("index.ejs", {title: req.body["new-title"]});
    res.render("index.ejs", {articles: allArticles});
    console.log(allArticles);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})