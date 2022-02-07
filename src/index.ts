import { App } from "@tinyhttp/app"
import { logger } from "@tinyhttp/logger"
import { cors } from "@tinyhttp/cors"
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
  .then(() => {
    console.log("DB connection succeeded")
  })
  .catch((err) => {
    console.error("DB connection failed", err)
  })

const app = new App()

const PORT = Number(process.env.PORT) || 3000
console.log(`Serving API on port ${PORT}`)

app
  .use(logger({
    timestamp: { format: "YYYY-MM-DDTHH:mm:ssZ" },
  }))
  .use(cors())
  .get(ExampleApi.ListRequest.path, async (_req, res) => {
    try {
      const examples: ExampleApi.Example[] = await client.query("SELECT * FROM examples").then(r => r.rows)
      const response: ExampleApi.ListResponse.Body = {
        examples,
      }
      res.send(response)
    } catch (err) {
      console.error(err)
      res.sendStatus(500)
    }
  })
  .listen(PORT)
