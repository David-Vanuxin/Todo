create database TodoApp;

use TodoApp;

/*create table users;*/
create table data(
	id int auto_increment primary key,
	name varchar(255),
	content varchar(255)
);

/*create*/
insert into data(name, content) values ("name", "content");

/*read*/
select * from data;

/*update*/
update data set name='David' where name='name';
update data set content='Vanuhin' where id=1;

/*delete*/
delete from data where id=1;