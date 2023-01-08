# The simplest todo app

## Capatibilities

You can see all your records, update and delete them, also create new records 

## Exstension

App has <strong>REST API</strong>: it's 4 requests to the "/api" route 

### Code samples
1. <strong>Create</strong> record have key is "Test" and value is "Record"
javascript```
fetch('http://localhost:3000/api', {
	method: 'POST',
	headers: {
		'Content-Type':'application/x-www-form-urlencoded'
	},
	body: encodeURI(`key=Test&value=Record`)
})
```

2. <strong>Read</strong> all records and print to console
javascript```
fetch('http://localhost:3000/api')
	.then(response => {
		return response.json();
	})
	.then(data => {
		console.log(data);
	})
```

3. To <strong>update</strong> value you need specify key and new value
javascript```
fetch('http://localhost:3000/api', {
		method: 'PUT',
		headers: {
			'Content-Type':'application/x-www-form-urlencoded'
		},
		body: encodeURI(`key=Test&value=Updated`)
	})
```


4. <strong>Delete</strong>
javascript```
fetch('http://localhost:3000/api', {
	method: 'DELETE',
	headers: {
		'Content-Type':'application/x-www-form-urlencoded'
	},
	body: encodeURI(`key=Test`)
})
```
