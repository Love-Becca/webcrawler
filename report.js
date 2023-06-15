function printReport(pages) {
    console.log("===========");
    console.log("Report");
    console.log("===========");

    const sortedPage = sortPages(pages)
    let outData = []
    for (const sorted of sortedPage) {
        const url = sorted[0]
        const hits = sorted[1]
        outData.push({hits, url})
    }
    console.log("===========");
    console.log("End Report");
    console.log("===========");
    return outData;
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
        aHit = a[1]
        bHit = b[1]
        return b[1] - a[1]
    })
    return pagesArr
}

module.exports = {
    sortPages,
    printReport
}