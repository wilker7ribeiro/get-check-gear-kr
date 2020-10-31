const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const nameToImage = require('./img-src-name.json')
const imageToName = Object.assign({}, ...Object.entries(nameToImage).map(([a,b]) => ({ [b]: a })))

const GEAR_ID = process.argv[3];

(async function () {
  try {
    const response = await got("http://getamped.windyzone.com/sub_main/menu/item/view/item_accessory_view.ws?q="+GEAR_ID);
    const dom = new JSDOM(response.body);
    const objResult = {};
    Object.keys(imageToName).map(src => objResult[imageToName[src]] = false)
    Array.from(dom.window.document.querySelectorAll('ul.wear_cha > li > p > img'))
      .forEach(img=> objResult[imageToName[img.src]] = true)
    console.log(objResult);
    Object.keys(objResult).forEach(key => console.log(key, '=' , objResult[key]));
  } catch (err) {
    throw err;
  }
})()