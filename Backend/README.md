# Curate FAQ App - Back-End

**USER STORY:**

As an Administrator User I’d like the ability to manage questions and answers and have them displayed to end users on a FAQ page so that I can answer commonly asked questions.

**ACCEPTANCE CRITERIA:**

1. Admins should be able to create, update and delete questions and answers.
2. End Users should be able to view these questions and answers.

[**DB Designer Layout of Database**](https://dbdesigner.page.link/Lq2cDwWDsXnRH5Rg7)

---

## **API Documentation**

**BASE URL** https://curate-faq.herokuapp.com/

- Attach endpoints to the Base URL to hit them with HTTP Requests.
- You may also hit the Base URL as a "sanity check" to verify the API is up and running.

### **Table of Contents**

#### NON-AUTH ENDPOINTS

| Links                                   | Endpoints            |
| --------------------------------------- | -------------------- |
| [POST Registration](#post-registration) | `/api/auth/register` |
| [POST Login](#post-login)               | `/api/auth/login`    |
| [GET All FAQs](#get-all-faqs)           | `/faqs`              |
| [GET FAQ by ID](#get-faq-by-id)         | `/faqs/:id`          |

#### AUTH ENDPOINTS

> **All EndPoints listed below require a `token`! Send an `authorizatoin header` with the token provided upon register/login.**

| Links                         | Endpoints   |
| ----------------------------- | ----------- |
| [POST New FAQ](#post-new-faq) | `/faqs`     |
| [PUT FAQ](#put-faq)           | `/faqs/:id` |
| [DELETE FAQ](#delete-faq)     | `/faqs/:id` |

---

### [POST] Registration

#### URL: https://curate-faq.herokuapp.com/api/auth/register

**Payload:** _an object with the following credentials:_

> **Required:** `email` & `password`

```json
{
  "email": "johndoe@gmail.com",
  "password": "newPassword"
}
```

**Return:** _an object with the newly added admin, along with an auth token_

```json
{
  "admin": {
    "id": 1,
    "email": "johndoe@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6Im5ld1VzZXI0IiwiaWF0IjoxNTY3MTAwNTAzLCJleHAiOjE1NjcxODY5MDN9.BrCNULMh7pLMFGzY6HyX5CK_tA7ek8bUQSFiWkrPBQQ"
}
```

[Back to Top](#table-of-contents)

---

### [POST] Login

#### URL: https://curate-faq.herokuapp.com/api/auth/login

**Payload:** _an object with the following:_

```json
{
  "email": "johndoe@gmail.com",
  "password": "newPassword"
}
```

**Return:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6Im5ld1VzZXI0IiwiaWF0IjoxNTY3MTAwNTAzLCJleHAiOjE1NjcxODY5MDN9.BrCNULMh7pLMFGzY6HyX5CK_tA7ek8bUQSFiWkrPBQQ",
  "id": 5,
  "email": "johndoe@gmail.com"
}
```

[Back to Top](#table-of-contents)

---

### [GET] All FAQs

#### URL: https://curate-faq.herokuapp.com/faqs

**Return:** _an array of all existing FAQ objects_

```json
[
{
    "id": 2,
    "question": "This is a test question?",
    "answer": "Here is a test answer to that test question you had. Very good question, indeed.",
    "created_by": 1,
    "created_at": "2020-10-08T21:50:12.381Z",
    "updated_at": "2020-10-08T21:50:12.381Z",
    "last_edited_by": 1
  },
  {
    "id": 3,
    "question": "This is a test question?",
    "answer": "Here is a test answer to that test question you had. Very good question, indeed.",
    "created_by": 1,
    "created_at": "2020-10-08T21:50:15.082Z",
    "updated_at": "2020-10-08T21:50:15.082Z",
    "last_edited_by": 1
  },
];
```

[Back to Top](#table-of-contents)

---

### [GET] FAQ by ID

#### URL: https://curate-faq.herokuapp.com/faqs/:id

> Use the FAQ ID as a query param

**Return:** _the FAQ object_

```json
{
  "id": 1,
  "question": "This is a test question?",
  "answer": "Here is a test answer to that test question you had. Very good question, indeed.",
  "created_by": 1,
  "created_at": "2020-10-08T16:38:43.257Z",
  "updated_at": "2020-10-08T16:38:43.257Z",
  "last_edited_by": 1
}
```

[Back to Top](#table-of-contents)

---

### [POST] New FAQ

#### URL: https://curate-faq.herokuapp.com/faqs

**Payload:** _an object with the following_

```json
{
  "question": "This is a test question?",
  "answer": "Here is a test answer to that test question you had. Very good question, indeed."
}
```

**Return:**

```json
{
  "id": 7,
  "question": "This is a test question?",
  "answer": "Here is a test answer to that test question you had. Very good question, indeed.",
  "created_by": 1,
  "created_at": "2020-10-08T21:50:20.268Z",
  "updated_at": "2020-10-08T21:50:20.268Z",
  "last_edited_by": 1
}
```

[Back to Top](#table-of-contents)

### [PUT] FAQ

#### URL: https://curate-faq.herokuapp.com/faqs/:id

> Use the FAQ ID as a query param

**Payload:** _an object with the updated FAQ fields_

```json
{
  "question": "This is an UPDATED question",
  "answer": "This is an UPDATED answer"
}
```

**Return:**

```json
{
  "id": 1,
  "question": "This is an UPDATED question",
  "answer": "This is an UPDATED answer",
  "created_by": 1,
  "created_at": "2020-10-08T16:38:43.257Z",
  "updated_at": "2020-10-08T18:12:21.257Z",
  "last_edited_by": 1
}
```

[Back to Top](#table-of-contents)

### [DELETE] FAQ

#### URL: https://curate-faq.herokuapp.com/faqs/:id

> Use the FAQ ID as a query param

There is no body or return for this endpoint. If the FAQ was successfully deleted, a status 204 will be sent back.

[Back to Top](#table-of-contents)
