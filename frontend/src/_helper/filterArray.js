export const filterArray = (dataProp, filterValues) => {
    let arrayCopy = JSON.stringify(dataProp)
    arrayCopy = JSON.parse(arrayCopy)
    let filteredArray = []
    let sampleFilter = filterValues

    for (let j = 0; j < arrayCopy.length; j++) {
        let allkeys = Object.keys(arrayCopy[j])
        let obj1 = {}
        for (const key of sampleFilter) {
            obj1[key] = ''
        }
        for (let i = 0; i < allkeys.length; i++) {
            if (sampleFilter.includes(allkeys[i])) {
                let tempvar1 = allkeys[i]
                obj1[tempvar1] = arrayCopy[j][tempvar1]
            }
        }
        filteredArray.push(obj1)
    }
    return filteredArray
}