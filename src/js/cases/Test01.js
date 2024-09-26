const Name = "Test01";
const Skins = [
    "★ Bayonet | Slaughter (Field-Tested)",
    "★ Bayonet",
    "★ Bayonet | Fade (Factory New)"
];
const image = "https://avatars.githubusercontent.com/u/65111609?v=4";
export function OpenMe() {   
    document.getElementById("CasesList").style.display = 'none'

    document.getElementById("CasePreview").style.display = ''
    document.getElementById("CaseName").textContent = Name;
    document.getElementById("CaseImage").src = image;
    document.getElementById("CaseButton")
    var cc = document.getElementById("CaseContents")
    for(let i = 0; i <= Skins.length; i++)
    {
        var elm = document.createElement("p")
        elm.textContent = Skins[i]
        cc.appendChild(elm)
    }
}

export function getJson() {
    return {
        name: Name,
        skins: Skins,
        img: image,
        OpenMe: OpenMe
    };
}