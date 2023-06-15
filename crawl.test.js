const {normalizeUrl, getUrlFromHTML} = require('./crawl')
const {test, expect} = require('@jest/globals')

test('normalizeUrl', ()=>{
    const input = 'https://www.youtube.com/watch'
    const actual = normalizeUrl(input)
    const expected = 'www.youtube.com/watch'
    expect(actual).toEqual(expected)
})

test('normalizeUrl stripe slash', ()=>{
    const input = 'https://www.youtube.com/watch/'
    const actual = normalizeUrl(input)
    const expected = 'www.youtube.com/watch'
    expect(actual).toEqual(expected)
})

test('normalizeUrl capital', ()=>{
    const input = 'https://www.YOUtube.com/watch'
    const actual = normalizeUrl(input)
    const expected = 'www.youtube.com/watch'
    expect(actual).toEqual(expected)
})

test('normalizeUrl http', ()=>{
    const input = 'http://www.youtube.com/watch'
    const actual = normalizeUrl(input)
    const expected = 'www.youtube.com/watch'
    expect(actual).toEqual(expected)
})

test('getUrlFromHtml absolute', ()=>{
    const input = `<html>
                        <body>
                            <a href='https://www.youtube.com/watch/path/'>Youtube</a>
                        </body>
                    </html>`
    const inputBase = 'https://www.youtube.com/watch/path/'
    const actual = getUrlFromHTML(input, inputBase)
    const expected = ['https://www.youtube.com/watch/path/']
    expect(actual).toEqual(expected)
})

test('getUrlFromHtml relative', ()=>{
    const input = `<html>
                        <body>
                            <a href='/path/'>Youtube</a>
                        </body>
                    </html>`
    const inputBase = 'https://www.youtube.com'
    const actual = getUrlFromHTML(input, inputBase)
    const expected = ['https://www.youtube.com/path/']
    expect(actual).toEqual(expected)
})

test('getUrlFromHtml both', ()=>{
    const input = `<html>
                        <body>
                            <a href='/path2/'>Youtube</a>
                            <a href='https://www.youtube.com/path1/'>Youtube</a>
                        </body>
                    </html>`
    const inputBase = 'https://www.youtube.com'
    const actual = getUrlFromHTML(input, inputBase)
    const expected = ['https://www.youtube.com/path2/','https://www.youtube.com/path1/']
    expect(actual).toEqual(expected)
})


test('getUrlFromHtml invalid', ()=>{
    const input = `<html>
                        <body>
                            <a href='invalid'>invalid</a>
                        </body>
                    </html>`
    const inputBase = 'https://www.youtube.com'
    const actual = getUrlFromHTML(input, inputBase)
    const expected = []
    expect(actual).toEqual(expected)
})