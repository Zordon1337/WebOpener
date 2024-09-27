export class Player {
    static PlayerMoney = 0;
    static PlayerSkins = [];

    static addMoney(amount) {
        this.PlayerMoney += amount;
    }

    static addSkin(skin) {
        this.PlayerSkins.push(skin);
    }

    static getMoney() {
        return this.PlayerMoney;
    }
    
    static getSkins() {
        return this.PlayerSkins;
    }
}
