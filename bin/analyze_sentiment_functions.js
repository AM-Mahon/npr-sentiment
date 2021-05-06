async function run_analysis(summary, analyticsClient){
    const sentimentResult = await analyticsClient.analyzeSentiment([summary]);
    console.log(`${sentimentResult[0].sentiment}, ${sentimentResult[0].confidenceScores},`);
    switch(sentimentResult[0].sentiment) {
        case 'negative':
            return -1;
        case 'neutral':
            return 0;
        case 'positive':
            return 1;
        default:
            return 2;
    }
}

module.exports = run_analysis;