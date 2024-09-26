const Name = "Test01";
const Skins = [
    "★ Bayonet | Slaughter (Field-Tested)",
    "★ Bayonet",
    "★ Bayonet | Fade (Factory New)"
];
const image = "https://avatars.githubusercontent.com/u/65111609?v=4";
export function OpenMe() {
    alert("Opening case: " + Name);
}

export function getJson() {
    return {
        name: Name,
        skins: Skins,
        img: image,
        OpenMe: OpenMe
    };
}