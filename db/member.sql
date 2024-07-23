 use HRDB2019;
 SELECT DATABASE();
 
 -- lotte member table
 create table lotte_member(
user_id varchar(30) primary key, 
user_pw varchar(20) not null,
user_name varchar(10) not null, 
phone char(13) not null, 
emailId varchar(20) not null, 
emailDomain varchar(20) not null,
name varchar(20),
address varchar(40), 
zipcode char(5),
birth date,
point int, 
join_date datetime
);
 desc lotte_member;
 select * from lotte_member;
 
 --  회원가입 
 insert into lotte_member(user_id ,user_pw, user_name, phone, emailId, emailDomain, name) 
 values('test', 11, '테스트씨', 01012345678,'test11', 'hanmail.net','강남');
 
 
 -- 로그인 처리
select count(user_id) cnt, any_value(user_pw) user_pw 
from lotte_member where user_id='test';