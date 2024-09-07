create policy "authenticated users can delete schools"
on "flight_school"."school"
as permissive
for delete
to authenticated
using (true);


create policy "authenticated users can insert schools"
on "flight_school"."school"
as permissive
for insert
to authenticated
with check (true);


create policy "authenticated users can select schools"
on "flight_school"."school"
as permissive
for select
to authenticated
using (true);


create policy "authenticated users can update schools"
on "flight_school"."school"
as permissive
for update
to authenticated
using (true);



