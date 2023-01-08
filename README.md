# The simplest todo app

## Capatibilities

You can see all your records, update and delete them, also create new records 

## Deploy

1. Download repo
	```bash
	git clone https://github.com/David-Vanuxin/Todo.git
	```

2. Create a database - see in file <a href='https://github.com/David-Vanuxin/Todo/blob/main/create-db.sql'>create-db.sql</a>
3. Change file <i>db.js</i>
	```js
	const connection = mysql.createConnection({
	  host: '127.0.0.1',
	  user: /*insert your mysql user username*/,
	  password: /*insert your mysql user password*/,
	  database: 'TodoApp' 
	})
	```

4. Run the App!
	```bash
	npm i && node index
	```

## Exstension

App has <strong>REST API</strong>: it's 4 requests to the "/api" route 

### Code samples
1. <strong>Create</strong> record have key is "Test" and value is "Record"
	```js
	fetch('http://localhost:3000/api', {
	  method: 'POST',
	  headers: {
	    'Content-Type':'application/x-www-form-urlencoded'
	  },
	  body: encodeURI(`key=Test&value=Record`)
	})
	```

2. <strong>Read</strong> all records and print to console
	```js
	fetch('http://localhost:3000/api')
	  .then(response => {
	    return response.json();
	  })
	  .then(data => {
	    console.log(data);
	})
	```

3. To <strong>update</strong> value you need specify key and new value
	```js
	fetch('http://localhost:3000/api', {
	   method: 'PUT',
	   headers: {
	      'Content-Type':'application/x-www-form-urlencoded'
	   },
	   body: encodeURI(`key=Test&value=Updated`)
	})
	```


4. <strong>Delete</strong> record with key is "Test"
	```js
	fetch('http://localhost:3000/api', {
	   method: 'DELETE',
	   headers: {
	      'Content-Type':'application/x-www-form-urlencoded'
	   },
	   body: encodeURI(`key=Test`)
	})
	```
