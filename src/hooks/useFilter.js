
//hooks for filtering array object
// it returns the length of the filtered data and the new data
// and also the function to re-filter the array object
// it takes two parameter- the filter condition and the array object

export const useFilter = (array, condition)=> {
    const filteredData = array.filter((feedback)=> {
        return feedback.status===condition
    })
    
    return filteredData
}

