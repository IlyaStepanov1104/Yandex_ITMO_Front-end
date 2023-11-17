# Домашнее задание №5
## [ITMO 2023] Web crawler

*Что требуется сделать:*

Необходимо реализовать функцию `crawl`, которая начиная с указанного URL, будет рекурсивно загружать веб-страницы, следуя по ссылкам, до заданной глубины и с ограничением по количеству одновременных потоков (запросов).

*Особенности:*
- Учитывать ограничение на одновременные запросы к страницам.
- Сохранять полученную html разметку.
- Не превышать заданную глубину обхода.

*Функция принимает на вход:*
- Адрес первой страницы (строка)
- Глубину загрузки (целое число)
- Количество одновременных потоков (целое число)

*Выходные данные:*

Функция `crawl` должна возвращать массив объектов, где каждый объект представляет собой:
~~~
{
    url: "https://example.com/page",  // URL страницы
    depth: 2,  // Глубина, на которой была найдена страница
    content: "<html>...</html>",  // содержимое страницы
    links: ["https://example.com/another-page", ...]  // массив ссылок, найденных на странице
}
~~~

*Инструкция по запуску в Node.js:*

1. Установка Node.js через NVM:
   1. Для macOS и Linux:
      ~~~
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
      nvm install node 
      ~~~
   2. Для Windows:
      Установите NVM for Windows. После установки:
      ~~~
      nvm install node
      ~~~
2. Создать директорию для проекта:
   1. Для macOS и Linux:
      ~~~
      mkdir my_crawler_project && cd my_crawler_project
      ~~~
   2. Для Windows:
      ~~~
      md my_crawler_project
      cd my_crawler_project
      ~~~
3. Инициализация проекта и установка зависимостей:
   ~~~
   npm init -y
   npm install node-fetch
   ~~~
4. В корневой директории проекта создайте файл crawl.js. В этом файле экспортируйте функцию crawl:
    ~~~
    async function crawl(url, depth, concurrency) {
    // Код здесь
    }
    
   module.exports = crawl;
   ~~~
5. Создание и настройка `index.js`:
    ~~~
    // Определение глобального метода fetch
    global.fetch = require('node-fetch');
    
    const crawl = require('./crawl');
    
    // Пример запуска функции crawl:
    (async () => {
    const startingUrl = 'https://example.com';
    const depth = 5;
    const concurrency = 3;
    
        const result = await crawl(startingUrl, depth, concurrency);
        console.log(result);
    })();
    ~~~
6. Теперь вы можете запустить ваш скрипт `index.js`:
   ~~~
   node index.js
   ~~~

После запуска ваша функция `crawl` будет использовать глобально определенный метод `fetch` для выполнения запросов и вернет массив объектов с информацией о посещенных страницах.

