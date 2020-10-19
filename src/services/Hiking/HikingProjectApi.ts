import { ParsedQs } from 'qs'
import { HikingResponse } from '../../helper/HikingResponse'
import { getHikingProjectTrails } from '../axiosService'

const KEY = process.env.HIKING_KEY || ''

async function getTrails(queryString: ParsedQs): Promise<HikingResponse> {
    let { lon, lat, maxDistance, maxResults, sort, minLength, minStars } = queryString

    if (!lon || !lat)
        return HikingResponse(false, 'Longitude and Latitude are required.')

    if (maxDistance && !isNaN(Number(maxDistance))) {
        maxDistance = Number(maxDistance) > 200 ? '200' : Number(maxDistance) < 30 ? '30' : maxDistance
    }

    if (maxResults && !isNaN(Number(maxResults))) {
        maxResults = Number(maxResults) > 500 ? '500' : Number(maxResults) < 10 ? '10' : maxResults
    }

    if (sort && sort !== 'quality' && sort !== 'distance')
        sort = 'quality'

    if (minLength && !isNaN(Number(minLength))) {
        minLength = Number(minLength) < 0 ? '0' : minLength
    }

    if (minStars && !isNaN(Number(minStars))) {
        minStars = Number(minStars) > 4 ? '4' : Number(minStars) < 0 ? '0' : minStars
    }

    const response = await getHikingProjectTrails(queryString)

    return response
}

function getTrailsByID(ids: ParsedQs): HikingResponse {
    if (!ids && String(ids).split(',').length < 1)
        return HikingResponse(false, 'Must include one or more ID.')

    return HikingResponse(true, [])
}

function getConditionsByID(ids: ParsedQs): HikingResponse {
    if (!ids && String(ids).split(',').length < 1)
        return HikingResponse(false, 'Must include one or more ID.')

    return HikingResponse(true, [])
}

export {
    getConditionsByID,
    getTrails,
    getTrailsByID
}