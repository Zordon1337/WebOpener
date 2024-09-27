
const casestoload = [
    "Test01",
    "Test02"
]
async function LoadCase(name) {
    const t = await import(`./${name}.js`);
    return t.getJson(); 
}
async function GetHTML()
{
    for(let i = 0; i <= casestoload.length; i++)
    {
        var itemframe = document.createElement("div")
        itemframe.classList.add("case")
        var title = document.createElement("p")
        const c = await LoadCase(casestoload[i]);
        itemframe.onclick = c.OpenMe
        title.textContent = c.name;
        var image = document.createElement("img");
        image.src = c.img;
        itemframe.appendChild(image);
        itemframe.appendChild(title);
        var br = document.createElement("br")
        var br2 = document.createElement("br")
        itemframe.appendChild(br)
        itemframe.appendChild(br2)
        document.getElementById("CasesList").appendChild(itemframe)
    }
}
async function OpenCase(json)
{
    document.getElementById("CaseResultImage").src = ``
    document.getElementById("CaseResultTitle").textContent = `Loading skin...`
    document.getElementById("CasePreview").style.display = 'none'
    document.getElementById("CaseOpenPreview").style.display = ''
    document.getElementById("CaseImage").src = json.img;
    var item = document.getElementById("CaseItem")
    for(let i = 0; i < 25; i++)
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
async function Render()
{
    let t = await import("../Player.js")
    const skins = t.Player.getSkins()
    var skindiv = document.getElementById("Skins")
    skindiv.innerHTML = "<h1>Your Skins:</h1>"
    for(let i = 0; i < skins.length; i++)
    {
        var test = document.createElement("p")
        test.textContent = skins[i]
        skindiv.appendChild(test)
    }
}
async function Keep(skin)
{
    let t = await import("../Player.js")
    t.Player.addSkin(skin)

    document.getElementById("CaseOpenPreview").style.display = 'none'
    document.getElementById("CaseOpenResult").style.display = 'none'
    document.getElementById("CasesList").style.display = ''

    document.getElementById("Skins").style.display = ''
    Render();
}

async function Sell(skin)
{
    let t = await import("../Player.js")
    t.Player.addMoney(parseCurrency(await getItemPrice(skin)))

    document.getElementById("CaseOpenPreview").style.display = 'none'
    document.getElementById("CaseOpenResult").style.display = 'none'
    document.getElementById("CasesList").style.display = ''

    document.getElementById("Skins").style.display = ''
    //console.log(t.Player.getMoney())
}