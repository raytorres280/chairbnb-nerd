const db = require('./db')
const Host = require('./db/models/Host')
const Location = require('./db/models/Location')
const Order = require('./db/models/Order')
const User = require('./db/models/User')


const hosts = [
	{ first: 'ray',
		last: 'torres',
		email: 'test@aol.com',
		password: 'hello',
		dob: new Date(80, 1, 22),
		accNum: '5557600',
	},
	{ first: 'jon',
		last: 'doe',
		email: 'test@gmail.com',
		password: 'there',
		dob: new Date(87, 7, 1),
		accNum: '787908123',
	}
]

const locations = [
	{
		street: '1 hyper loop',
	  street2: 'suite 1337',
	  city: 'san francisco',
	  state: 'CA',
	  zip: '90210',
	  rate: 5.0,
	  avgStars: 5.0,
	  chair: 'boring chair',
		weight_limit: 10000,
		seating_limit: 2,
		description: 'a boring chair',
		minimum_stay_length: 1,
		has_food: true,
		has_tv: true,
		has_wifi: true,
		check_in: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 13, 0),
		check_out: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12, 0),
		hostId: 1
	},
	{
		street: '1 infinite loop',
	  street2: 'suite X',
	  city: 'san francisco',
	  state: 'CA',
	  zip: '90210',
	  rate: 5.0,
	  avgStars: 5.0,
	  chair: 'iChair',
		weight_limit: 1000,
		seating_limit: 1,
		description: 'the lightest chair ever built',
		minimum_stay_length: 3,
		has_food: true,
		has_tv: true,
		has_wifi: true,
		check_in: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 13, 0),
		check_out: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12, 0),
		hostId: 1
	},
	{
		street: '221 B Baker St',
	  street2: '42 Wallaby Way',
	  city: 'Sydney',
	  state: 'AU',
	  zip: '00000',
	  rate: 5.0,
	  avgStars: 5.0,
	  chair: 'dentist chair',
		weight_limit: 10000,
		seating_limit: 2,
		description: 'a painful chair',
		minimum_stay_length: 1,
		has_food: false,
		has_tv: false,
		has_wifi: false,
		check_in: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 13, 0),
		check_out: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12, 0),
		hostId: 2
	},
	{
		street: 'Evergreen Terrace',
	  street2: 'Wayne Manor',
	  city: 'Gotham City',
	  state: 'NY',
	  zip: '11111',
	  rate: 5.0,
	  avgStars: 5.0,
	  chair: 'dark chair',
		weight_limit: 10000,
		seating_limit: 2,
		description: 'a chair of justice',
		minimum_stay_length: 1,
		has_food: false,
		has_tv: true,
		has_wifi: true,
		check_in: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 13, 0),
		check_out: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12, 0),
		hostId: 1
	}
]

const users = [
	{
		first: 'kanye',
		last: 'west',
		email: 'kan@yeezy.com',
		password: 'greatest',
		dob: new Date(85, 1, 1)

	},
	{
		first: 'kim',
		last: 'kardashian',
		email: 'kim@yeezy.com',
		password: 'omg',
		dob: new Date(90, 1, 1)

	}
]

const orders = [
	{
		is_active: true,
		start_date: new Date('2017-12-25'),
		end_date: new Date('2017-12-28'),
	  days_rented: 3,
	  coupon: '',
	  total: 345.25,
		userId: 1,
		locationId: 1
	},
	{
		is_active: true,
		start_date: new Date('2017-12-3'),
		end_date: new Date('2017-12-9'),
	  days_rented: 3,
	  coupon: '',
	  total: 345.25,
		userId: 1,
		locationId: 1
	},
	{
		is_active: true,
		start_date: new Date('2017-12-1'),
		end_date: new Date('2017-12-2'),
	  days_rented: 3,
	  coupon: '',
	  total: 345.25,
		userId: 1,
		locationId: 1
	},
	{
		is_active: false,
		start_date: new Date('2017-12-3'),
		end_date: new Date('2017-12-9'),
	  days_rented: 6,
	  coupon: '',
	  total: 2000.10,
		userId: 1,
		locationId: 2
	},
	{
		is_active: true,
		start_date: new Date('2017-12-1'),
		end_date: new Date('2017-12-2'),
	  days_rented: 4,
	  coupon: '',
	  total: 7000.00,
		userId: 1,
		locationId: 3
	}
]

const seed = () =>
	Promise.all(hosts.map(host =>
		Host.create(host))
	)
	.then(() =>
	Promise.all(locations.map(location => {
		console.log('hosts done')
		Location.create(location)
		})
	))
	.then(() =>
	Promise.all(users.map(user => {
		console.log('locations done')
		User.create(user)
		})
	))
	.then(() =>
	Promise.all(orders.map(order => {
		console.log('orders done')
		Order.create(order)
		})
	))

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
			console.log('finished')
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      // db.close();
      return null;
    });
};

main();
