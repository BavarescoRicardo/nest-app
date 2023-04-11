Nest API

The Nest API is a nest js project. It is designed to respond request calls covering all the tasks. 


# To Install

```bash
$ npm install
```

# To run the app

```bash
$ npm run start:dev
```

# Test

```bash
# unit tests
$ npm run test
```

# Executing
The routes can be acessed by postman/insomnia
  there are some rules for validation testing like the new user should have a email with more than 5 letters..

  The microservices
    send email / send message have the users and passwords in the .env file
    The RabbitMQ uses the local machine service

* POST /api/users

* GET localhost:3000/users/{id}

* GET localhost:3000/users/{id}/avatar

* DELETE /api/user/{userId}/avatar
