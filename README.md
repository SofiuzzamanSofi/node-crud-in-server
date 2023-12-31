﻿<h1 align="center">
Node-Crud-In-Server
</h1>

### Live Preview site: [Nove-Crud](https://node-crud-in-server-fs-module.vercel.app)

<p>NB: Node <span > fs </span> module only works in local pc or when you use your local pc as a server.</p>

<br/>
<br/>

* Get a random user from the .json file
```bash
Route: https://node-crud-in-server-fs-module.vercel.app/api/vi/user

Method: GET
```

<br/>

* GET /user/all A list of random users
```bash
Route: https://node-crud-in-server-fs-module.vercel.app/api/v1/user/all

With Limit Users:
Route: https://node-crud-in-server-fs-module.vercel.app/api/v1/user/all?limit=10

Method: GET
```

<br/>

* POST /user/save Save a random user
```bash
Route: https://node-crud-in-server-fs-module.vercel.app/api/v1/user

Method: POST
Body: {
    "gender": "male 11 fsafsafsaf",
    "name": "John Doe",
    "contact": "+1234567890",
    "address": "123 Main St, City",
    "photoUrl": "https://example.com/john_doe.jpg",
    }
```

<br/>

* PUT /user/update Update a random user
```bash
Route: https://node-crud-in-server-fs-module.vercel.app/api/v1/user

Method: PUT
Body: {
    "id": 18,
    "gender": "female",
    "name": "mamur bata",
    "contact": "+123456789858580",
    "address": "123 Dhaka City",
    "photoUrl": "https://example.com/john_doe.jpg",
    }
```

<br/>

* PATCH /user/bulk-update update multiple users
```bash
Route: https://node-crud-in-server-fs-module.vercel.app/api/v1/user

Method: PATCH
Body: [
    {
        "id": "17",
        "gender": "male",
        "name": "John Doe",
        "contact": "+1234567890",
        "address": "123 Main St, City",
        "photoUrl": "https://example.com/john_doe.jpg",
    },
    {
        "id": 8,
        "gender": "female",
        "name": "Jane Smith",
        "contact": "+8595858454",
        "address": "456 Elm St, Town",
        "photoUrl": "https://example.com/jane_smith.jpg",
    },
    ]
```

<br/>

* DELETE /user/ delete
```bash
Route: https://node-crud-in-server-fs-module.vercel.app/api/v1/user?id=15

Method: DELETE
```

<h3 align="center">
Thank You.
</h3>
