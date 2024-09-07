alter table "flight_school"."school_image" drop constraint "school_image_image_id_fkey";

alter table "flight_school"."school_image" drop constraint "school_image_school_id_fkey";

alter table "flight_school"."school_image" add constraint "school_image_image_id_fkey" FOREIGN KEY (image_id) REFERENCES flight_school.image(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "flight_school"."school_image" validate constraint "school_image_image_id_fkey";

alter table "flight_school"."school_image" add constraint "school_image_school_id_fkey" FOREIGN KEY (school_id) REFERENCES flight_school.school(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "flight_school"."school_image" validate constraint "school_image_school_id_fkey";

create policy "authenticated users can delete images"
on "flight_school"."image"
as permissive
for delete
to authenticated
using (true);


create policy "authenticated users can insert images"
on "flight_school"."image"
as permissive
for insert
to authenticated
with check (true);


create policy "authenticated users can select images"
on "flight_school"."image"
as permissive
for select
to authenticated
using (true);


create policy "authenticated users can delete school images"
on "flight_school"."school_image"
as permissive
for delete
to authenticated
using (true);


create policy "authenticated users can insert school images"
on "flight_school"."school_image"
as permissive
for insert
to authenticated
with check (true);


create policy "authenticated users can select school images"
on "flight_school"."school_image"
as permissive
for select
to authenticated
using (true);



