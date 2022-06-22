import fetch from "node-fetch";
import cheerio from 'cheerio';

const getNavByFundName = async (name) => {
    const response = await fetch('https://codequiz.azurewebsites.net/', {
        headers: {
            Cookie: 'hasCookie=true'
        }
    })
    const htmlbody = await response.text();
    const $ = cheerio.load(htmlbody);

    const html = $('table').children();
    const tr = $("tr", html);
    let obj = {};
    for (let i = 1; i < tr.length; i++) {
        let td = $("td", tr[i]);
        obj[$(td[0]).html().trim()] = $(td[1]).html();
    }
    console.log(obj[name]);
}

const name = process.argv.slice(2)[0]
getNavByFundName(name)