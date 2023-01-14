const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: /*mysql user username*/,
	password: /*your mysql password*/,
	database: 'TodoApp' // if you already created database using create-db.sql 
})

const create = (key, value) => {
	connection.query(`insert into data(name, content) values (?, ?)`, [key, value], (err, results, fields) => {
		if (err) throw err;
	})
}

const read = callback => {
	connection.query('select * from data', (err, results, fields) => {
		if (err) throw err;
		callback(results);
	})
}

const updateValueByKey = (key, new_value) => {
	new_value = new_value.replaceAll('\\', '\\\\'); // protection from  \ 
	new_value = new_value.replaceAll('\'', '\\\''); // protection from  ' 
	key = key.replaceAll('\\', '\\\\');
	key = key.replaceAll('\'', '\\\''); 
	connection.query(`update data set content='${new_value}' where name='${key}'`, (err, results, fields) => {
		if (err) throw err;
	})
}

const deleteById = id => {
	connection.query('delete from data where id=?', [id],(err, results, fields) => {
		if (err) throw err;
	})
}

const deleteByKey = key => {
	connection.query('delete from data where name=?', [key],(err, results, fields) => {
		if (err) throw err;
	})
}

const deleteByValue = value => {
	connection.query('delete from data where content=?', [value],(err, results, fields) => {
		if (err) throw err;
	})
}

module.exports = {create, read, updateValueByKey, deleteById, deleteByKey, deleteByValue};
