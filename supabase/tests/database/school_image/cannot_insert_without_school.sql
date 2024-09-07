begin;

select plan(1);

insert into "flight_school"."image" (id, resource_id) values ('00100A2F-D3C7-4CEC-969B-7DB49A9BBC60', '3F63AF09-5410-4C42-B3F5-27D3A9AFA65E');

prepare insert_image as insert into "flight_school"."school_image" (image_id) values ('00100A2F-D3C7-4CEC-969B-7DB49A9BBC60');

set role authenticated;
select throws_ok('insert_image', '23502', 'null value in column "school_id" of relation "school_image" violates not-null constraint', 'users should not be able to insert a school image without linking to a school');

rollback;