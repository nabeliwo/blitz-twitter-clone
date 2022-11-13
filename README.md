# blitz-twitter-clone

## Getting Started

### Install dependency

```bash
$ npm i -g blitz
$ npm install
```

### Running docker

```bash
$ docker compose up -d
```

### Prepare database

```bash
$ blitz prisma migrate dev
```

### Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run build && npm run start

# database GUI
$ npm run studio
```

## 技術要素

- Blitz
  - Next.js
  - Prisma
- linaria
