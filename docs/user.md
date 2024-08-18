# User API Spec

## Register User API

Endpoint: POST /api/user

Request body :

```json
{
    "username": "eli",
    "password": "rahasia",
    "name": "Eli"
}
```

Response Body success :

```json
{
    "data": {
        "username": "eli",
        "name": "Eli"
    }
}
```

Response Body error :

```json
{
    "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username": "eli",
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

## Update User API

Endpoint : PATCh /api/users/current

Headers :
- Authorization : token

Request Body : 

```json
{
    "name": "Eli Aja", //optional1
    "password": "new password" //optional2
}
```

Response Body Success :

```json
{
    "data": {
        "username": "eli",
        "name": "Eli Aja"
    }
}
```

Response Body Error :

```json
{
    "errors": "name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers : 
- Authorization : token

Response Body Success : 

```json
{
    "data": {
        "username": "eli",
        "name": "Eli Aja"
    }
}
```

Response Body Error :

```json
{
    "errors": "unauthorized"
}
```

## Logout user API

Endpoint : GET /api/users/ogout

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