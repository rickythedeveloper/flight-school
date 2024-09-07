create table "flight_school"."image" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "resource_id" uuid not null
);


alter table "flight_school"."image" enable row level security;

create table "flight_school"."school" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" text not null
);


alter table "flight_school"."school" enable row level security;

CREATE UNIQUE INDEX image_pkey ON flight_school.image USING btree (id);

CREATE UNIQUE INDEX image_resource_id_key ON flight_school.image USING btree (resource_id);

CREATE UNIQUE INDEX school_pkey ON flight_school.school USING btree (id);

alter table "flight_school"."image" add constraint "image_pkey" PRIMARY KEY using index "image_pkey";

alter table "flight_school"."school" add constraint "school_pkey" PRIMARY KEY using index "school_pkey";

alter table "flight_school"."image" add constraint "image_resource_id_key" UNIQUE using index "image_resource_id_key";

grant delete on table "flight_school"."image" to "anon";

grant insert on table "flight_school"."image" to "anon";

grant references on table "flight_school"."image" to "anon";

grant select on table "flight_school"."image" to "anon";

grant trigger on table "flight_school"."image" to "anon";

grant truncate on table "flight_school"."image" to "anon";

grant update on table "flight_school"."image" to "anon";

grant delete on table "flight_school"."image" to "authenticated";

grant insert on table "flight_school"."image" to "authenticated";

grant references on table "flight_school"."image" to "authenticated";

grant select on table "flight_school"."image" to "authenticated";

grant trigger on table "flight_school"."image" to "authenticated";

grant truncate on table "flight_school"."image" to "authenticated";

grant update on table "flight_school"."image" to "authenticated";

grant delete on table "flight_school"."image" to "service_role";

grant insert on table "flight_school"."image" to "service_role";

grant references on table "flight_school"."image" to "service_role";

grant select on table "flight_school"."image" to "service_role";

grant trigger on table "flight_school"."image" to "service_role";

grant truncate on table "flight_school"."image" to "service_role";

grant update on table "flight_school"."image" to "service_role";

grant delete on table "flight_school"."school" to "anon";

grant insert on table "flight_school"."school" to "anon";

grant references on table "flight_school"."school" to "anon";

grant select on table "flight_school"."school" to "anon";

grant trigger on table "flight_school"."school" to "anon";

grant truncate on table "flight_school"."school" to "anon";

grant update on table "flight_school"."school" to "anon";

grant delete on table "flight_school"."school" to "authenticated";

grant insert on table "flight_school"."school" to "authenticated";

grant references on table "flight_school"."school" to "authenticated";

grant select on table "flight_school"."school" to "authenticated";

grant trigger on table "flight_school"."school" to "authenticated";

grant truncate on table "flight_school"."school" to "authenticated";

grant update on table "flight_school"."school" to "authenticated";

grant delete on table "flight_school"."school" to "service_role";

grant insert on table "flight_school"."school" to "service_role";

grant references on table "flight_school"."school" to "service_role";

grant select on table "flight_school"."school" to "service_role";

grant trigger on table "flight_school"."school" to "service_role";

grant truncate on table "flight_school"."school" to "service_role";

grant update on table "flight_school"."school" to "service_role";


