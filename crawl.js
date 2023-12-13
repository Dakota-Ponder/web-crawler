const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    
    
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    
    // make sure currentURL is on the same domain as baseURL
    // if not, return pages
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }
    
    // get a normalized version of the currentURL
    const normalizedCurrentURL = normalizeURL(currentURL)
    
    // if the pages object already has an entry for the normalizedCurrentURL
    // just increment the count and return the current pages object
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }
    
    // if pages obj doesn't exist then make one 
    pages[normalizedCurrentURL] = 1
    
    console.log(`Actively crawling: ${currentURL}`)


    try {
        const response = await fetch(currentURL)

        if (response.status > 399) {
            console.log(`Error in fetch with status code: ${response.status} on page: ${currentURL}`)
            return pages
        }   

        // get the content type of the response 
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) { 
            console.log(`Non-HTML response, content type:  ${contentType} on page: ${currentURL}`)
            return pages
        }

        // save html in a variable 
        const htmlBody = await response.text()

        // extract the links from the html 
        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs) {
            // recursively crawl the pages 
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch (error) {
        console.log(`error fetching ${currentURL}: ${error.message}`)
    }

    return pages


    // console.log(`Actively crawling ${currentURL}`)
}

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
    getURLsFromHTML,
    crawlPage
}
