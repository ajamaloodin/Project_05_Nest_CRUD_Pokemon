<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Execute in Dev Environment
 1. Clone the repository
 2. Execute the following command:
```
    yarn install
```
 3. You should have the NEST CLI installed:
```
    npm i -g @nestjs/cli
```
 4. Start up the DB:
```
    docker-compose up -d
```
 5. Rename the environment file 
 ```
    .env.template --> .env
 ```

 6. Setup your environment file 
 ```
    Define port, BD string conexion, etc.
 ```

 7. Start up the application:
```
    yarn start:dev
```
 8. Reload DB data using Seed:
```
    http://localhost:3000/api/v2/seed
```

## Stack:
- Nest
- MongoDB