
import Controller from '@ember/controller';
import { action, computed, tracked } from '@ember/object';
import { inject as service } from '@ember/service';
// import { parse, format } from 'libphonenumber-js'
import { AsYouType }  from 'libphonenumber-js';
// import { AsYouType } from 'lodash-es';
export default class BookingController extends Controller {

    @service router;
    @service store;
    selectedName = "null";
    selectedEmail = "ember.luvr@gmail.com";
    selectedPhone = "null";
    selectedTicket = "ticket_1";
    selectedCurrency = "$10.00";
    selectedTime = "8:00 AM";
    selectedDate = null;
    status = null;
    showConfirmButton = false;

    @action
    handleUpdate(updatedNumber) {
        const formattedNumber = '+' + updatedNumber.replace(/\D/g, '');
        // console.log("updatedNumber: ", updatedNumber);
        const phoneNumber = new AsYouType().input(formattedNumber)
        this.set('number', phoneNumber);
      }
    
    @action
    nameSelected(event) {
        this.selectedName = event.target.value;
        this.set('selectedModalName', this.selectedName);
        this.checkInputCompletion();
    }
    @action
    emailSelected(event) {
        this.selectedEmail = event.target.value;
        this.set('selectedModalEmail', this.selectedEmail);
        this.checkInputCompletion();
    }

    @action
    phoneSelected(event) {
        this.selectedPhone = event.target.value;
        this.set('selectedModalPhone', this.selectedPhone);
        this.checkInputCompletion();
    }

    checkInputCompletion() {
        if (this.selectedName && this.selectedEmail && this.selectedPhone) {
            this.set('showConfirmButton', true);
        } else {
            this.set('showConfirmButton', false);
        }
    }

    @action
    ticketSelected(event) {
        this.selectedTicket = event.target.value;
    }
    @action
    currencySelected(event) {
        this.selectedCurrency = event.target.value;
    }

    @action
    timeSelected(event) {
        this.selectedTime = event.target.value;
    }
    @action
    dateSelected(event) {
        this.selectedDate = event.target.value;
        let availabilityDates = this.model.availabilityDates;
        const selectedAvailabilityDate = availabilityDates.find(date => date.date === this.selectedDate);

        if (selectedAvailabilityDate) {
            this.status = selectedAvailabilityDate.status;
        }
    }

    @action
    OpenModal() {
        this.set('showModal', true);
        this.set('selectedModalTicket', this.selectedTicket);
        this.set('selectedModalCurrency', this.selectedCurrency);
        this.set('selectedModalTime', this.selectedTime);
        this.set('selectedModalDate', this.selectedDate);
        this.set('selectedModalName', this.selectedName);
        this.set('selectedModalEmail', this.selectedEmail);
        this.set('selectedModalPhone', this.selectedPhone);
    }

    @action
    cancelModal() {
        this.set('showModal', false);
    }
    confirmBooking = () => {
        this.set('showModal', false);
        const booking = this.store.createRecord('booking', {
            activityId: this.selectedModalTicket,
            reservationStatus: 'confirmed',
            date: this.selectedModalDate,
            time: this.selectedModalTime,
            tickets: [
                {
                    ticketId: this.selectedModalTicket,
                    reservationStatus: 'confirmed',
                }
            ],
            primaryGuest: {
                name: this.selectedModalName,
                email: this.selectedModalEmail,
                phone: this.selectedModalPhone,
            }
        });
        booking.save().then(() => {
            // Handle success
            console.log('Booking saved successfully:', booking);
        }).catch((error) => {
            // Handle error
            console.error('Error saving booking:', error);
        });

        const bookingData = {
            id: booking.id,
            activityId: booking.activityId,
            reservationStatus: booking.reservationStatus,
            date: booking.date,
            time: booking.time,
            // tickets: booking.tickets.toArray().map(ticket => {
            //     return {
            //         ticketId: ticket.ticketId,
            //         reservationStatus: ticket.reservationStatus
            //     };
            // }),
            primaryGuest: {
                name: booking.primaryGuest.name,
                email: booking.primaryGuest.email,
                phone: booking.primaryGuest.phone
            }
        };

        alert(JSON.stringify(bookingData, null, 2));
        window.location.reload();
    }


    @action
    selectTicket(ticketId) {
        
        console.log("ff", this.selectedTicket);

        // const selectedTicket = this.model.activity.tickets.findBy('id', ticketId);
        console.log("aaa", this.model.activity.tickets)
        for (var i = 0; i < this.model.activity.tickets.length; i++) {
            if (this.model.activity.tickets[i].id === ticketId) {
                const selected_price = this.model.activity.tickets[i].price;
                this.set('selectedTicketPrice', selected_price);
                this.set('selectedCurrency', selected_price.currency);
                console.log("selectedTicketPrice:", this.selectedTicketPrice)
                this.set('selectedTicket', this.model.activity.tickets[i].name);
                break;
            }
        }
    }
    @action
    selectDate(date) {
        this.set('selectedDate', date);
        for (var i = 0; i < this.model.availabilityDates.length; i++) {
            if (this.model.availabilityDates[i].date === date) {
                const usable_Times = this.model.availabilityDates[i].availabilityTimes;
                this.set('usable_Times', usable_Times);
                this.set('selectedTime', usable_Times[0].time);
                this.set('selectedSpots', usable_Times[0].spotsLeft);
                console.log("usable_Times", usable_Times)
                break;
            }
        }
    }
    @action
    selectTime(time) {
        this.set('selectedTime', time);
        for (var i = 0; i < this.usable_Times.length; i++) {
            if (this.usable_Times[i].time === time) {
                const selectedSpots = this.usable_Times[i].spotsLeft;
                this.set('selectedSpots', selectedSpots);
                console.log("selectedSpots", selectedSpots)
                break;
            }
        }
    }
    @action
    validateDate(selectedDate) {
        const validDates = ['2024-02-03', '2024-02-09'];
        if (!validDates.includes(selectedDate)) {
            // Handle invalid date
            alert('Please select a valid date.');
        } else {
            // Handle valid date
            // ...
        }
    }
    @computed('selectedDate')
    get formattedSelectedDate() {
        return this.selectedDate?.toISOString().substring(0, 10);
    }

    @computed('formattedSelectedDate')
    get isDateRed() {
        const redDates = ['2024-03-04', '2024-05-06'];
        return redDates.includes(this.formattedSelectedDate);
    }
    @computed
    get hideDescription() {
        //   console.log("ddd", window.innerHeight * window.innerWidth);
        return window.innerHeight * window.innerWidth < 385000;
    }

    @computed('selectedName', 'selectedEmail', 'selectedPhone')
    get allInputsFilled() {
        return this.selectedName && this.selectedEmail && this.selectedPhone;
    }

}
