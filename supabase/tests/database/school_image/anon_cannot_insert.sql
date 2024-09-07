begin;

select plan(2);

insert into "flight_school"."image" (id, resource_id) values ('5C8735D9-3FD1-4474-9678-67E7DAAF1808', 'BBA87E2C-B802-448D-AC4B-EE87CED45E57');
insert into "flight_school"."school" (id, name, description) values ('E667F475-BA99-4005-9E17-AE6B8C54827F', 'School A', 'We provide quality teaching.');

prepare insert_image as insert into "flight_school"."school_image" (image_id, school_id) values ('5C8735D9-3FD1-4474-9678-67E7DAAF1808', 'E667F475-BA99-4005-9E17-AE6B8C54827F');

set role anon;
select throws_ok('insert_image', '42501', 'new row violates row-level security policy for table "school_image"', 'anon user should not be able to insert a school image');

set role authenticated;
select lives_ok('insert_image', 'authenticated user should be able to insert a school image');

rollback;