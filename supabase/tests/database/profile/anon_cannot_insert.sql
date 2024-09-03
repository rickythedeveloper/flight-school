begin;

select plan(2);

CREATE OR REPLACE FUNCTION auth.uid()
RETURNS uuid AS $$
BEGIN
    RETURN 'A0AAEE55-A663-4BDB-955E-B1C0B6001337';
END;
$$ LANGUAGE plpgsql;

insert into "auth"."users" (id) values ('A0AAEE55-A663-4BDB-955E-B1C0B6001337');

prepare insert_profile as insert into "flight_school"."profile" (id, first_name, last_name) values ('A0AAEE55-A663-4BDB-955E-B1C0B6001337', 'First', 'Last');

set role anon;
select throws_ok('insert_profile', '42501', 'new row violates row-level security policy for table "profile"', 'anon user should not be able to insert a profile');

set role authenticated;
select lives_ok('insert_profile', 'authenticated user should be able to insert a profile');

rollback;