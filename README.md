
## Description

I implemented this service using [Nest](https://github.com/nestjs/nest) i am use this for POC for handle performance issue on [NPARKS](https://www.nparks.gov.sg/florafaunaweb/species-search) web and I applied this service with several design patterns
- Dependency Injection and decorators
- Versioning API for scalable Development on Future
- Concurrent/Pararel Process on code for make better response time
- CQRS (Command Query Responsibility Segregation) is a design pattern that separates write operations (commands) from read operations (queries) in applications instead of use cache like redis i prefer use cqrs for this issue.
- Rate Limiter for maintain server performance (i set 1000 request per 1 minutes)
- Database Indexing for all Query (I asume the issue is from query locking actually so i put some indexing for POC test)
- Stress Test Sample for Benchmarking My API
- DockerFile for Production Mode Ready
- Unit Testing for Production Mode Ready

# Database Design
![alt text](https://github.com/SiswoHandoko/metapals-backend/blob/main/documentation/nparks.jpg?raw=true)

This Database Design is for POC only and replicate process from nparks web. 
Explanation :
- Table field_categories and fields is for clasification dropdown on filter modal 
- Table species is a species table wich will contain plant list or animal list in future
- Table native_habitats and family_names is table for relation 1 to many to species
- Table preferred_climate_zones is table many to many to species 
- Column commonName is contain array value for handle dynamic value

so basiccaly i try to make any representative case for any table relation from 1-n, n-n, and even dynamic value on field for future proof

## Installation

```bash
$ npm install
```

## Create .env File (example only)
```bash
# ENV TYPE
NODE_ENV=development

# DIALECT OR TYPE OF DB CONNECTION
POSTGRE_DIALECT=postgres

# MASTER CONNECTION FOR CREATE/UPDATE/DELETE OPERATION QUERY
POSTGRE_PORT_MASTER=5432
POSTGRE_HOST_MASTER=localhost
POSTGRE_USER_MASTER=postgres
POSTGRE_PASS_MASTER=
POSTGRE_DB_MASTER=metapals

# SLAVE CONNECTION ONLY FOR SELECT OPERATION QUERY
POSTGRE_PORT_SLAVE_0=5432
POSTGRE_HOST_SLAVE_0=localhost
POSTGRE_USER_SLAVE_0=postgres
POSTGRE_PASS_SLAVE_0=
POSTGRE_DB_SLAVE_0=metapals
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

Runs the app in the development mode
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

I put Postman File on documentation folder on root directory
```bash
Metapals Backend.postman_collection.json
```

## Database Migration (PostgreSQL)

I create Migration and seeder for testing and POC the API performance you can check this command for running on local
```bash
# migration up all table
$ npx sequelize-cli db:migrate

# seed the data for login
$ npx sequelize-cli db:seed:all
```
instead of run migration on local you can import .sql too i put .sql file on folder documentation on root directory
```bash
metapals.sql
```

## Benchmark API and Stress Test API
use this command if you want to benchmarking the /v1/species list api you will get request persecond and average response time 
```bash
node .\stressTest.js
```

## Unit Test Command
use this command if you want to show Unit Test Coverage for all module it will be show the report coverage test from the code
```bash
# unit tests
$ npm run test

# test show coverage
$ npm run test:cov
```

## Docker Build Production Ready
I put Dockerfile too for deployment production ready on future you can build the app use this command 
```bash
# Build
$ docker build -t metapals-app .

# Run Docker image
$ docker run -p 3000:3000 metapals-app
```

## API Example 
I put 1 of API Example for this Repo for get species by advance filter
Request
```bash
http://localhost:3000/v1/species?page=1&perPage=10&fieldId=1&valueId=2&search=a&sortBy=name

Parameter
page:1 (mandatory)
perPage:10 (mandatory)
fieldId:1 (mandatory)
valueId:2 (mandatory if field Id is not 2)
value:keira (mandatory if field Id is 2)
search:a (Optional)
sortBy:name (Optional)
```

Response :
```bash
{
    "page": "1",
    "perPage": "10",
    "meta": "",
    "total": 75,
    "data": [
        {
            "id": 420,
            "familyNameId": 2,
            "nativeHabitatId": 4,
            "name": "Alberta Johns",
            "commonName": "{Lamont,Nico,Volkman}",
            "tag": "plant",
            "image": "https://loremflickr.com/640/480?lock=4972014819344384",
            "createdAt": "2024-03-05T07:25:29.163Z",
            "updatedAt": "2024-03-05T07:25:29.163Z"
        }
    ]
}
```

