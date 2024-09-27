async function getUsingProxy(url) {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    if (response.ok) {
        return response.json();  
    }
    throw new Error('Network response was not ok.');
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function getItemPrice(item) {
    if (priceCache[item]) {
        return priceCache[item];
    }

    const data = await getUsingProxy(`https://steamcommunity.com/market/priceoverview/?currency=6&country=us&appid=730&market_hash_name=${item}&format=json`);
    const res = JSON.parse(data.contents);
    const price = res.lowest_price;


    priceCache[item] = price;

    return price;
}

function Rand(max)
{
    return Math.floor(Math.random() * max);
}
function parseCurrency(currencyString) {
    if (typeof currencyString !== 'string') {
        console.error(`Expected a string but received: ${currencyString}`);
        return 0; 
    }

    const cleanedString = currencyString
        .replace(/[^0-9,]/g, '') 
        .replace(',', '.');
    const value = parseFloat(cleanedString);
    return Math.floor(value);
}


async function getInventoryPrice(PlayerSkins)
{
    let value = 0.0;
    for(let i = 0; i < PlayerSkins.length; i++)
        value += parseCurrency(await getItemPrice(PlayerSkins[i]))
    return value
}