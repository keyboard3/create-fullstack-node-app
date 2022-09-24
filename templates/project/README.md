# next-nest
采用 monorepo 管理 server 的 Nest.js 代码 和 render 的 Next.js 代码。两个仓库代码独立，不耦合。

由 server 的 Nest.js 负责启动，Nest.js 启动时会有根路由中间件分发，Next.js 的聚合接口通过 global.serverFetch 接口访问 Nest.js api

在线预览 https://keyboard3.com/next-nest/

/server/src/cats/cats.controller.ts
```typescript
@Controller('/api/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

/render/pages/index.tsx
```typescript
export async function getServerSideProps(context: NextPageContext) {
  const response = await global.serverFetch('http://127.0.0.1/api/cats');
  return {
    props: { cats: response.json() }, // will be passed to the page component as props
  }
}
```