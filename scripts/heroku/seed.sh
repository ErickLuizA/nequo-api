#!/bin/bash

echo "Seeding database..."

heroku run node ace db:seed

echo "Done!"