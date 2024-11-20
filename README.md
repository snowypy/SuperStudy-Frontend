
# SuperStudy

The best open source flashcard solution for students!

## API Reference

#### Register via API

```http
  POST /api/v1/auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username provided to create account with |
| `password`      | `string` | **Required**. password to authenticate with   |

#### Login via API

```http
  POST /api/v1/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username provided to login with |
| `password`      | `string` | **Required**. password to authenticate with   |



## Authors

- [@snowypy](https://github.com/snowypy)
- [@invisgg](https://github.com/invisgg)


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Deployment

There is two stages to deployment as the frontend and backend are built seperatley due to infrastructure

### Deploy Frontend

```bash
  npm run deploy
```

### Deploy backend

Run the main backend src file (BackendApplication.kt) on some sort of docker machine etc. We recommend using a [Pterodactyl](https://pterodactyl.io/) or [Pelican](https://pelican.dev/) host to run this for ease of use.

