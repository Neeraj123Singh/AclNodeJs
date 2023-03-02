var acl = require('acl');
const nodeAcl = new acl(new acl.memoryBackend());
const Roles  = ['admin','user']

nodeAcl.allow([
  {
    roles: Roles,
    allows: [
      {
        resources: [
          '/signUp',
          '/getAllProduct'
        ],
        permissions: ['*']
      },
    ],
  },
  {
    roles: ["admin"],
    allows: [
      {
        resources: [
          '/createProduct',
          '/deleteProduct',
          '/updateProduct'

        ],
        permissions: ['*']
      },
    ],
  },
  {
    roles: ["user"],
    allows: [
      {
        resources: [
         
        ],
        permissions: ['*']
      },
    ],
  }
]);


module.exports = {
  nodeAcl
}