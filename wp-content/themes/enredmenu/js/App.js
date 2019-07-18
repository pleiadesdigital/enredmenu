var $ = require('jquery');
var Person = require('./modules/Person');

class Adult extends Person {
  payTaxes() {
    console.log(this.name + " now owes $0 in taxes.");
  }
}

let jessica = new Person("Jessica Chastain", "slateblue");
jessica.greet();

let jane = new Adult("Jane Miss", "rebeccapurple");
jane.greet();
jane.payTaxes();
