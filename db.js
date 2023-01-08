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

const read = callback => {
	connection.query('select * from data', (err, results, fields) => {
		if (err) throw err;
		callback(results);
	})
}

/*const updateById = (id, updated_field, new_value) => {
	if (updated_field == 'key') updated_field = 'name';
	if (updated_field == 'value') updated_field = 'content';

	connection.query(`update set ${updated_field}='${new_value}' where id=${id}`, (err, results, fields) => {
		if (err) throw err;
	})
}*/

const updateValueByKey = (key, new_value) => {
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

module.exports = {create, read, /*updateById,*/ updateValueByKey, deleteById, deleteByKey, deleteByValue};