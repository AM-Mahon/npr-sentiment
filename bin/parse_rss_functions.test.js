const { TestScheduler } = require("@jest/core");
const func = require('./parse_rss_functions')
require('dotenv').config(); // import env vars
const rss_parser = require('rss-parser');
const parser = new rss_parser();
const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
});
client.connect()

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

test('saveItem fails on improperly formatted input', () => {
    expect.assertions(1);
    const improperInput = {
        title: "test",
        summary: "This is a test item"
    }
    return func.saveItem(improperInput, client)
    .catch(err => {
        expect(err).toMatch('error');
    })
})

afterAll(done => {
    client.end();
    done()
})