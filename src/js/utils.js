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

    const data = await getUsingProxy(`https://steamcommunity.com/market/priceoverview/?currency=1&country=us&appid=730&market_hash_name=${item}&format=json`);
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
        .replace(/[^0-9.,]/g, '')
        .replace(',', '.');

    const value = parseFloat(cleanedString);

    if (isNaN(value)) {
        console.error(`Could not parse the value: ${currencyString}`);
        return 0;
    }
    return value; 
}


async function getInventoryPrice(PlayerSkins) {
    let totalValue = 0;

    console.log('Player Skins:', PlayerSkins);

    for (let i = 0; i < PlayerSkins.length; i++) {
        const price = await getItemPrice(PlayerSkins[i]);
        const parsedPrice = parseCurrency(price);

        console.log(`Skin: ${PlayerSkins[i]}, Raw Price: ${price}, Parsed Price: ${parsedPrice}`);
        
        totalValue += parsedPrice; // why does this piece of shit adds sometimes +1 instead of 1k
    }

    console.log(`Total Value before formatting: ${totalValue}`);

    return totalValue.toFixed(2); 
}
