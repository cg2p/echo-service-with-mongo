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
npm run start
```

# Test
GET /
```
$ curl http://localhost:3001
> ping!
```

POST /echo
```
$ curl -H "Content-Type: application/json" -X POST -d '{"echoText":"bob"}' http://localhost:3000/echo
> {"echoResponse":"bob"}
```

POST /reverse
```
$ curl -H "Content-Type: application/json" -X POST -d '{"inputText":"very good"}' http://localhost:3000/reverse
> {"reverseOutput":"doog yrev"}
```
curl -H "Content-Type: application/json" -X POST -d '{"uid":"789", "inputText":"very good"}' http://173.193.79.169:32743/echo

## Config
Uses a config parameter module, plus dotenv for secrets and globals. Rename `env.CHANGEME` to `.env` (which is in .gitignore). 


## Build activities
