const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    MENU: Symbol('menu'),
    SIZE1:   Symbol("size1"),
    COLOUR1:   Symbol("Colour1"),
    SIZE2:   Symbol("size2"),
    COLOUR2:   Symbol("Colour2"),
    SCARVES1:  Symbol("Scarves1"),
    SCARVES2:  Symbol("Scarves2"),
    ITEM1: Symbol('item1'),
    ITEM2: Symbol('item2')

});

const denimJacketCost = 100;
const leatherJacketCost = 200;
const scarvesCost = 20;


module.exports = class BagsOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize1 = "";
        this.sColour1 = "";
        this.sItem2 = "";
        this.sSize2 = "";
        this.sColour2 = "";
        this.sItem2 = "";
        this.sScarves1 = "";
        this.sScarves2 = "";
        this.orderTotal = 0;

    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                aReturn.push("Welcome to YP Jacket Store!");
                aReturn.push("What type of jacket would you like to order? Denim ($100) or Leather ($200)");
                this.stateCur = OrderState.ITEM1;
                break;

            case OrderState.ITEM1:
            case OrderState.MENU:
                if (sInput.toLowerCase() == 'denim') {
                    this.stateCur = OrderState.SIZE1;
                    this.sItem1 = 'Denim';
                    this.orderTotal += denimJacketCost;
                    aReturn.push("Which size you want to order?");
                    break;
                }
                this.stateCur = OrderState.SIZE2;
                this.sItem2 = 'Leather';
                this.orderTotal += leatherJacketCost;
                aReturn.push("Which size you want to order?");
                break;

            case OrderState.SIZE1:
                this.stateCur = OrderState.COLOUR1
                this.sSize1 = sInput;
                aReturn.push("What colour would you like to order?");
                break;
            case OrderState.SIZE2:
                this.stateCur = OrderState.COLOUR2
                this.sSize2 = sInput;
                aReturn.push("What colour would you like to order?");
                break;
            case OrderState.COLOUR1:
                this.stateCur = OrderState.SCARVES1
                this.sColour1 = sInput;
                aReturn.push(`Your cart value: $${(this.orderTotal).toFixed(2)}`);
                aReturn.push("Would you like matching scarves with that? (Extra $20)");
                break;
            case OrderState.COLOUR2:
                this.stateCur = OrderState.SCARVES2
                this.sColour2 = sInput;
                aReturn.push(`Your order amount: $${(this.orderTotal).toFixed(2)}`);
                aReturn.push("Would you like matching scarf with that? (Extra $20)");
                break;

            case OrderState.SCARVES1:
                if(sInput.toLowerCase() != "no"){
                    this.orderTotal += scarvesCost;
                    this.sScarves1 = sInput;
                }
                aReturn.push("Would you like to order another item? Please enter yes or no.");
                this.stateCur = OrderState.ITEM2;
                break;
            
            case OrderState.SCARVES2:
                if(sInput.toLowerCase() != "no"){
                    this.orderTotal += scarvesCost;
                    this.sScarves2 = sInput;
                }
                aReturn.push("Would you like to order another item? Please enter yes or no.");
                this.stateCur = OrderState.ITEM2;
                break;
    
            case OrderState.ITEM2:
                if (sInput.toLowerCase() != "no") {
                    aReturn.push("What type of jacket would you like to order? Denim or Leather");
                    this.stateCur = OrderState.MENU;
                    break;
                }
                aReturn.push("Thank you for your order of");                
                if (this.sItem1 != '') {
                    aReturn.push(`${this.sSize1} ${this.sColour1} ${this.sItem1} Jacket ${this.sScarves1 != '' ? ` with a matching scarf` : ''}.`);
                }
                    
                if (this.sItem2 != '') {
                    aReturn.push(` and ${this.sSize2} ${this.sColour2} ${this.sItem2} Jacket ${this.sScarves2 != '' ? ` with a matching scarf` : ''}.`);
                }                
                aReturn.push(`Your total bill amount plus tax : $${(this.orderTotal * 1.13).toFixed(2)}`);
    
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}