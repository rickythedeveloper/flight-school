begin;

select plan(2);

prepare insert_image as insert into "flight_school"."image" (resource_id) values ('3C1F0786-7E9D-4B6D-8BF3-7B6D6B2FFBCE');

set role anon;
select throws_ok('insert_image', '42501', 'new row violates row-level security policy for table "image"', 'anon user should not be able to insert an image');

set role authenticated;
select lives_ok('insert_image', 'authenticated user should be able to insert an image');

rollback;