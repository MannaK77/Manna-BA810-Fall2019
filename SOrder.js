//let Order = require ('./order');
function SOrder(customer, tax, items){

    let order = {};
    order.customer = customer;
    order.tax = tax;
    order.items = items;   
     
    order.value = function(){
            let total = 0.0;
          order.items.forEach(item => {
          total = total + (item.price * item.quantity);

      });
        
        return total;
}

order.totalvalue = function(){
    let value = order.value();
    let totalValue= order.value() + (value * order.tax);
    return totalValue;
}
return Order;
}

/*let mySOrder = new SOrderitem('Widget', 2.5, 10);
 let mySorder1 = new SOderitem('Gidget', 1.0,20);
 let mySOrder= new SOrder('Bob', 0.10, [widget, gidget]);
console.log(order.totalvalue());*/

module.exports = SOrder;




