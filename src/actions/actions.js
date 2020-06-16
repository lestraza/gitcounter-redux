import { getRepository, sortData, filterData } from '../services'


export const getRepositoryAction = (url) => {
    return dispatch => {
        return getRepository(url).then(res => {
            dispatch({
                type: 'LOAD_REPO',
                payload: res
            })
        })
    }
}

export const sortDataAction = (prop, sortField, renderFiles) => {
    const sortedFiles = sortData(prop, renderFiles)
    return dispatch => {
        if (sortField !== prop) {
            return dispatch({
                type: 'SORT_DATA',
                payload: {
                    sortField: prop,
                    renderFiles: sortedFiles
                }
            })
        } else {
            const reversedFiles = sortedFiles.reverse()
            return dispatch({
                type: 'SORT_DATA',
                payload: {
                    sortField: '',
                    renderFiles: reversedFiles
                }
            })
        }
    }
}


export const filterDataAction = (value, files) => {
    return dispatch => {
        if (value) {
            const filteredData = filterData(value, files)
            dispatch({
                type: 'FILTER_DATA',
                payload: {
                    renderFiles: filteredData
                }
            })
        } else {
            dispatch({
                type: 'FILTER_DATA',
                payload: {
                    renderFiles: files
                }
            })
        }
    }
}