import Express from 'express'
import { config } from 'dotenv'

config()

const app: Express.Application = Express()

const PORT: string | number = process.env.PORT || 4000

app.use(Express.json())

app.listen(PORT, (): void => {
    console.log(`listening *:${PORT}`)
})