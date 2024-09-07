begin;

select plan(2);

prepare insert_school as insert into "flight_school"."school" (name, description) values ('Flight School A', 'We provide quality teaching.');

set role anon;
select throws_ok('insert_school', '42501', 'new row violates row-level security policy for table "school"', 'anon user should not be able to insert a school');

set role authenticated;
select lives_ok('insert_school', 'authenticated user should be able to insert a school');

rollback;