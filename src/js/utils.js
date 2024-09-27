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
    const cleanedString = currencyString
        .replace(/[^0-9,]/g, '') 
        .replace(',', '.');
    const value = parseFloat(cleanedString);
    return Math.floor(value);
}