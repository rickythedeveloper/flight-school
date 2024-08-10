create policy "authenticated_user_can_select_profile"
on "flight_school"."profile"
as permissive
for select
to authenticated
using (true);