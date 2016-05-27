module.exports = function (app) {
  const Customer = app.models.Customer;

  // First create a customer
  var cs = {
    name: 'Marko Polo'
  };

  Customer.create(cs, function (err, customer) {
    if (err) {
      return console.error(err);
    }
    // Now create a customer email address and try to save a change in it
    customer.emails.create({label: 'personal', address: 'someone@somewhere.com'}, function (err, email) {
      if (err){
        return console.error(err);
      }
      // address created, try to change it and save it
      email.label = 'workmail';
      email.save(function(err){
        if (err) {
          return console.error(err)
        }
        Customer.findOne({where: {name: 'Marko Polo'}}, function(err, foundCustomer) {
          if (err) {
            return console.error(err);
          }
          console.log(foundCustomer.emails()[0].label, 'CORRECT!!!'); // It has chanegd to workmail correctly
        })
      })
    })
  })
};
