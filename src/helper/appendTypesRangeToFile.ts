import fs from 'fs'

export function addToTypesFile(path: string, typeName: string, typeValue: string) {
    try {
        const file = fs.readFileSync(path, { encoding: 'utf-8' })
        
        if (file) {
            if(file.match(typeName)) throw Error(`Duplicated type name ${typeName}.`)
        }

        const spaces = file ? `\n\n` : ' '
        const appendData = `${spaces}export type ${typeName} = ${typeValue}`

        fs.appendFileSync(path, appendData, { encoding: 'utf-8' })

    } catch (error) {
        console.log(error.message)
    }
}