# immi
It's My Medical Information

## MongoDB/Docker Start
`sudo docker compose up -d` [ENTER]

## Run Application (MONGO MUST RUN FIRST)
`node src/app.js` [ENTER]

## Run with SSL
`sudo caddy reverse-proxy --from localhost:443 --to localhost:5000` [ENTER]

## Troubleshooting
1. MongoDB Logs: `sudo docker compose logs mongodb` [ENTER]