const db = require('./db.js');

const express = require('express');
const app = express();

const hbs = require('express-handlebars');
app.set('view engine', 'hbs');
app.use(express.static('./styles'));

app.use(express.urlencoded({ extended: true }))

app.engine( 'hbs', hbs.engine( {
	extname: '.hbs',
	defaultView: 'default',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));

app.get('/', (req, res) => {
	
	fetch('http://localhost:3000/api')
		.then(response => {
			return response.json();
		})
		.then(data => {
			//console.log(data);
			res.render('form', {layout:'default', title:'All records', read:true, data})
		})
})

app.get('/create', (req, res) => {
	res.render('form', {layout:'default', title:'Create new record', create:true})
})

app.post('/create', (req, res) => {
	
	fetch('http://localhost:3000/api', {
		method: 'POST',
		headers: {
			'Content-Type':'application/x-www-form-urlencoded'
		},
		body: encodeURI( `key=${req.body.key}&value=${req.body.value}` )
	})
	.then(res.render('success', {layout:'default', title:'Record sucessfully created!', created: true}))
	.catch(err => res.send('Error'));
})

app.get('/update', (req, res) => {
	res.render('form', {layout:'default', title:'Update record', update:true})
})

app.post('/update', (req, res) => {
	
	fetch('http://localhost:3000/api', {
		method: 'PUT',
		headers: {
			'Content-Type':'application/x-www-form-urlencoded'
		},
		body: encodeURI( `key=${req.body.key}&value=${req.body.value}` )
	})
	.then(res.render('success', {layout:'default', title:'Record sucessfully updated!', updated: true}))
	.catch(err => res.send('Error'));
})


app.get('/delete', (req, res) => {
	res.render('form', {layout:'default', title:'Delete record', delete:true})
})

app.post('/delete', (req, res) => {
	
	fetch('http://localhost:3000/api', {
		method: 'DELETE',
		headers: {
			'Content-Type':'application/x-www-form-urlencoded'
		},
		body: encodeURI( `key=${req.body.key}` )
	})
	.then(res.render('success', {layout:'default', title:'Record sucessfully deleted!', deleted: true}))
	.catch(err => res.send('Error'));
})

app.get('/api', (req, res) => {// read
	db.read(result => {
		const list = [];

		for (let row of result) {
			list.push([row.name, row.content]);
		}

		res.send(JSON.stringify(list));
	});
})

app.post('/api', (req, res) => {// create
	db.create(req.body.key, req.body.value);
	res.end();
})

app.put('/api', (req, res) => {// update
	db.updateValueByKey(req.body.key, req.body.value);
	res.end();
})

app.delete('/api', (req, res) => {// delete
	db.deleteByKey(req.body.key);
	res.end();
})

app.listen(3000)