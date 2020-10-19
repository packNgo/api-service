import { ParsedQs } from 'qs'
import { HikingResponse } from '../../helper/HikingResponse'
import * as HikingProjectApi from './HikingProjectApi'

async function getTrails(queryString: ParsedQs): Promise<HikingResponse> {
    const hikingProject = await HikingProjectApi.getTrails(queryString)

    return HikingResponse(true, hikingProject)
}

function getTrailsByID(queryString: ParsedQs): HikingResponse {
    const hikingProject = HikingProjectApi.getTrailsByID(queryString)

    return HikingResponse(true, { hikingProject })
}

function getConditionsByID(queryString: ParsedQs): HikingResponse {
    const hikingProject = HikingProjectApi.getConditionsByID(queryString)

    return HikingResponse(true, { hikingProject })
}

export {
    getConditionsByID,
    getTrails,
    getTrailsByID
}