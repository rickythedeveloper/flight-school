begin;

select plan(1);

insert into "flight_school"."school" (id, name, description) values ('91E6A70F-DA73-4728-82A7-479D08CC1841', 'School A', 'We provide quality teaching.');

prepare insert_image as insert into "flight_school"."school_image" (school_id) values ('91E6A70F-DA73-4728-82A7-479D08CC1841');

set role authenticated;
select throws_ok('insert_image', '23502', 'null value in column "resource_id" of relation "school_image" violates not-null constraint', 'users should not be able to insert a school image without a resource id');

rollback;