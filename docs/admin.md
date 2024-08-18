# Admin Api Spec

## Create Admin API

Endpoint: POST /api/admins

Headers : 
- Authorization : token

Request body :

```json
{
    "username": "admin1",
    "name": "Admin 1",
    "email": "admin1@gmail.com",
    "phone": "08976887788",
    "password": "rahasia"
}
```

Response Body success :

```json
{
    "data": {
        "id": 1,
        "username": "admin1",
        "name": "Admin 1",
        "email": "admin1@gmail.com",
        "phone": "08976887788",
    }
}
```

Response Body error :

```json
{
    "errors": "Username already registered"
}
```

## Login Admin API

Endpoint : POST /api/admins/login

Request Body :

```json
{
    "username": "admin1",
    "password": "rahasia"
}
```

Response Body Success :

```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Respose Body Error :

```json
{
    "errors": "username or password wrong"
}
```

## Update Admin API

Endpoint : PUT /api/admins/:id

Headers :
- Authorization : token

```json
{
    "username": "admin1",
    "name": "Admin 1",
    "email": "admin1@gmail.com",
    "phone": "08976887788",
    "password": "rahasia"
}
```

esponse Body Success : 

```json
{
    "data" : {
        "id" : 1,
        "username" : "admin1",
        "name" : "Admin oke",
        "email" : "admin@gmail.com",
        "phone" : "34343354534",
        "password": "password"

    }
}
```

Response Body Error :

```json
{
    "errors" : "Email is not valid format"
}
```

## Get Admin API

Endpoint : GET /api/admins/:id

Headers : 
- Authorization : token

Response Body Success:

```json
{
    "data" : {
        "id" : 1,
        "username" : "admin1",
        "name" : "Admin oke",
        "email" : "admin@gmail.com",
        "phone" : "34343354534"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Admins is not found"
}
```

## Logout Admin API

Endpoint : GET /api/admins/ogout

Headers :
- Authorization : token

```json
{
    "data": "Ok"
}
```

Response Body Error :

```json
{
    "errors": "unauthorized"
}
```

## Remove Admin API

Endpoint : DELETE /api/admins

Headers : 
- Authorization : token

Response Body Success: 

```json
{
    "data" : "Ok"
}
```

Response Body Error :

```json
{
    "errors" : "Admin is not found"
}
```