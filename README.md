# Echo Service
Simple Echo REST API service using Node and Express.

```
GET / > returns simple ping message
POST /echo > echos back the text posted to it
```

## Run
Start using scripts in package.json e.g.
```
npm run dev
```

curl http://localhost:3000
curl -H "Content-Type: application/json" -X POST -d '{"echoText":"bob"}' http://localhost:3000/echo


## Config
Uses a config parameter module, plus dotenv for secrets and globals. Rename `env.CHANGEME` to `.env` (which is in .gitignore). 


