async function setElementText(elm, text)
{
    document.getElementById(elm).textContent = await text;
}
async function setElementPrice(elm, item)
{
    var price = await getItemPrice(item)
    document.getElementById(elm).textContent = `Item Price: ${price}`;
}