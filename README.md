# immi
It's My Medical Information

## MongoDB/Docker Start
`sudo docker compose up -d` [ENTER]

## Run Application (MONGO MUST RUN FIRST)
`node src/app.js` [ENTER]

## Create .env in src
MONGO_URI=mongodb://root:leeth4x0r@localhost:27017/immi?authSource=admin

PORT=5000

WORLDCOIN_API_KEY=

WORLDCOIN_CLIENT_ID=app_staging_

WORLDCOIN_CLIENT_SECRET=sk_

WORLDCOIN_REDIRECT_URI=https://localhost/callback

JWT_SECRET=your_jwt_secret

AUTH0_SECRET=

AUTH0_CLIENTID=

AUTH0_BASEURL=https://localhost

AUTH0_ISSUERBASEURL=

## Run with SSL
`sudo caddy reverse-proxy --from localhost:443 --to localhost:5000` [ENTER]

## Troubleshooting
1. MongoDB Logs: `sudo docker compose logs mongodb` [ENTER]