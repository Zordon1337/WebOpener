async function getUsingProxy(url) {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    if (response.ok) {
        return response.json();  
    }
    throw new Error('Network response was not ok.');
}

async function getItemPrice(item) {
    const data = await getUsingProxy(`https://steamcommunity.com/market/priceoverview/?currency=6&country=us&appid=730&market_hash_name=${item}&format=json`);
    const res = JSON.parse(data.contents);
    return res.lowest_price;
}