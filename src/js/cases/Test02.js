const Name = "Test02";
const Skins = [
    "★ Bayonet | Slaughter (Field-Tested)",
    "★ Bayonet",
    "★ Bayonet | Fade (Factory New)"
];
const image = "https://avatars.githubusercontent.com/u/65111609?v=4";
export function OpenMe() {    

    document.getElementById("Skins").style.display = 'none'
    document.getElementById("CasesList").style.display = 'none'
    document.getElementById("CasePreview").style.display = ''
    document.getElementById("CaseName").textContent = Name;
    document.getElementById("CaseImage").src = image;
    var cc = document.getElementById("CaseContents")
    cc.innerHTML = ""
    for(let i = 0; i <= Skins.length; i++)
    {
        var elm = document.createElement("p")
        elm.textContent = Skins[i]
        cc.appendChild(elm)
    }
    document.getElementById("CaseButton").onclick = () => OpenCase({
        name: Name,
        skins: Skins,
        img: image
    });
    
}

export function getJson() {
    return {
        name: Name,
        skins: Skins,
        img: image,
        OpenMe: OpenMe
    };
}