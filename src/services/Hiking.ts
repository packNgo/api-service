import axios, { AxiosResponse } from 'axios'
import { ParsedQs, stringify as StringifyQs } from 'qs'
import { DistanceRange, ResultsRange, Sort, StarsRange } from '../types/HikingTypes'
import { config } from 'dotenv'
import { response } from 'express'

config()

const API_KEY: string | undefined = process.env.HIKING_KEY

interface GetTrailsByCordinatesProps {
    /** 
        * (required) `lat` - Latitude for a given area
    */
    lat: number
    /** 
        * (required) `lon` - Longitude for a given area
     */
    lon: number
    /**
        * (optional) `maxDistance` - Max distance, in miles, from lat, lon. Default: 30. Max: 200.
    */
    maxDistance?: DistanceRange
    /**
     * (optional) `maxResults` - Max number of trails to return. Default: 10. Max: 500.
    */
    maxResults?: ResultsRange
    /**
        * (optional) `sort` - Values can be 'quality', 'distance'. Default: quality.
    */
    sort?: Sort
    /**
        * (optional) `sort` - Min trail length, in miles. Default: 0 (no minimum).
    */
    minLength?: number
    /*
        * (optional) `minStars` - Min star rating, 0-4. Default: 0.
    */
    minStars?: StarsRange
}

const getTrailByIds = async (ids: string[] | number[]) => {
    try {
        if (!ids) throw Error('Trail id not provided.')

        const uri = `https://www.hikingproject.com/data/get-trails-by-id?ids=${ids.join(',')}&key=${API_KEY}`

        return await axios.get(uri)
            .then((response: AxiosResponse) => {
                return { success: true, data: response.data }
            })
            .catch(err => {
                throw err
            })
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const getTrailsByCordinates = async (queryString: ParsedQs) => {
    try {
        validateQueryString(queryString)

        const uri = `https://www.hikingproject.com/data/get-trails?${StringifyQs(queryString)}&key=${API_KEY}`

        return await axios.get(uri)
            .then((response: AxiosResponse) => {
                return { success: true, data: response.data }
            })
            .catch(err => {
                throw err
            })
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const getTrailConditions = async (ids: string[] | number[]) => {
    try {
        if (!ids) throw Error('Trail id not provided.')

        const uri = `https://www.hikingproject.com/data/get-conditions?ids=${ids.join(',')}&key=${API_KEY}`

        return await axios.get(uri)
            .then((response: AxiosResponse) => {
                return { success: true, data: response.data }
            })
            .catch(err => {
                throw err
            })
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const validateQueryString = (query: ParsedQs) => {
    const { lon, lat, maxDistance, maxResults, sort, minLength, minStars } = query
    // TODO: finish this later.
    if (!lon || !lat) throw Error('Longitute and Latitude are required params.')

    if (maxDistance && !isNaN(Number(maxDistance)) && Number(maxDistance) < 30 || Number(maxDistance) > 200) throw Error('Max distance must be between 30-200')

    if (maxResults && Number(maxResults) < 10 || Number(maxResults) > 500) throw Error('Max results must be between 10-500')

    if (sort && sort !== 'quality' && sort !== 'distance') throw Error(`Unsupported sort value.`)

    if (minStars && Number(minStars) < 0 || Number(minStars) > 4) throw Error('Min start must be between 0-4.')
}

export {
    getTrailsByCordinates,
    getTrailByIds,
    getTrailConditions
}