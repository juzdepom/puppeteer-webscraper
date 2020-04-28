const puppeteer = require('puppeteer')

//async gives us the capability to use the await keyword
async function scrapeProduct(url){
    //start up the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    //----GET IMAGE URL
    //.$x is a puppeteer selector that allows to select by XPATH
    const [imgElement] = await page.$x('//*[@id="imgBlkFront"]') 
    //[] pulls out the first item of the array aka destructuring

    //pull the source attribute out of the element
    const imgJson = await imgElement.getProperty('src')

    //pull out the string
    const imgURL = await imgJson.jsonValue();

    //----GET THE PRODUCT TITLE
    const [titleElement] = await page.$x('//*[@id="productTitle"]')
    //get out the text 
    const titleJson = await titleElement.getProperty('textContent')
    const title = await titleJson.jsonValue();
    

    //----GET THE AUTHOR NAME
    const [authorElement] = await page.$x('//*[@id="bylineInfo"]/span[1]/span[1]/a[1]')
    const authorJson = await authorElement.getProperty('textContent')
    const author = await authorJson.jsonValue();

    //----GET THE KINDLE RATING
    const [ratingElement] = await page.$x('//*[@id="acrCustomerReviewText"]')
    const ratingJson = await ratingElement.getProperty('textContent')
    const rating = await ratingJson.jsonValue();

    console.log({imgURL, title, author, rating})

    browser.close();
}

scrapeProduct("https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X/ref=sr_1_2?dchild=1&keywords=black+swan&qid=1588038259&sr=8-2")