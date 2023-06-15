const {JSDOM} = require('jsdom')

async function crawlPage(baseUrl, currentURL, pages){
    const baseObj = new URL(baseUrl);
    const currentObj = new URL(currentURL);

    if (baseObj.hostname !== currentObj.hostname) {
        return pages
    }

    const normalizeCurrentUrl = normalizeUrl(currentURL);
    if (pages[normalizeCurrentUrl] > 0) {
        pages[normalizeCurrentUrl]++
        return pages;
    }

    pages[normalizeCurrentUrl] = 1
    console.log(`crawling url ${currentURL}`);

    try {
        const res = await fetch(currentURL )
        if (res.status > 399) {
            console.log(`error in fetch with ${res.status} in ${currentURL}`);
            return pages
        }
        const content = res.headers.get('content-type');
        if (!content.includes('text/html')) {
            console.log("invalid content");
            return pages
        }
        const htmlBody = await res.text();
        const nextUrl = getUrlFromHTML(htmlBody, baseUrl)

        for (const next of nextUrl) {
            pages = await crawlPage(baseUrl, next, pages)
            
        }
    } catch (error) {
        console.log(`error in fetch ${error.message} on page ${currentURL}`);
    }

    return pages
}
function getUrlFromHTML(htmlBody, baseUrl) {
    const url = []
    const dom = new JSDOM(htmlBody)
    const linkEl = dom.window.document.querySelectorAll('a')
    for (const link of linkEl) {
        if (link.href.slice(0, 1) === '/') {
            url.push(`${baseUrl}${link.href}`)
        }else{
            try {
                
                const urlOb = new URL(link.href)
                url.push(urlOb.href)
            } catch (error) {
                console.log(`invalid url:${error.message}`);
            }

        }
    }
    return url
}

// The purpose of this function is to normalize a URL by removing trailing slashes ("/") from the hostname and pathname.
function normalizeUrl(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }else{
        return hostPath
    }
}

module.exports = {
    normalizeUrl,
    getUrlFromHTML,
    crawlPage
}