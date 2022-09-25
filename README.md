# create-fullstack-node-app
Provide single node.js server with popular ssr and web framework

With NPM:

```bash
npx create-fullstack-node-app@latest
```

Frameworks:
|  render   | server  |
|  ----  | ----  |
| Next.js  | Nest.js |
| ...  | Midway.js(koa-v3) |

Generated Project Structure (Next.js / Nest.js)
```
├── Dockerfile
├── package.json
├── render
│   ├── README.md
│   ├── index.js
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── package.json
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── api
│   │   │   └── hello.ts
│   │   └── index.tsx
│   ├── public
│   │   ├── favicon.ico
│   │   └── vercel.svg
│   ├── styles
│   │   ├── Home.module.css
│   │   └── globals.css
│   └── tsconfig.json
├── server
│   ├── README.md
│   ├── nest-cli.json
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── bridge.ts
│   │   └── main.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── tsconfig.build.json
│   └── tsconfig.json
└── yarn.lock
```

Examples:
[Next-Nest](https://github.com/keyboard3/next-nest)
[Next-Midway(koa-v3)](https://github.com/keyboard3/egg-midway-next)