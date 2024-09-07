begin;

select plan(4);

insert into "flight_school"."image" (id, resource_id) values ('90AF42CF-B8B9-4803-A185-00EA4561357F', 'BBA87E2C-B802-448D-AC4B-EE87CED45E57');
insert into "flight_school"."school" (id, name, description) values ('CC7CAAD8-6026-4369-BC60-275CBEE03206', 'School A', 'We provide quality teaching.');
insert into "flight_school"."school_image" (id, image_id, school_id) values ('FDF4A03E-E9A0-46C2-87BF-383FE45CD27B', '90AF42CF-B8B9-4803-A185-00EA4561357F', 'CC7CAAD8-6026-4369-BC60-275CBEE03206');

set role authenticated;

prepare delete_image as delete from "flight_school"."image" where id='90AF42CF-B8B9-4803-A185-00EA4561357F';
prepare delete_school as delete from "flight_school"."school" where id='CC7CAAD8-6026-4369-BC60-275CBEE03206';
prepare delete_school_image as delete from "flight_school"."school_image" where id='FDF4A03E-E9A0-46C2-87BF-383FE45CD27B';

select throws_ok('delete_image', '23503', 'update or delete on table "image" violates foreign key constraint "school_image_image_id_fkey" on table "school_image"', 'users should not be able to delete image before deleting school image');
select throws_ok('delete_school', '23503', 'update or delete on table "school" violates foreign key constraint "school_image_school_id_fkey" on table "school_image"', 'users should not be able to delete school before deleting school image');

execute delete_school_image;

select lives_ok('delete_image', 'users should be able to delete image after deleting school image');
select lives_ok('delete_image', 'users should be able to delete school after deleting school image');

rollback;