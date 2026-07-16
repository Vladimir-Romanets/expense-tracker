FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@8.15.9 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

CMD ["pnpm", "run", "dev"]