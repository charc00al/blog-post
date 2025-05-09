import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000

const allArticles = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// homepage with all articles
app.get("/", (req, res) => {
    res.render("index.ejs", {articles: allArticles});
})

// form to create new post
app.get("/new-post", (req, res) => {
    res.render("new-post.ejs");
})

// submitting new article 
app.post("/submit", (req, res) => {
    let articleObj = req.body;
    // creating id
    articleObj.id = allArticles.length + 1;
    // adding the title to the homepage
    allArticles.push(articleObj);
    res.redirect("/");
})

// creating pages for articles 
// the issue is, im not getting only the article clicked, but all of them -- so only the last one 

app.get("/article/:id", (req, res) => {
    let articleID = parseInt(req.params.id);
    let article = allArticles.find(a => a.id === articleID);

    res.render("article.ejs", {article});
})

// { articleName: 'mlk', articleText: '', id: 1 },

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})