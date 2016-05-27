module.exports = function (app) {
  const Customer = app.models.Customer;

  // First create a customer
  var cs = {
    name: 'John Smith'
  };

  Customer.create(cs, function (err, customer) {
    if (err) {
      return console.error(err);
    }
    // Now create a customer address and try to save a change in it
    customer.address.create({street: 'foo street'}, function (err, address) {
      if (err){
        return console.error(err);
      }
      // address created, try to change it and save it
      address.street = 'washington st';
      address.save(function(err){
        if (err) {
          return console.error(err)
        }
        Customer.findOne({where: {name: 'John Smith'}}, function(err, foundCustomer) {
          if (err) {
            return console.error(err);
          }
          console.log(foundCustomer.address().street, 'WRONG!!!'); // It should be washington but it is the original foo
        })
      })
    })
  })
};
