var express = require("express");
var app = express();
var port = 9000;

var Person = {
	"name": "Brenan Klain",
	"location": "Provo",
	"hobbies": ["programming", "snowboarding", "tacos", "surfing", "tacos again"],
	"occupations": ["PMA Media-Media Buyer", "Chess.com-Director of Marketing and Operations", "Online Marketing Consultant"],
	"mentions":[],
	"friends":[],
	"skills":[{ID:1,name:"HTML",experience:"intermediate"},{ID:2,name:"CSS",experience:"intermediate"},{ID:3,name:"javascript",experience:"beginner"}]
		};

app.use(express.bodyParser());
app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get("/name", function(req,res){
	res.send(Person.name);
});

app.get("/location", function(req,res){
	res.send(Person.location);
});

app.get("/hobbies", function(req,res){
	var order = req.query.order;
	var sortedHobbies = Person.hobbies.sort();
	if(order == "desc"){
		sortedHobbies = sortedHobbies.reverse();
	}
	res.send(sortedHobbies);
});

app.get("/occupations", function(req,res){
	res.send(Person.occupations);
});

app.get("/occupations/latest", function(req,res){
	var latestOccupation = (Person.occupations.length -1);
	res.send(Person.occupations[latestOccupation]);
});

app.post("/mentions",function(req,res){
	var mentionURL = req.body.mentions;
	Person.mentions.push(mentionURL);
	res.send(mentionURL);
});

app.get("/mentions", function(req,res){
	res.send(Person.mentions);
});

app.post("/friends",function(req,res){
	var friend = req.body;
	Person.friends.push(friend);
	res.send(friend);
});

app.get("/friends", function(req,res){
	res.send(Person.friends);
});

app.get ("/skills", function(req,res){
	res.send(Person.skills);
});

app.get("/skills/:id", function(req,res){
	for (var i=0;i<Person.skills.length;i++){
		if(req.params.id == Person.skills[i].ID){
			res.send(Person.skills[i]);
		}
	}
	
});

app.listen(port);





