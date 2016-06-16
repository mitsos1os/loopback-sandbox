/**
 * Taken from loopback documentation
 * https://docs.strongloop.com/display/public/LB/Defining+and+using+roles
 */

module.exports = function (app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  User.create([
    {username: 'John', email: 'john@doe.com', password: 'opensesame'},
    {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
    {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
  ], function(err, users) {
    if (err) return console.error(err);

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) return console.error(err);

      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        if (err) return console.error(err);
        // lets find the Id of bob  who is an admin
        User.findOne({ where: { username: 'Bob' } }, function (err, adminUser) {
          if (err) return console.error(err);
          // we got the user... find its roles
          Role.getRoles({ principalType: RoleMapping.USER, principalId: adminUser.id }, function (err, roles) {
            console.log(roles); // WE GET THE ARRAY [ '$authenticated', '$everyone', 1 ]
            // 1 is admin role id, wheren't we supposed to get 'admin' as role name???
          })
        });
      });
    });
  });

};
