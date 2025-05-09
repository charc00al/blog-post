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
app.get("/article/:id", (req, res) => {
    let articleID = parseInt(req.params.id);
    let article = allArticles.find(a => a.id === articleID);
    res.render("article.ejs", {article});
})

// editing article
app.get("/edit-post/:id", (req, res) => {
    let articleID = parseInt(req.params.id);
    let article = allArticles.find(a => a.id === articleID);
    res.render("edit-post.ejs", {article});
    console.log(article);
})

app.post("/edit/:id", (req, res) => {
    let articleID = parseInt(req.params.id);
    // current article object (id)
    let currentArticle = allArticles.find(a => a.id === articleID);
    // edited article object (no id)
    let editedArticle = req.body;

    currentArticle.articleName = editedArticle.articleName;
    currentArticle.articleText = editedArticle.articleText;

    console.log(editedArticle, currentArticle);
    // change the object parameters 
    res.redirect("/");
})

// { articleName: 'mlk', articleText: '', id: 1 },

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})