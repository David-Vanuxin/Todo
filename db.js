const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'David',
	password: '1234',
	database: 'TodoApp'
})

const create = (key, value) => {
	connection.query(`insert into data(name, content) values (?, ?)`, [key, value], (err, results, fields) => {
		if (err) throw err;
	})
}

const read = () => {
	connection.query('select * from data', (err, results, fields) => {
		if (err) throw err;

		console.log(results)
	})
}

module.exports = {create, read};