import axios from 'axios';
import * as base64 from 'base-64'

export const auth = 'client_id=97cec6e85dc5b333793e&client_secret=67eb654765fc6a7409e0d292b67f184b66ee86bb';

function getRepositoryReq(url) {
    return axios.get(url)
}

const filesToExclude = [
    'jpeg',
    'jpg',
    'png',
    'svg',
]

export const getRepository = (url) => {
    return new Promise((resolve, reject) => {
        getRepositoryReq(url).then((res) => {
            createRequest(res).then((files) => {
                const normalizeData = normalizeFiles(files)
                resolve(normalizeData.flat())
            })
        })
    })
}
let normalizeData = []

const normalizeFiles = files => {  
    Array.from(files).forEach(file => {
        if (!Array.isArray(file) && file !== undefined) {
            normalizeData = [...normalizeData, file]
        } 
        if(Array.isArray(file) && file !== undefined) {
            normalizeFiles(file)
        }
    })
    return normalizeData
}

const createRequest = res => {
    return Promise.all(res.data.map(item => {
        const { url } = item
        return new Promise((resolve, reject) => {
            getRepositoryReq(`${url}&${auth}`).then(res => {
                if (!Array.isArray(res.data)) {
                    resolve(countLines(res.data))
                } else {
                    resolve(createRequest(res))
                }
            })
        })
    }))
}

const countLines = data => {
    const splittedName = data.name.split('.')
    const extension = splittedName[splittedName.length - 1]
    if (!filesToExclude.includes(extension)) {
        const encodedRes = base64.decode(data.content)
        const lines = encodedRes.split('\n')
        const amountEmptyLines = countEmptyLines(lines)
        const amountComments = countComments(lines)
        const amountLines = lines.length
        const amountCodeLines = amountLines - amountComments - amountEmptyLines
        const newFile = {
            fileName: data.name,
            amountLines,
            amountCodeLines,
            amountEmptyLines,
            amountComments
        }
        return newFile
    }
}

const countEmptyLines = lines => {
    const emptyLines = lines.filter(line => !line)
    return emptyLines.length
}

const countComments = lines => {
    let startIndex = 0;
    let counter = lines.reduce((acc, line, index) => {
        if (line.startsWith('//')) acc++
        if (line.includes('/*')) startIndex = -index;
        if (line.includes('*/')) {
            acc += (startIndex + index + 1)
        }
        return acc
    }, 0)
    return counter
}

export const sortData = (prop, renderFiles) => {
    const sortedFiles = [...renderFiles].sort((a, b) => {
        if (a[prop] > b[prop]) {
            return 1
        }
        if (a[prop] < b[prop]) {
            return -1
        }
        return 0
    })
    return sortedFiles
}

export const filterData = (filterName, files) => {
    console.log(files);
    return files.filter(file => {
        return file.fileName.toLowerCase().includes(filterName)
    })
}

