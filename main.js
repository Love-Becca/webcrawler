const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')
const fs = require('fs');

async function main() {
    if (process.argv.length < 3) {
        console.log("No website")
        process.exit(1)
    }

    if (process.argv.length > 3) {
        console.log("Too many command line args")
        process.exit(1)
    }

    const baseUrl = process.argv[2]
    const pages = await crawlPage(baseUrl, baseUrl, {})
    console.log(`starting crawl of ${baseUrl}`);
    const report = printReport(pages);
    const csvContent = report.map(row => `${row.hits},${row.url}`).join('\n');
    fs.writeFileSync('report.csv', csvContent);
}

main()