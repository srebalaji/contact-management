# Contact Management
A simple Contact management app built in NodeJS, MongoDB

## Installation
1. Clone the repo.
2. npm i.
3. nodemon index.js

## Docs
The user can manage Contacts and Contact groups.

### Contact

#### 1. List all contacts
```
GET /contact
```

#### 2. Search contacts
```
GET /contact?q=search_query
```

#### 3. Create contact
```
POST /contact
Body:
{
  name: "Srebalaji",
  details: [
    {
      "type": "email",
      "email": "srebalaji@example.com",
      "tag": "personal"
    }
  ]
}

{
  name: "Srebalaji",
  details: [
    {
      "type": "mobile",
      "mobile": "1234567890",
      "tag": "work"
    }
  ]
}
```

#### 4. Update contact
```
PUT /contact/:id
{
  name: "Srebalaji",
  details: [
    {
      "type": "email",
      "email": "srebalaji@example.com",
      "tag": "personal"
    }
  ]
}
```

#### 5. Delete contact
```
DELETE /contact/:id
```

### Contact group

#### 1. List all groups
```
GET /group
```

#### 2. Create contact group
```
POST /group
Body:
{
	"name": "Work",
	"contacts": [
		"5cb8775807f6572aaac2f97c"
	]
}

```

#### 3. Update contact group
```
PUT /group/:id
{
	"name": "Work",
	"contacts": [
		"5cb8775807f6572aaac2f97c"
	]
}
```

#### 4. Delete contact group
```
DELETE /group/:id
```
