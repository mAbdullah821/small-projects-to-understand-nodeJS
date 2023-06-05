#!/bin/bash
# to run the script do this:
#
# sh /path/to/batch-sql-scripts-runner.sh
#
mysql -u <db_user> -p<db_password> < ../scripts/00-create-database.sql
mysql -u <db_user> -p<db_password> < ../scripts/01-users-table.sql
mysql -u <db_user> -p<db_password> < ../scripts/02-devices-table.sql
mysql -u <db_user> -p<db_password> < ../scripts/03-blacklist-table.sql
mysql -u <db_user> -p<db_password> < ../scripts/04-create-admin-user.sql
mysql -u <db_user> -p<db_password> < ../scripts/05-create-auto-remove-expired-tokens-event-scheduler.sql