import Express from 'express'
import { config } from 'dotenv'
import * as HikingAPI from './services/Hiking'

config()

const app: Express.Application = Express()

const PORT: string | number = process.env.PORT || 4000

app.use(Express.json())

app.get('/trails', async (req: Express.Request, res: Express.Response) => {
    const hiking = await HikingAPI.getTrailsByCordinates(req.query)

    res.status(200).json([{hiking}])
})

app.get('/trails/:ids', async (req: Express.Request, res: Express.Response) => {
    const hiking = await HikingAPI.getTrailByIds(req.params.ids.split(','))

    res.status(200).json({ hiking})
})

app.listen(PORT, (): void => {
    console.log(`listening *:${PORT}`)
})