
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
async function OpenCase(Items)
{
}