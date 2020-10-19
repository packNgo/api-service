import Express from 'express'
import { config } from 'dotenv'
import * as HikingCenterApi from './services/Hiking'

config()

const app: Express.Application = Express()

const PORT: string | number = process.env.PORT || 4000

app.use(Express.json())

app.get('/hiking/trails', async (req: Express.Request, res: Express.Response): Promise<void> => {
    const response = await HikingCenterApi.getTrails(req.query)

    res.status(response.code).json(response)
})


app.listen(PORT, (): void => {
    console.log(`listening *:${PORT}`)
})