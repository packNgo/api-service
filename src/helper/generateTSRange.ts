
export function generateTSRange(min: number, max: number, step: number = 1) {
    let arr = []

    for( let n = min; n <= max; n += step ) {
        arr.push(n)
    }

    return arr.join(' | ')
}