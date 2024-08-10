create schema if not exists "flight_school";

GRANT USAGE ON SCHEMA flight_school TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA flight_school TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA flight_school TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA flight_school TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA flight_school GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA flight_school GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA flight_school GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
