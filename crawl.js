function normalizeURL(urlString) {
    const urlObj = new URL(urlString)

    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    // if at least 1 char and the last char is a slash
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0,-1)  // return everything except last char 
    }
    return hostPath;
}

function getURLsFromHTML(htmlBody, baseURL) {
    
}

// stub the function
module.exports = {
    normalizeURL
}
