const {Schema, model} = require('mongoose');

const eventSchema = new Schema({
  name: { type: String, required: true },
  dateOfEvent: { type: Date, required: true },
  noOfAttendee:{ type:Number}
});


const Event = model('Event', eventSchema);
module.exports= Event;