# Doctor API Spec

## Create Doctor API

Endpoint : POST /api/doctors

Header : 
- Authorization : token

Request Body : 

```json
{
    "name": "Agus Salim, Sp.M.",
    "specialist": "Umum",
    "polyclinic": "Poli Anak",
    "email": "agus@gmail.com",
    "phone": "09897748784",
    "address": "Cihuni No. 102, Pagedangan, Tangsel"
}
```

Response Body Success : 

```json
{
    "data" : {
        "id" : 1,
        "name": "Agus Salim, Sp.M.",
        "specialist": "Umum",
        "polyclinic": "Poli Anak",
        "email": "agus@gmail.com",
        "phone": "09897748784",
        "address": "Cihuni No. 102, Pagedangan, Tangsel"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Email is not valid format"
}
```

## Update Doctor API

Endpoint : UPDATE /api/doctors/:id

Header : 
- Authorization : token

Request Body : 

```json
{
    "name": "Agus Salim, Sp.M.",
    "specialist": "Umum",
    "polyclinic": "Poli Anak",
    "email": "agus@gmail.com",
    "phone": "09897748784",
    "address": "Cihuni No. 102, Pagedangan, Tangsel"
}
```

Response Body Success : 

```json
{
    "data" : {
        "id" : 1,
        "name": "Agus Salim, Sp.M.",
        "specialist": "Umum",
        "polyclinic": "Poli Anak",
        "email": "agus@gmail.com",
        "phone": "09897748784",
        "address": "Cakung No. 102, DKI Jakarta"
    }
}
```

## Get Doctor API

Endpoint : GET /api/doctor/:id

Headers : 
- Authorization : token

Response Body Success:

```json
{
    "data" : {
        "id" : 1,
        "name": "Agus Salim, Sp.M.",
        "specialist": "Umum",
        "polyclinic": "Poli Anak",
        "email": "agus@gmail.com",
        "phone": "09897748784",
        "address": "Cakung No. 102, DKI Jakarta"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Doctor is not found"
}
```

## Search Doctor API

Endpoint : GET /api/doctors

Headers : 
- Authorization : token

Query params : 
- name : Search by name or last_name using like, optional
- email : Search by email usling like, optional
- phone : Search by phone, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

 ```json
{
    "data" : [ 
        {
            "id" : 1,
            "name": "Agus Salim, Sp.M.",
            "specialist": "Umum",
            "polyclinic": "Poli Anak",
            "email": "agus@gmail.com",
            "phone": "09897748784",
            "address": "Cakung No. 102, DKI Jakarta"
        },
        {
            "id" : 2,
            "name": "Karina Mawardah, Sp.M.",
            "specialist": "Kandungan",
            "polyclinic": "Poli Kandungan",
            "email": "karina@gmail.com",
            "phone": "0847994784",
            "address": "Kr. Dadap No. 102, Tangsel"
        },
    ],
    "paging" : {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    }
}
```

Response Bodu Error ;

```json
{
    "data": []
}
```

## Remove Doctor API

Endpoint : DELETE /api/doctors

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
    "errors" : "Doctor is not found"
}
```