const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
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
    const pages = await crawlPage(baseURL, baseURL, {})

    // print out a report to the user 
    printReport(pages)
    

}

main()