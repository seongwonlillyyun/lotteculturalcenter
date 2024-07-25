 use HRDB2019;
 SELECT DATABASE();
 
 -- lotte member table
 create table member(
user_id varchar(30) primary key, 
user_pw varchar(80) not null,
user_name varchar(10) not null, 
phone char(13) not null, 
emailId varchar(20) not null, 
emailDomain varchar(20) not null,
name varchar(20) not null,
address varchar(40), 
zipcode char(5),
birth date not null,
point int default(0),  
join_date datetime
);

 desc member;
 select * from member;
 
 select * from location;
 
 --  지점 이름 부르기 (관심지점) 
 select loc_id,type, name from location;
        
 -- 비밀번호 글자수 늘리기 
 alter table lotte_member modify column user_pw varchar(80) not null; 
 
 --  회원가입 
 insert into member(user_id ,user_pw, user_name, phone, emailId, emailDomain, name) 
 values('test', 11, '테스트씨', 01012345678,'test11', 'hanmail.net','강남');
 
 
 -- 로그인 처리
select count(user_id) cnt, any_value(user_pw) user_pw 
from member where user_id='test';

-- 회원자료 변경페이지에서 자료 호출 먼저 
select user_name, user_id, emailId, emailDomain, 
		left(birth,10) birth, 
        address, phone
		from lotte_member where user_id ='doo';
        
-- 관심지점 변경
update lotte_member set name = '인천점' where user_id = 'mija';
 select * from member;
 
 -- 데이터 삭제(그냥 내가 한거)
 delete from lotte_member where user_id = 'test44';
 
 -- point 컬럼 default값 설정! 
alter table lotte_member alter column point set default 0;
drop table member;
 
