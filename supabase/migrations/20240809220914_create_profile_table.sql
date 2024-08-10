create table "flight_school"."profile" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "first_name" text not null,
    "last_name" text not null
);


alter table "flight_school"."profile" enable row level security;

CREATE UNIQUE INDEX profile_pkey ON flight_school.profile USING btree (id);

alter table "flight_school"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "flight_school"."profile" add constraint "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "flight_school"."profile" validate constraint "profile_id_fkey";


