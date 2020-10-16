import Express from 'express'
import { config } from 'dotenv'
import axios, { AxiosResponse } from 'axios'

config()

const app: Express.Application = Express()

const PORT: string | number = process.env.PORT || 4000

app.use(Express.json())

app.get('/', (req: Express.Request, res: Express.Response) => {
    res.status(200).json({ test: true })
})


app.listen(PORT, (): void => {
    console.log(`listening *:${PORT}`)
})