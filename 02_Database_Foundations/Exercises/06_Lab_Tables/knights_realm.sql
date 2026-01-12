-- knights_realm.sql

-- This script is written so it can be executed in two ways:
--  1) Run the CREATE/DROP statements from the 'postgres' maintenance DB (psql or GUI):
--       DROP DATABASE IF EXISTS knights_realm;
--       CREATE DATABASE knights_realm;
--    Then connect to knights_realm and run the rest of this file (or open a new SQL editor targeting knights_realm).
--  2) In GUIs like DBeaver you can run the `CREATE DATABASE` statements in the default DB, then switch connection to knights_realm and run the remainder.

-- ---- DROP & CREATE the database (run as a superuser)


-- After creating the DB, connect to it before running the schema below.
-- In psql:  \c knights_realm
-- In DBeaver: open a new SQL Editor connected to knights_realm



-- Realms table
