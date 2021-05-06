const { TestScheduler } = require("@jest/core");
const run_analysis = require('./analyze_sentiment_functions')
require('dotenv').config(); // import env vars
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
const analyticsClient = new TextAnalyticsClient(process.env.SENTIMENT_ENDPOINT,  new AzureKeyCredential(process.env.SENTIMENT_KEY)); 

test('Sentence with positive sentiment', () => {
    return run_analysis("I love programming, it is a wonderfully fun activity.", analyticsClient)
    .then(data => {
       expect(data).toBe(1); 
    })
})

test('Sentence with neutral sentiment', () => {
    return run_analysis("The computer case was white, and had many LEDs.", analyticsClient)
    .then(data => {
       expect(data).toBe(0); 
    })
})

test('Sentence with negative sentiment', () => {
    return run_analysis("This is a horrible day, with othercast skies and loud wind.", analyticsClient)
    .then(data => {
       expect(data).toBe(-1); 
    })
})