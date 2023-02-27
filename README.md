# OpenAI Response Optimisation

> This project is a feedback generation from human interaction to OpenAI response. Data generated from this application can be used for reinforcement learning for OpenAI.


<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Development server

### Prerequisite

- Docker - v20
- Node.js - >=v16
- npm - >=v8
- replicate `.env.sample` and rename to `.env`, put all required value in it

### Docker setup

- Docker is used for local development database setup
- run following command in root folder
- `docker compose --env-file .env -f ./docker/docker-compose.yml up`

### Installation

- `npm install`
- `npm run prisma -- db push` - to push prisma schema to database
- `npm run dev:api` - to run backend api server
- `npm run dev:app` - to run frontend nextjs server
- `npx prisma studio` - to run prisma GUI linked with database

---

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
