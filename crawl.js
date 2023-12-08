const { JSDOM } = require('jsdom')

// function that grabs URLs from the HTML
function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            // relative url 
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            // absolute url 
             try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }
        
    }
    console.log(urls)
    return urls
}


// function that takes a url as input and makes it all uniform 
function normalizeURL(urlString) {
    const urlObj = new URL(urlString)

    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    // if at least 1 char and the last char is a slash
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0,-1)  // return everything except last char 
    }
    return hostPath;
}

// stub the function
module.exports = {
    normalizeURL,
    getURLsFromHTML
}