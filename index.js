const express = require('express')
const app = express()

//Middleware

//Use our EJS templating
app.set('view engine', 'ejs')
//Includes my CSS
app.use(express.static('public'))

app.get('/', (req,res)=>res.render('about.ejs', {name: "Brian"}))

app.get('/blog', (req, res) => {
	res.render('blog.ejs', {author: "Rome", text: "Cool, cool! I like this application!"})
})

app.get('/bottles/:number_of_bottles',(req, res)=>{
    // uses a ternary to convert the string into a number and checks if it is a greater than one, if not will set it back to 99
    // console.log("Testing empty route", req.params.number_of_bottles)
    const bottles = parseInt(req.params.number_of_bottles) >= 0 ? parseInt(req.params.number_of_bottles) : 99
    // sets the next variable to either the current bottle count or 99 
    const next = bottles-1 >= 0 ? bottles-1 : 99;
    // sets the url number for the next round
    const validNum = !isNaN(req.params.number_of_bottles)
    // uses isNaN to check if id is a number -- filters for strings entered manually 
    if(validNum){
        res.render('index', {bottles, next})
    }else {
        // If not valid string, redirect to most recent valid string (default: 99)
        res.redirect('/bottles/99')
    }  
})

app.get('/bottles/', (req, res) => {
	res.redirect('/bottles/99')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log("Server is running!")
})

//Reference code from: wsjoshua