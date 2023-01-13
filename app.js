// jshint esversion:6

// #express (in node _ npm i express) web application framework (like flask)
const express = require("express");

// #Express body-parser is an npm module used to process data sent in an HTTP
// #request body. It provides four express middleware for parsing JSON, Text,
// #URL-encoded, and raw data sets over an HTTP request body
const bodyParser = require('body-parser');

// #module dat.js that give the full date
const date = require(__dirname + "/modules/date.js");
// #After import the module date() is calling the function inside the module
//  #and the function getDate. adding he parentesis call  the fruntion inside app.js
console.log(date);
let day = date.getDate();

//#module date.js returns day
// const weekday =require()

//  #Initialization of express as 'app' objecct (like app=Flask(__name__))
const app = express();

// #item is an array that will be send to app.get('/') route and the in
// #res.render('list', {kindDay: day, newListItems: items});
//  #to be pass as a for loop in list.ejs
let items = [];

let workItems = [];
// #EJS (Embedded JavaScript Templating) is one of the most popular template
// #engines for JavaScript (Something like Jinja2). this line of code must be after
// #the Initialization of express because otherwise "app.set" won't be reconize.
// #as well this line of code is what the EJS documentatioin said about setting
// #EJS
app.set('view engine', 'ejs');

// #this to read HTTP POST resquest
app.use(bodyParser.urlencoded({
  extended: true
}));

// # to read the styles.css file an integrate it in the list.ejs is necessairy
//  # create a foldef call 'public' inside that folder "css" folder and then the
// #styles.css field. So to active the styles.css this is the code using express
app.use(express.static('public'));


app.get("/", function(req, res) {
  // res.send("<h1>Server is running</h1>")


  // #res.render('list', {kindDay: day}); = is like in FLask using 'render template'
  // #list is the name of the template "list.ejs" and {kindDay: Day} is lake using
  // #jinja2 to render date in a  template from the backend.
  res.render('list', {
    listTitle: day,
    newListItems: items,

  });

});

//  #Here is fitch the data from the form in list.ejs
app.post("/", function(req, res) {
  // #item contains the data from the form using the post request and body-parser
  let item = req.body.newItem;

  // #if the post request comes from "/work" url
  if (req.body.list === "Work") {
    // #the data from the post request will be append to the worItems list
    workItems.push(item);
    //  # we will render the imes in worItem list on the '/work' url
    res.redirect('/work');
  } else {
    // # the 'item' are sended to items[] to have an array and then in list.ejs will
    // be pass through a for loop

    items.push(item);
    // #because we want to render the data from item again into  "/" url, with
    // #res.redirect('/') the data from item will be send to the app.get('/')
    res.redirect("/");
    // console.log(item);
  }



});

//  WORK URL
app.get('/work', function(req, res) {
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get('/about', function(req, res){
  res.render('about', {listTitle: "About"});
});


app.listen(3000, function() {
  console.log("Server running on port 3000");
})
