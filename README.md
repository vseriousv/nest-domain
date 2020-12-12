## Installation - npm or yarn

```bash
$ npm install
|
$ yarn install
```

## Create database - npm or yarn
The project uses postgresql. 
Add access to your database in the global variables and use 
the command below to create the database:
```bash
$ npm run db:create
|
$ yarn run db:create
```

## Migration - npm or yarn
To build the database architecture for a given project, use the command below:
```bash
$ npm run db:migrate
|
$ yarn run db:migrate
```

## First data for your project - npm or yarn
If you need initial data for your project, for example "create user" - 
then use the seeders-devs migration.
Specify the appropriate sql query in the file
``/db/seeders-dev/20201006135633-insert-genesis.js"`` and
to execute it use the command below:
```bash
$ npm run db:seed-dev
|
$ yarn run db:seed-dev
```

## Generate migration and seeds - only ts-node command
To generate migration files and seed-dev files use the command below:
```bash
$ ts-node node_modules/.bin/sequelize migration:generate --name {YOUR-MIGRATION-NAME}
|
$ ts-node node_modules/.bin/sequelize seed-dev:generate --name {YOUR-SEED-DEV-NAME}
```

## Running the app - npm or yarn

```bash
# development
$ npm run start
|
$ yarn run start

# watch mode
$ npm run start:dev
|
$ yarn run start:dev

# production mode
$ npm run start:prod
|
$ yarn run start:prod
```
<!--
## Test - npm or yarn

```bash
# unit tests
$ npm run test
|
$ yarn run test

# e2e tests
$ npm run test:e2e
|
$ yarn run test:e2e

# test coverage
$ npm run test:cov
|
$ yarn run test:cov
```
-->

