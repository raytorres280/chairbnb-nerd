'use strict';

const User = require('./User');
const Location = require('./Location');
const Order = require('./Order');
const Host = require('./Host');
//TODO: RELATIONSHIPS
//TODO: IMPORT MODELS


//order relationship
User.hasMany(Order)
Location.hasMany(Order)
Order.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
})
Order.belongsTo(Location, {
  foreignKey: {
    allowNull: false
  }
})

//location to host n:1
Host.hasMany(Location)
Location.belongsTo(Host)


//TODO: review 1:1 (belongsTo) order & review to location n:1 location (hasMany)

module.exports = {
  User,
  Location,
  Order,
  Host
}
