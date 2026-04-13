#!/bin/sh
# Ensure data directory exists
mkdir -p /app/data/theme-history
echo "Data directory initialized."

# Run database migrations (push schema)
if [ -n "$DATABASE_URL" ]; then
  echo "Running database migrations..."
  npx prisma db push --skip-generate 2>/dev/null || echo "DB push skipped (may already be up to date)"
fi

exec "$@"
