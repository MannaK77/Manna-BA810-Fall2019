
 Order = require ('./order');
 SOrder = require ('./SOrder');

 let widget = new SOrderitem('Widget', 2.5, 10);
 let gidget = new SOderitem('Gidget', 1.0,20);
 let order= new SOrder('Bob', 0.10, [widget, gidget]);
console.log(order.totalvalue());

