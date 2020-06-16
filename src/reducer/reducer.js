const initialState = {
    files: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_REPO':
            return {
                ...state,
                files: action.payload,
                renderFiles: action.payload
            }
        case 'SORT_DATA':
            return {
                ...state,
                renderFiles: action.payload.renderFiles,
                sortField: action.payload.sortField
            }    
        case 'FILTER_DATA':
            return {
                ...state,
                renderFiles: action.payload.renderFiles
            }    
        default:
            return state
    }
}

export default reducer