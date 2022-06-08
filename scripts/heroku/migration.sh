#!/bin/bash

echo "Migrating database..."

heroku run node ace migration:run

echo "Done!"