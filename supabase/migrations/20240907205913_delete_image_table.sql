drop policy "authenticated users can delete images" on "flight_school"."image";

drop policy "authenticated users can insert images" on "flight_school"."image";

drop policy "authenticated users can select images" on "flight_school"."image";

revoke delete on table "flight_school"."image" from "anon";

revoke insert on table "flight_school"."image" from "anon";

revoke references on table "flight_school"."image" from "anon";

revoke select on table "flight_school"."image" from "anon";

revoke trigger on table "flight_school"."image" from "anon";

revoke truncate on table "flight_school"."image" from "anon";

revoke update on table "flight_school"."image" from "anon";

revoke delete on table "flight_school"."image" from "authenticated";

revoke insert on table "flight_school"."image" from "authenticated";

revoke references on table "flight_school"."image" from "authenticated";

revoke select on table "flight_school"."image" from "authenticated";

revoke trigger on table "flight_school"."image" from "authenticated";

revoke truncate on table "flight_school"."image" from "authenticated";

revoke update on table "flight_school"."image" from "authenticated";

revoke delete on table "flight_school"."image" from "service_role";

revoke insert on table "flight_school"."image" from "service_role";

revoke references on table "flight_school"."image" from "service_role";

revoke select on table "flight_school"."image" from "service_role";

revoke trigger on table "flight_school"."image" from "service_role";

revoke truncate on table "flight_school"."image" from "service_role";

revoke update on table "flight_school"."image" from "service_role";

alter table "flight_school"."image" drop constraint "image_resource_id_key";

alter table "flight_school"."school_image" drop constraint "school_image_image_id_fkey";

alter table "flight_school"."school_image" drop constraint "school_image_image_id_key";

alter table "flight_school"."image" drop constraint "image_pkey";

drop index if exists "flight_school"."image_pkey";

drop index if exists "flight_school"."image_resource_id_key";

drop index if exists "flight_school"."school_image_image_id_key";

drop table "flight_school"."image";

alter table "flight_school"."school_image" drop column "image_id";

alter table "flight_school"."school_image" add column "resource_id" uuid not null;

CREATE UNIQUE INDEX school_image_resource_id_key ON flight_school.school_image USING btree (resource_id);

alter table "flight_school"."school_image" add constraint "school_image_resource_id_key" UNIQUE using index "school_image_resource_id_key";


