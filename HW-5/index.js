// Определение глобального метода fetch
global.fetch = require('node-fetch');

const crawl = require('./crawl');

// Пример запуска функции crawl:
(async () => {
    const startingUrl = 'https://example.com';
    const depth = 1;
    const concurrency = 3;

    const result = await crawl(startingUrl, depth, concurrency);
    console.log(result);
})();