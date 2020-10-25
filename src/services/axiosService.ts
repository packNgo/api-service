import axios from 'axios'
import { config } from 'dotenv'
import { ParsedQs, stringify as stringifyQuery } from 'qs'
import { HikingResponse } from '../helper/HikingResponse'

config()

const KEY: string = process.env.HIKING_KEY || ''

async function getHikingProjectTrails(query: ParsedQs): Promise<HikingResponse> {
    try {
        const queryString = stringifyQuery(query)
        const response = await axios.get(`https://www.hikingproject.com/data/get-trails?${queryString}&key=${KEY}`)

        return HikingResponse(true, { HikingProject: response.data, google: { code: 200, data: { test: 'test data' } } })
    } catch (error) {
        return HikingResponse(false, { message: error.message })
    }
}

async function getHikingProjectTrailsByIds(query:ParsedQs):Promise<HikingResponse>{
    try {
        const queryString = stringifyQuery(query)
        const response = await axios.get(`https://www.hikingproject.com/data/get-trails-by-id?${queryString}&key=${KEY}`)
        return HikingResponse(true, {HikingProject :response.data})
    } catch (error) {
        return HikingResponse(false,{message:error.message})
        
    }
}

async function getHikingProjectTrailsConditionsByID(query:ParsedQs):Promise<HikingResponse>{
    try {
        const queryString = stringifyQuery(query)
        const response = await axios.get(`https://www.hikingproject.com/data/get-conditions?${queryString}&key=${KEY}`)
        return HikingResponse(true,{HikingProject:response.data})
    } catch (error) {
        return HikingResponse(false,{message:error.message})
        
    }
}



export {
    getHikingProjectTrails,
    getHikingProjectTrailsByIds,
    getHikingProjectTrailsConditionsByID
}

