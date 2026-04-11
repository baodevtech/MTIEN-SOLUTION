#!/bin/sh
# Ensure data directory exists for admin standalone deployment
mkdir -p /app/data/theme-history
echo "Data directory initialized."
exec "$@"
