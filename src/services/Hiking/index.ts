import { ParsedQs } from 'qs'
import { HikingResponse } from '../../helper/HikingResponse'
import * as HikingProjectApi from './HikingProjectApi'

async function getTrails(queryString: ParsedQs): Promise<HikingResponse> {
    const hikingProject = await HikingProjectApi.getTrails(queryString)

    return HikingResponse(true, hikingProject)
}

async function getTrailsByID(queryString: ParsedQs): Promise<HikingResponse> {
    const hikingProject =await HikingProjectApi.getTrailsByID(queryString)

    return HikingResponse(true, hikingProject )
}

async function getConditionsByID(queryString: ParsedQs): Promise<HikingResponse> {
    const hikingProject = await HikingProjectApi.getConditionsByID(queryString)

    return HikingResponse(true,  hikingProject )
}

export {
    getConditionsByID,
    getTrails,
    getTrailsByID
}