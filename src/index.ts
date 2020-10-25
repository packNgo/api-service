import Express from 'express'
import { config } from 'dotenv'
import * as HikingCenterApi from './services/Hiking'
import cors, { CorsOptions } from 'cors'
import http from 'http'

config()

const app: Express.Application = Express()

const httpServer: http.Server = http.createServer(app)

const origins: string[] = [
    'http://10.0.0.47:3000',
    'http://localhost:3000',
    'http://10.0.0.47:4000',
    'http://localhost:4000'

]

const corsOptions: CorsOptions = {
    origin: (origin, next) => {
        if (origin && origins.includes(origin)) {
            console.log('allowing', origin)
            next(null, true)
        }
        console.log('blocking', origin)
        next(null,false)
    },
    allowedHeaders: '*',
    preflightContinue: false
}

const PORT: string | number = process.env.PORT || 4000

// app.options('*', cors(corsOptions))
app.use(cors())
// app.use(cors())

app.use(Express.json())

app.get('/hiking/trails', async (req: Express.Request, res: Express.Response): Promise<void> => {
    const response = await HikingCenterApi.getTrails(req.query)

    res.status(response.code).json(response)
})

app.get('/hiking/trailsById',async(req:Express.Request, res:Express.Response):Promise<void>=>{
    const response = await HikingCenterApi.getTrailsByID(req.query)
    res.status(response.code).json(response)
})

app.get('/hiking/trailsConditions',async (req:Express.Request,res:Express.Response):Promise<void>=>{
    const response = await HikingCenterApi.getConditionsByID(req.query)
    res.status(response.code).json(response)
})

// https://www.hikingproject.com/data

httpServer.listen(PORT, (): void => {
    console.log(`listening *:${PORT}`)
})