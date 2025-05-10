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
    res.render("index.ejs", {articles: allArticles, bodyClass: "home"});
})

// form to create new post
app.get("/new-post", (req, res) => {
    res.render("new-post.ejs");
})

// submit new article 
app.post("/submit", (req, res) => {
    let articleObj = req.body;
    // creating id
    articleObj.id = allArticles.length + 1;
    // adding the title to the homepage
    allArticles.push(articleObj);
    res.redirect("/");
})

// create detail pages for articles 
app.get("/article/:id", getArticle, (req, res) => {
    res.render("article.ejs", {article: req.currentArticle});
})

// form to edit article 
app.get("/edit-post/:id", getArticle, (req, res) => {
    res.render("edit-post.ejs", {article: req.currentArticle});
})

// submit edited article
app.post("/edit/:id", getArticle, (req, res) => {
    let editedArticle = req.body;

    req.currentArticle.articleName = editedArticle.articleName;
    req.currentArticle.articleText = editedArticle.articleText;

    res.redirect("/");
})

app.post("/delete/:id", getArticle, (req, res) => {
    let articleIndex = allArticles.indexOf(req.currentArticle);


    allArticles.splice(articleIndex, 1);
    res.redirect("/");
})

// custom middleware to get current article 
function getArticle(req, res, next) {
    let articleID = parseInt(req.params.id);
    let articleObj = allArticles.find(a => a.id === articleID);
    req.currentArticle = articleObj;
    next();
}


app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})