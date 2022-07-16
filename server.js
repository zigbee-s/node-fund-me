const {getKeys} = require("./connection")
const express = require('express');
const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use("/static", express.static('./public/'));

const PORT = 8000;


app.get("/", async(req,res)=> {
    const keys = await getKeys()
    console.log(keys)
    res.render("campaigns", {keys})
})

app.get("/register", (req,res) => {
    res.render("register")
})
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})