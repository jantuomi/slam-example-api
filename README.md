# SLAM Example API

## Running

Set up local db

    docker-compose up -d db
    cat migrations/up/001-initial.sql | docker-compose exec -T db psql -U postgres

Run app

    npm ci
    npm run dev
