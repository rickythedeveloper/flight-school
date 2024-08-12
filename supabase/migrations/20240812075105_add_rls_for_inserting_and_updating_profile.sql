create policy "authenticated users can insert their own profile"
on "flight_school"."profile"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = id));


create policy "authenticated users can update their own profile"
on "flight_school"."profile"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = id))
with check ((( SELECT auth.uid() AS uid) = id));



