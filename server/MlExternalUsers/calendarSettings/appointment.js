/**
 * Created by pankaj on 25/6/17.
 */

/**
 * Perform user appointment calculation
 */
class MlAppointment {
  constructor() {
  }

  /**
   * Method :: buidSlotTimes
   * Desc   :: return the all slot for a user
   * @param duration :: Integer :: Interval of each slot
   * @param lunch    :: Array   :: Lunch times
   * @param slots    :: Array   :: All slot times of user
   * @returns {Array}
   */
  buidSlotTimes(duration, lunch, slots){
    let response = [];
    let internal = duration.hours*60 + duration.minutes;
    slots = slots ? slots : [];
    slots.forEach(function (slot) {
      if(slot.isActive){
        let startTime = getTimeDate(slot.start);
        let endTime   = getTimeDate(slot.end);
        let timeSlots = getTimeSlots(startTime, endTime, internal);
        response = response.concat(timeSlots);
      }
    });
    return response;
  }

  /**
   * Method :: getUserSlots
   * Desc   :: return specific user slots based on user calendar setting
   * @param calendarSetting :: Calender setting of user
   * @returns {Array} :: Users slot of all days
   */
  getUserSlots(calendarSetting){
    const that = this;
    if(calendarSetting){
      /**
       * Looping through all the working day to get slots
       */
      let userSlots = calendarSetting.workingDays.map(function (workingDay) {
        workingDay.slotTimes = that.buidSlotTimes(calendarSetting.slotDuration, workingDay.lunch, workingDay.slots);
        workingDay.slotsPerday = workingDay.slotTimes.length;
        workingDay.totalSlots = workingDay.slotsPerday * calendarSetting.appointmentCountPerSlots;
        delete workingDay.lunch;
        delete workingDay.slots;
        return workingDay;
      });
      return userSlots;
    } else {
      //they are free
    }
  }
  // Will return service card slot ie intersection of all user slots
  getServiceCardSlots(serviceId){

  }
  //Will book appointment if user is free
  bookAppointment(appointmentId){

  }
  //return booked appointment of user
  getAllAppointment(userId, profileId){

  }
  //return booked appointment of specific branch
  getBranchAppointment(branchId){

  }

  /**
   * Method :: getUserCalendar
   * desc :: User complete calender of specific month of a profile
   * @param userId     :: String  - User Id of a user
   * @param profileId  :: String  - Profile Id of a user
   * @param month      :: Integer - Month of calendar
   * @param year       :: Integer - Year of calendar
   * @returns {{days: Array}}
   */
  getUserCalendar(userId, profileId, month, year){

    /**
     * response variable for send response to user
     */
    let response = []

    /**
     * Create the first date of current requested month
     */
    let date = new Date();
    date.setDate(1);
    date.setMonth(month);
    date.setYear(year);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    /**
     * Create the first date of next month
     */
    let monthEnd = new Date();
    monthEnd.setDate(1);
    monthEnd.setMonth(month+1);
    monthEnd.setYear(year);
    monthEnd.setHours(0);
    monthEnd.setMinutes(0);
    monthEnd.setSeconds(0);

    /**
     *  Get the user calendar setting
     */
    let calendarSetting = mlDBController.findOne('MlCalendarSettings',{userId:userId, profileId:profileId});
    calendarSetting.vacations = calendarSetting.vacations ? calendarSetting.vacations : [];

    /**
     * Get user slot information of all days
     */
    let userTimeSlots = this.getUserSlots(calendarSetting);

    /**
     *  Get all the appointment of the month
     */
    let appoinments = mlDBController.find( 'MlAppointments', {'provider.userId':userId, 'provider.profileId':profileId, startDate: { gte:date } ,endDate: {lt:monthEnd} }).fetch();

    /**
     *  loop the all days in request month
     */
    while(date.getMonth() == month){
      /**
       * Calculate the total booked appoint on current day
       */
      let bookAppoinmentsCount = appoinments.filter(function (appoinment) {
        let startDate = new Date(appoinment.startDate);
        return startDate.getDate() == date.getDate();
      }).length;

      /**
       * Find the user slot information on current day
       */
      let isUserTimeSlot = userTimeSlots.find(function (userTimeSlots) {
        return userTimeSlots.dayName == date.getDay();
      });
      let status;
      if(isUserTimeSlot){

        /**
         * Define status based on no of appointment book
         */
        if(bookAppoinmentsCount == 0 || isUserTimeSlot.totalSlots/2 > bookAppoinmentsCount){
          status = 0;
        } else if (isUserTimeSlot.totalSlots/2 < bookAppoinmentsCount && isUserTimeSlot.totalSlots != bookAppoinmentsCount) {
          status = 1;
        } else if (isUserTimeSlot.totalSlots == bookAppoinmentsCount) {
          status = 2;
        }
      } else {
        status = 5;
      }
      /**
       * Overwrite the status if user on leave
       */
      calendarSetting.vacations.forEach(function (vacation) {
        let vacationStartDate = new Date(vacation.start);
        let vacationEndDate = new Date(vacation.end);

          if(vacationStartDate.getDate() <= date.getDate() && vacationEndDate.getDate() >= date.getDate() &&
                vacationStartDate.getMonth() <= date.getMonth() && vacationEndDate.getMonth() >= date.getMonth() &&
                    vacationStartDate.getYear() <= date.getYear() && vacationEndDate.getYear() >= date.getYear()) {
            if(vacation.type == 'travel'){
              status = 4;
            } else {
              status = 3;
            }
          }
      });
      /**
       * push the date information to response
       */
      let dayResponse = {
        date: date.getDate(),
        status: status
      };

      response.push(dayResponse);
      date.setDate(date.getDate()+1);
    }
    return { days: response };
  }
}

/**
 * Method :: getTimeDate
 * Desc   :: Convert a time slot into date
 * @param time
 * @returns {Date}
 */
function getTimeDate(time) {
  let timeParts = time.split(':');
  let d = new Date();
  d.setHours(timeParts[0]);
  d.setMinutes(timeParts[1]);
  return d;
}

/**
 * Method :: getTimeSlots
 * Desc   :: Calcualte the all slot between two time
 * @param startDate :: Date    - Start date for time interval
 * @param endDate   :: Date    - End date of a time interval
 * @param interval  :: Integer - length of each slot in minutes
 * @returns {Array}
 */
function getTimeSlots(startDate, endDate, interval) {
  let slots = [];
  let intervalMillis = interval * 60 * 1000;
  while (startDate < endDate && startDate.getTime() + intervalMillis <= endDate.getTime()) {
    /**
     * So that you get "00" if we're on the hour.
     */
    let mins = (startDate.getMinutes() + '0').slice(0, 2);
    let endTime = new Date();
    endTime.setTime(startDate.getTime() + intervalMillis);
    let endTimeMins = (endTime.getMinutes() + '0').slice(0, 2);
    slots.push(startDate.getHours() + ':' + mins + '-' + endTime.getHours() + ':' + endTimeMins);
    startDate.setTime(startDate.getTime() + intervalMillis);
  }
  return slots;
}

module.exports = MlAppointment;