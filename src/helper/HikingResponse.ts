export interface HikingResponse {
    code: number
    success: boolean
    data?: any
    error?: { message: string, code: number }
}

export const HikingResponse = (success: boolean, data: any): HikingResponse => {
    // console.log(data)
    if (!success) return { success, code: 400, error: data }
    return { success, code: 200, data }
}