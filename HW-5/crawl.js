const regex = RegExp(/href="(http[^"]+)"/g);

async function crawl(url, depth, concurrency) {
    const result = [];
    let currentObjects = [];
    let currentLinks = [url];
    let currentDepth = 0;
    while (currentDepth < depth) {
        for (let i = 0; i < currentLinks.length; i += concurrency) {
            const links = currentLinks.slice(i, i + concurrency)
            const objects = await Promise.all(
                links.map(async link => {
                    const html = await (await fetch(link)).text();
                    let links = [];
                    let match;
                    while ((match = regex.exec(html)) !== null) {
                        links.push(match[1]);
                    }
                    return {
                        url: link,
                        depth: currentDepth,
                        // content: html,
                        links: links
                    }
                })
            )
            currentObjects.push(...objects)
        }
        currentLinks = []
        currentObjects.forEach(object => currentLinks.push(...object.links))
        result.push(...currentObjects)
        currentObjects = []
        currentDepth +=1
    }
    return result
}

module.exports = crawl;
