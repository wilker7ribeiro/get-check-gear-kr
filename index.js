const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const nameToImage = require('./img-src-name.json')
const imageToName = Object.assign({}, ...Object.entries(nameToImage).map(([a,b]) => ({ [b]: a })))

const GEAR_ID = process.argv[2];

(async function () {
  try {
    console.log('Realizando requisição...')
    const response = await got("http://getamped.windyzone.com/sub_main/menu/item/view/item_accessory_view.ws?q="+GEAR_ID);
    console.log('Parseando dom...')
    const dom = new JSDOM(response.body);
    const objResult = {};
    console.log('Verificando estilos...')
    Object.keys(imageToName).map(src => objResult[imageToName[src]] = false)
    Array.from(dom.window.document.querySelectorAll('ul.wear_cha > li > p > img'))
      .forEach(img=> objResult[imageToName[img.src]] = true)
    console.log('Finalizado')
    console.log(objResult);
  } catch (err) {
    throw err;
  }
})()