const {crawlPage} = require('./crawl.js')

function main() {
    const baseURL = process.argv[2]
    // check if command line arguments were passed in correctly
    if (process.argv.length < 3) {
        console.log("No website provided")
        process.exit(1)
    }
    
    if (process.argv.length > 3) {
        console.log("Too many websites provided")
        process.exit(1)
    }
    
        console.log(`Starting to crawl of ${baseURL}`)
        crawlPage(baseURL)
    

}

main()