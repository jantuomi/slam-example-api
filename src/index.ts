import { App } from "@tinyhttp/app"
import { logger } from "@tinyhttp/logger"
import pg from "pg"
import { ExampleApi } from "slam-types"

const client = new pg.Client({
  user: process.env.PGUSER ?? "postgres",
  host: process.env.PGHOST ?? "localhost",
  database: process.env.PGDATABASE ?? "postgres",
  password: process.env.PGPASSWORD ?? "postgres",
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
})

client.connect()

const app = new App()

const PORT = Number(process.env.PORT) || 3000
console.log(`Serving API on port ${PORT}`)

app
  .use(logger({
    timestamp: { format: "YYYY-MM-DDTHH:mm:ssZ" },
  }))
  .get(ExampleApi.ListRequest.path, async (_req, res) => {
    const response: ExampleApi.ListResponse.Body = {
      examples: [{ id: "123", title: "foobar", content: "10 20 + ." }],
    }
    res.send(response)
  })
  .listen(PORT)
