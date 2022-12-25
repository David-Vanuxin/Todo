const express = require("express");
const app = express();

const hbs = require('express-handlebars');
app.set("view engine", "hbs");
app.use(express.static("./styles"));

app.use(express.urlencoded({ extended: true }))

app.engine( 'hbs', hbs.engine( {
	extname: '.hbs',
	defaultView: 'default',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));

app.get("/", (req, res) => {
	
	fetch("http://localhost:3000/api")
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data);
			res.render('form', {layout:"default", title:"All records", read:true, data})
		})
})

app.get("/create", (req, res) => {
	res.render('form', {layout:"default", title:"Create new record", create:true})
})

app.post("/create", (req, res) => {
	
	fetch("http://localhost:3000/api", {
		method: "POST",
		headers: {
			"Content-Type":"application/x-www-form-urlencoded"
		},
		body: encodeURI( `key=${req.body.key}&value=${req.body.value}` )
	})
	.then(res.render('success', {layout:"default", title:"Record sucessfully created!", created: true}))
	.catch(err => res.send("Error"));
})


const data = new Map();

app.get("/api", (req, res) => {// read
	const list = [];

	for (pair of data.entries()) {
		list.push(pair)
	}

	res.send(JSON.stringify(list));
})

app.post("/api", (req, res) => {// create
	

	data.set(req.body.key, req.body.value)

	res.redirect("/api");
})

app.put("/api", (req, res) => {// update
	if (data.has(req.body.key)) {
		data.set(req.body.key, req.body.value)
	} else {
		res.status(400)
	}

	res.redirect("/api");
})

app.delete("/api", (req, res) => {
	if (data.has(req.body.key)) data.delete(req.body.key)
	else res.status(400)

	res.redirect("/api");
})

app.listen(3000)