const { TestScheduler } = require("@jest/core");
const func = require('./parse_rss_functions')
require('dotenv').config(); // import env vars
const rss_parser = require('rss-parser');
const parser = new rss_parser();

test('Expected values returned from NPR', () => {
    return func.readFeed('https://feeds.npr.org/1001/rss.xml', parser)
    .then(feed => {
        expect("title" in feed[0]).toBe(true);
        expect("link" in feed[0]).toBe(true);
        expect("published" in feed[0]).toBe(true);
        expect("summary" in feed[0]).toBe(true);
    })
})

test('Fails on not an RSS feed', () => {
    expect.assertions(1);
    return func.readFeed('https://www.google.com/', parser)
    .catch(err => {
        expect(err).toMatch('error')
    })
});