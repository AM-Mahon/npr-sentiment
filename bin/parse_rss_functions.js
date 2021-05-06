module.exports = {
    readFeed: async function(url, parser){
        try{
            feed = await parser.parseURL(url);
            let items = [];
        
            for(let item of feed.items){
                try{
                items.push({
                        title: item.title,
                        link: item.link,
                        published: item.isoDate,
                        summary: item.content
                    }) 
                }
                catch(err){
                    throw "Error formatting items"
                }
            }
        
            return items;
        }
        catch(err){
            throw 'error';
        }
    },
    
    saveItem: async function(item, client){
        client.query("INSERT INTO articles(title, link, summary, publish)\
        VALUES($1,$2,$3,$4)\
        ON CONFLICT (link) DO NOTHING;", 
        [item.title, item.link, item.summary, new Date(item.published)])
        .then(() => {
            console.log(item.title);
            return 1;
        })
        .catch(err =>{
            console.log(`Error when inserting article:\n${err}`);
        })
    }
}