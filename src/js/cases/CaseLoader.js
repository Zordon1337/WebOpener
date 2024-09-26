

async function LoadCase(name) {
    const t = await import(`./${name}.js`);
    return t.getJson(); 
}
async function GetHTML()
{
    var itemframe = document.createElement("div")
    itemframe.classList.add("case")
    var title = document.createElement("p")
    const c = await LoadCase("Test01");
    itemframe.onclick = c.OpenMe
    title.textContent = c.name;
    var image = document.createElement("img");
    image.src = c.img;
    itemframe.appendChild(image);
    itemframe.appendChild(title);
    return itemframe
}
async function OpenCase(json)
{
    document.getElementById("CasePreview").style.display = 'none'
    document.getElementById("CaseOpenPreview").style.display = ''
    document.getElementById("CaseImage").src = json.img;
    var item = document.getElementById("CaseItem")
    for(let i = 0; i < 15; i++)
    {

        document.getElementById("CaseItemTitle").textContent = json.name; // duplication but i have no clue how to fix it properly
        item.textContent = json.skins[Rand(json.skins.length)]
        await sleep(100);
    }
    document.getElementById("CaseOpenPreview").style.display = 'none'
    document.getElementById("CaseOpenResult").style.display = ''
    document.getElementById("CaseResultTitle").textContent = `You dropped ${item.textContent} for ${await getItemPrice(item.textContent)}`
    document.getElementById("CaseResultImage").src = `https://api.steamapis.com/image/item/730/${item.textContent}`
    document.getElementById("CaseResultKeep").onclick = () => Keep(item.textContent)
    document.getElementById("CaseResultSell").onclick = () => Sell(item.textContent)
}

async function Keep(skin)
{
    let t = await import("../Player.js")
    t.Player.addSkin(skin)

    document.getElementById("CaseOpenPreview").style.display = 'none'
    document.getElementById("CaseOpenResult").style.display = 'none'
    document.getElementById("CasesList").style.display = ''
}

async function Sell(skin)
{
    let t = await import("../Player.js")
    t.Player.addMoney(parseCurrency(await getItemPrice(skin)))

    document.getElementById("CaseOpenPreview").style.display = 'none'
    document.getElementById("CaseOpenResult").style.display = 'none'
    document.getElementById("CasesList").style.display = ''
    //console.log(t.Player.getMoney())
}