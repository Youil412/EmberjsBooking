/** 
 * Use this file to get the data for the model for your route as if it's coming back from the server.
 *
 * @typedef {Object} activity - Represents an activity that can be booked; hasMany tickets
 * @typedef {Object} ticket - Represents a ticket type that can be selected for the activity; belongsTo an activity
 *
 * @property {string} id - Unique identifier of the activity
 * @property {string} name - Name of the activity
 * @property {string} description - Description of the activity
 * @property {array.<ticket>} tickets - Tickets that are available to book on the activity
 *   @property {string} ticket.id - Unique identifier of the ticket
 *   @property {string} ticket.name - Name of the ticket
 *   @property {object} ticket.price - Price details for how much an individual ticket costs
 *     @property {string} price.amount - Raw string for the price amount
 *     @property {string} price.currency - Currency code for the price
 *     @property {string} price.formatted - Formatted version of the price with currency
**/

export const activity = {
  "id": "activity_1",
  "name": "Awesome Walking Tour",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "tickets": [{
    "id": "ticket_1",
    "name": "ø",
    "price": {
      "amount": "10.00",
      "currency": "USD",
      "formatted": "$10.00"
    },
  },
  {
    "id": "ticket_2",
    "name": "Child",
    "price": {
      "amount": "5.00",
      "currency": "USD",
      "formatted": "$5.00"
    }
  }]
}

/** 
 * @typedef {Object} availabilityDate - Represents a date that could be potentially booked for the activity; hasMany availabilityTimes
 * @typedef {Object} availabilityTime - Represents a time that could be potentially booked for the activity; belongsTo an availabilityDate
 *
 * @property {string} date {string} - Date in YYYY-MM-DD format
 * @property {string} status (AVAILABLE, SOLD_OUT) - String that indicates whether tickets can be booked for that date (if all the times for that date are sold out, the status will be "SOLD_OUT", otherwise the status will be "AVAILABLE")
 * @property {array.<availabilityTime>} availabilityTimes - (Potentially) available times for the date
 *   @property {string} availabilityTime.time - Time in HH:MM A format
 *   @property {number} availabilityTime.spotsLeft - Number of tickets that can still be booked on the time
 *   @property {string} availabilityTime.status (AVAILABLE, SOLD_OUT) - String that indicates whether tickets can be booked for that time (if spotsLeft is 0, the status will be "SOLD_OUT", otherwise the status will be "AVAILABLE")
**/
const availabilityDates = [{
  "date": "2024-06-01",
  "status": "AVAILABLE",
},
{
  "date": "2024-06-02",
  "status": "SOLD_OUT",
},
{
  "date": "2024-06-03",
  "status": "AVAILABLE",
  "availabilityTimes": [{
    "time": "8:00 AM",
    "spotsLeft": 3,
    "status": "AVAILABLE",
  },
  {
    "time": "12:00 PM",
    "spotsLeft": 2,
    "status": "AVAILABLE"
  },
  {
    "time": "3:00 PM",
    "spotsLeft": 8,
    "status": "AVAILABLE"
  }]
},
{
  "date": "2024-06-04",
  "status": "AVAILABLE",
  "availabilityTimes": [{
    "time": "8:00 AM",
    "spotsLeft": 1,
    "status": "AVAILABLE"
  },
  {
    "time": "12:00 PM",
    "spotsLeft": 0,
    "status": "SOLD_OUT"
  },
  {
    "time": "3:00 PM",
    "spotsLeft": 0,
    "status": "SOLD_OUT"
  }]
},
{
  "date": "2024-06-05",
  "status": "AVAILABLE",
  "availabilityTimes": [{
    "time": "8:00 AM",
    "spotsLeft": 3,
    "status": "AVAILABLE",
  },
  {
    "time": "12:00 PM",
    "spotsLeft": 9,
    "status": "AVAILABLE"
  },
  {
    "time": "3:00 PM",
    "spotsLeft": 10,
    "status": "AVAILABLE"
  }]
},
{
  "date": "2024-06-06",
  "status": "SOLD_OUT",
  "availabilityTimes": [{
    "time": "8:00 AM",
    "spotsLeft": 0,
    "status": "SOLD_OUT"
  },
  {
    "time": "12:00 PM",
    "spotsLeft": 0,
    "status": "SOLD_OUT"
  },
  {
    "time": "3:00 PM",
    "spotsLeft": 0,
    "status": "SOLD_OUT"
  }]
},
{
  "date": "2024-06-07",
  "status": "AVAILABLE",
  "availabilityTimes": [{
    "time": "8:00 AM",
    "spotsLeft": 6,
    "status": "AVAILABLE"
  },
  {
    "time": "12:00 PM",
    "spotsLeft": 2,
    "status": "AVAILABLE"
  },
  {
    "time": "3:00 PM",
    "spotsLeft": 1,
    "status": "AVAILABLE"
  }]
}]
      

return {
  "activity": activity,
  "availabilityDates": availabilityDates
}