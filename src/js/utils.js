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

    // Remove non-numeric characters except for the decimal point
    const cleanedString = currencyString
        .replace(/[^0-9.,]/g, '')  // This will remove $ signs and other non-numeric characters
        .replace(',', '.');        // Replace comma with dot for decimal places

    const value = parseFloat(cleanedString);

    if (isNaN(value)) {
        console.error(`Could not parse the value: ${currencyString}`);
        return 0;
    }

    return value;
}


async function getInventoryPrice(PlayerSkins) {
    let totalValue = 0;

    for (let i = 0; i < PlayerSkins.length; i++) {
        const price = await getItemPrice(PlayerSkins[i]);
        totalValue += parseCurrency(price);
    }
    return (totalValue).toFixed(2); // this piece of shit makes me sad and pissed off at the same time, including parseCurrency
}

