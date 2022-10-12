# Skill Factory Node - Trabajo Práctico 5 - Mathías Ezequiel Latrónico

## Tareas

- Implementar envio de mail con gmail mediante una ruta de express
- Implementar sistema de chat con salas mediante socket.io
- Integrar autorización local y OAuth con JWT
- Front-End simple para muestre todo lo integrado
- Guardar los users, mails y historial de chat en un JSON local con FS (File System)
- Documentar API

## Commands

### Install dependencies
```sh
npm install
```

### Start in development mode
```sh
npm run dev
```

### Start in production mode
```sh
npm start
```

### Test
```sh
npm test
```


## Dependencies

### Production

- bcrypt
- cors
- dotenv
- express
- google-auth-library
- jsonwebtoken
- morgan
- nodemailer
- socket.io

### Development 

- nodemon

# REST Api

## Users

### GET `/api/users`
#### Query params 
`skip` `limit`

### GET `/api/users/:userId`

### POST `/api/users`

```json
{
    "name": "Iron Man",
    "email": "iron.man@test.com",
    "password": "iamironman"
}
```

### PUT `/api/users/:userId`
```json
{
    "name": "Iron Man 2022",
    "email": "iron.man2022@test.com",
    "password": "iamironman2022"
}
```

### DELETE `/api/users/:userId`

## Auth

### GET `/api/profile`

### POST `/api/auth/login`
```json
{
    "email": "iron.man@test.com",
    "password": "iamironman"
}
```


### POST `/api/auth/register`
```json
{
    "name": "Iron Man",
    "email": "iron.man@test.com",
    "password": "iamironman"
}
```


### POST `/api/auth/google`
```json
{
    "credential": "google credential"
}
```


## Mail

### GET `/api/mail`

### POST `/api/mail`
```json
{
    "from": "iron.man@test.com",
    "to": "iron.man2022@test.com",
    "subject": "Test",
    "text": "Test send mail",
    "html": "<h1>I AM IRON MAN</h1>"
}
```
