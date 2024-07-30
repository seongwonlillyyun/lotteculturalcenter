 use HRDB2019;
 select database();
 select * from member;
 select * from order_ms;
 select * from location;

create table order_ms(
orderId 	int  	auto_increment primary key, 
order_no 	int  		,  
order_date 	date 	not null, 
loc_id 		int 		not null, 
course_img 	varchar(200) , 
course_name varchar(100), 
teacher_name varchar(20) not null, 
course_start date 		not null, 
course_end 	date 		not null, 
start_time 	time 		not null, 
end_time 	time 		not null, 
cnumber 	int 		not null, 
price 		int			 not null, 
total_price int 		, 
point 		int 		, 
user_name 	varchar(10) ,
user_id 	varchar(30) ,
status 		varchar(10) default('결제완료'),
cancel_date datetime, 
cancel_info varchar(100), 
isReviewed 	boolean default(false) 
);

insert into order_ms(
orderId, order_date, 
loc_id, course_name,
teacher_name, course_start, 
course_end,start_time, 
end_time, cnumber, 
price, user_name, user_id, status ) 
values(
655, now(), 3,
'요가 중급', '이효리',
'2024-08-01', '2024-08-01',
'10:00', '11:00', 1, 115000,
'공유', 'test','결제완료'
);
select * from order_ms;
select * from order_ms where user_id='test';
select * from location;
select * from course;
-- left(order_date,10) order_date, 
-- test id기준으로 호출 
select orderId, 
order_date,
course_name, teacher_name,
left(course_start,10) course_start, 
left(course_end,10) course_end,
left(start_time,5) start_time, 
left(end_time,5) end_time,
cnumber,
format(price,0) price, 
name, 
user_name, 
status
from location lo, order_ms od 
where lo.loc_id = od.loc_id and user_id='test' and status='결제완료';

-- 취소 내역 조회
select orderId, 
order_date,
course_name, teacher_name,
left(course_start,10) course_start, 
left(course_end,10) course_end,
left(start_time,5) start_time, 
left(end_time,5) end_time,
cnumber,
format(price,0) price, 
name, 
user_name, 
status
from location lo, order_ms od 
where lo.loc_id = od.loc_id and status='결제취소' and user_id='test';

-- 검색 기능 
select * from order_ms 
where course_name like '%특강%' and user_id='test' and status='결제완료';

select * from order_ms where course_name like '%특강%' and status='결제취소';

-- loc id => 이름으로 표시 
select name from location lo, order_ms od
where lo.loc_id = od.loc_id;

select * from order_ms where user_id='test' and status ='결제취소';

--  status 결제완료 수량 보이기
select count(*) from order_ms where user_id='test' and status='결제완료';
select count(*) from order_ms where user_id='test' and status='결제취소';
-- 수강후기 수량보이기
select sum(isReviewed) from order_ms where user_id='test';

select * from order_ms;




-- orderId 기준으로 내용 호출(detail page) 
select order_date, course_name, teacher_name, 
		name, 
		left(course_start,10) course_start, 
		left(course_end,10) course_end,
		left(start_time,5) start_time, 
		left(end_time,5) end_time,
		cnumber,
		format(price,0) price,  
		user_name, status
from location lo, order_ms od where orderId= '11' and lo.loc_id = od.loc_id;


select * from order_ms;
select * from location;

-- 취소 모달 완료후 status 결제취소로 만들기
update order_ms set status = '결제취소', cancel_info='고객변심', cancel_date= now() where orderId = 11;

-- 결제 취소내역 보기
select * from order_ms where user_id ='test' and status='결제취소';

-- 결재완료 내역 보기 
select * from order_ms where user_id='test' and status ='결제완료';

-- 수강후기 수량 표시
