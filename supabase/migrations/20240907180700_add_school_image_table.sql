create table "flight_school"."school_image" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "image_id" uuid not null,
    "school_id" uuid not null
);


alter table "flight_school"."school_image" enable row level security;

CREATE UNIQUE INDEX school_image_image_id_key ON flight_school.school_image USING btree (image_id);

CREATE UNIQUE INDEX school_image_pkey ON flight_school.school_image USING btree (id);

alter table "flight_school"."school_image" add constraint "school_image_pkey" PRIMARY KEY using index "school_image_pkey";

alter table "flight_school"."school_image" add constraint "school_image_image_id_fkey" FOREIGN KEY (image_id) REFERENCES flight_school.image(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "flight_school"."school_image" validate constraint "school_image_image_id_fkey";

alter table "flight_school"."school_image" add constraint "school_image_image_id_key" UNIQUE using index "school_image_image_id_key";

alter table "flight_school"."school_image" add constraint "school_image_school_id_fkey" FOREIGN KEY (school_id) REFERENCES flight_school.school(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "flight_school"."school_image" validate constraint "school_image_school_id_fkey";

grant delete on table "flight_school"."school_image" to "anon";

grant insert on table "flight_school"."school_image" to "anon";

grant references on table "flight_school"."school_image" to "anon";

grant select on table "flight_school"."school_image" to "anon";

grant trigger on table "flight_school"."school_image" to "anon";

grant truncate on table "flight_school"."school_image" to "anon";

grant update on table "flight_school"."school_image" to "anon";

grant delete on table "flight_school"."school_image" to "authenticated";

grant insert on table "flight_school"."school_image" to "authenticated";

grant references on table "flight_school"."school_image" to "authenticated";

grant select on table "flight_school"."school_image" to "authenticated";

grant trigger on table "flight_school"."school_image" to "authenticated";

grant truncate on table "flight_school"."school_image" to "authenticated";

grant update on table "flight_school"."school_image" to "authenticated";

grant delete on table "flight_school"."school_image" to "service_role";

grant insert on table "flight_school"."school_image" to "service_role";

grant references on table "flight_school"."school_image" to "service_role";

grant select on table "flight_school"."school_image" to "service_role";

grant trigger on table "flight_school"."school_image" to "service_role";

grant truncate on table "flight_school"."school_image" to "service_role";

grant update on table "flight_school"."school_image" to "service_role";


