import Model, { attr } from '@ember-data/model';

export default class BookingModel extends Model {
  @attr('string') activityId;
  @attr('string') reservationStatus;
  @attr('string') date;
  @attr('string') time;
  @attr tickets; // array of { ticketId, reservationStatus }
  @attr primaryGuest; // object { name, email, phone }
}