let Order = require ('./order');

function SOrder(customer, tax, items){

    let sorder = {};
    sorder.customer = customer;
    sorder.tax = tax;
    sorder.items = items; 

       
    sorder.value = function() {
            let total = 0;
          sorder.items.forEach(item => {
          total = (total + (item.price * item.quantity));

      });
        
        return total;
}

sorder.totalvalue = function() {
    
    total = sorder.value();
    return sorder.value() + (total * sorder.tax);
     
}
return sorder;

}

//module.exports = SOrder;

let myOrder1 = new Order('Widget', 2.5, 10);
 let myOrder2 = new Order('Gidget', 1.0, 20);
 let myOrder= new SOrder('Bob', 0.10, ['widget', 'gidget']);
 console.log(myOrder.totalvalue());




