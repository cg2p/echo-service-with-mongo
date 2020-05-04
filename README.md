# Echo Service with Mongo DB
Simple Echo REST API service using Node and Express storing data in Mongo

```
GET / > returns simple ping message
POST /echo > echoes back the text posted to it and stores the data
POST /reverse > echoes back the reverse of the text posted to it and stores the data

```

## Run
Start using scripts in package.json. Will run on localhost:3000 as default.
```
npm run dev
```

# Test
GET /
```
$ curl http://localhost:3000
> ping!
```

POST /echo
```
$ curl -H "Content-Type: application/json" -X POST -d '{"echoText":"bob"}' http://localhost:3000/echo
> {"echoResponse":"bob"}
```

POST /reverse
```
$ curl -H "Content-Type: application/json" -X POST -d '{"reverseInput":"very good"}' http://localhost:3000/reverse
> {"reverseOutput":"doog yrev"}
```

## Config
Uses a config parameter module, plus dotenv for secrets and globals. Rename `env.CHANGEME` to `.env` (which is in .gitignore). 


