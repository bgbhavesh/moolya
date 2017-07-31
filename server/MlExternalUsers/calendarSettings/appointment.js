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
   * Method :: buildSlotTimes
   * Desc   :: return the all slot for a user
   * @param duration :: Integer :: Interval of each slot
   * @param lunch    :: Array   :: Lunch times
   * @param slots    :: Array   :: All slot times of user
   * @returns {Array}
   */
  buildSlotTimes(duration, lunch, slots){
    let response = [];
    duration.hours = duration.hours ? duration.hours : 0;
    duration.minutes = duration.minutes ? duration.minutes : 0;
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
   * Method :: getUserSlot
   * Desc   :: Return the slots timing of specific date
   * @param calendarSetting
   * @param date
   * @returns {userTimeSlot}
   */
  getUserSlot(calendarSetting, reqDate){
    const that = this;
    if(calendarSetting){
      let date = new Date(reqDate);
      /**
       * Find request day through all the working day to get slots
       */
      let isWorkingDay = calendarSetting.workingDays.find(function (workingDay) {
        return date.getDay() == workingDay.dayName;
      });
      if(isWorkingDay){
        isWorkingDay.slotTimes = that.buildSlotTimes(calendarSetting.slotDuration, isWorkingDay.lunch, isWorkingDay.slots);
        isWorkingDay.appointmentPerSlot = isWorkingDay.slotTimes.length;
        isWorkingDay.totalSlots = isWorkingDay.appointmentPerSlot * calendarSetting.appointmentCountPerSlots;
        delete isWorkingDay.lunch;
        delete isWorkingDay.slots;
        return isWorkingDay;
      } else {
        //Handle if user calendar is not set up
        return {
          isActive: false
        }
      }
    } else {
      //they are free
    }
  }

  /**
   * Method :: getUserAvailabilityOfDifferentSlotOnDay
   * Desc   :: Get the user available slots on specif date
   * @param date       :: Object - Date Object
   * @param slotsInfo  :: Object - Slot information of the user
   * @param userId     :: String - UserId of user
   * @param profileId  :: String - ProfileId of user
   * @returns {Array}
   */
  getUserAvailabilityOfDifferentSlotOnDay(date, slotsInfo, userId, profileId){

    /**
     * Check slot is active or not
     */
    if(slotsInfo.isActive){
      /**
       * Define the next day to get current date appointment
       */
      let endDate = new Date(date);
      endDate.setDate(endDate.getDate()+1);
      let appointments = mlDBController.aggregate( 'MlAppointments', [
        {
          $lookup: {
            from: "mlAppointmentMembers",
            localField: "appointmentId",
            foreignField: "appointmentId",
            as: "members"
          }
        },
        { "$unwind": "$members" },
        { "$match": {'members.userId':userId, 'members.profileId':profileId, startDate: { $gte:date } ,endDate: {$lt:endDate} } }
      ]);

      /**
       * Create response
       */
      let response = slotsInfo.slotTimes.map(function (time) {
        let slotStartTime = getTimeDate(time.split('-')[0], date);
        slotStartTime.setSeconds(0,0);
        let slotEndTime = getTimeDate(time.split('-')[1], date);
        slotEndTime.setSeconds(0,0);

        /**
         * Filter the current slot appointment form current day appointment
         */
        let appoinmentsCountPerSlot = appointments.filter(function (appointment) {
          let appointmentStartDate = new Date(appointment.startDate);
          appointmentStartDate.setSeconds(0,0);
          let appointmentEndDate = new Date(appointment.endDate);
          appointmentStartDate.setSeconds(0,0);
          return (slotStartTime >= appointmentStartDate && slotEndTime <= appointmentEndDate);
        }).length;

        /**
         * Create status based on no of appointment count on this slot
         */
        let status = 0;
        if(appoinmentsCountPerSlot == 0 || slotsInfo.appointmentPerSlot/2 < appoinmentsCountPerSlot ){
          status = 0;
        } else if(appoinmentsCountPerSlot != slotsInfo.appointmentPerSlot && slotsInfo.appointmentPerSlot/2 >= appoinmentsCountPerSlot){
          status = 1;
        } else if (appoinmentsCountPerSlot == slotsInfo.appointmentPerSlot){
          status = 2;
        }

        return {
          slotTime : time,
          isAvailable: appoinmentsCountPerSlot >= slotsInfo.appointmentPerSlot ? false : true,
          status: appoinmentsCountPerSlot >= slotsInfo.appointmentPerSlot ? 2 : status
        }
      });
        return response;
    } else {
      // User is not available
    }
  }

  /**
   * Method :: getSessionTimeSlots
   * @param sessionId
   * @param day
   * @param month
   * @param year
   */
  getSessionTimeSlots(taskId, sessionId, day, month, year){
    const that = this;
    /**
     * Initialize the date object and set date month and year
     */
    let date = new Date();
    date.setDate(day);
    date.setMonth(month);
    date.setYear(year);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    /**
     * Fetch user task info and calendar setting
     */
    let task = mlDBController.findOne('MlTask', {_id:taskId} );
    let calendarSetting = mlDBController.findOne('MlCalendarSettings',{userId: task.userId, profileId: task.profileId});
    calendarSetting.vacations = calendarSetting.vacations ? calendarSetting.vacations : [];

    /**
     * Get service provider available slots
     */
    let serviceProviderSlots = that.getUserSlot(calendarSetting, date);

    if(!serviceProviderSlots || !serviceProviderSlots.isActive){
      return []
    }

    let serviceProviderSlotsAvailability = that.getUserAvailabilityOfDifferentSlotOnDay(date, serviceProviderSlots, task.userId, task.profileId);
    let teamSlotsAvailabilities = [];

    /**
     * Find the requested session
     */
    let session = task.session.find(function (data) {
      return data.sessionId == sessionId;
    });

    let activities = mlDBController.find('MlActivity',{'_id': { $in: session.activities }}).fetch();

    /**
     * Get activity assignees available slots
     */
    activities.forEach(function(activity){
      activity.teams = activity.teams ? activity.teams : [];
      //Skip for moolya admin
      activity.teams.forEach(function (team) {
        team.users = team.users ? team.users : [];
        team.users.forEach(function (user) {
          if ( !user.isMandatory ) {
            return
          }
          let calendarSetting = mlDBController.findOne('MlCalendarSettings',{userId: user.userId, profileId: user.profileId});
          let teamSlots;
          if(calendarSetting){
            calendarSetting.vacations = calendarSetting.vacations ? calendarSetting.vacations : [];
            teamSlots = that.getUserSlot(calendarSetting, date);
          } else {
            teamSlots = serviceProviderSlots;
            teamSlots.appointmentPerSlot = 1;
          }
          let serviceProviderSlotsAvailability = that.getUserAvailabilityOfDifferentSlotOnDay(date, teamSlots, task.userId, task.profileId);
          user.slotsAvailability = serviceProviderSlotsAvailability;
          teamSlotsAvailabilities.push(user);
        });
      });
    });

    /**
     * Intersection service provider available slots with assignees available slots
     */
    serviceProviderSlotsAvailability.forEach(function(serviceProviderSlotAvailabily){
      let serviceProviderSlotStartTime = getTimeDate(serviceProviderSlotAvailabily.slotTime.split('-')[0], date);
      let serviceProviderSlotEndTime = getTimeDate(serviceProviderSlotAvailabily.slotTime.split('-')[1], date);
      let isServiceProviderSlotStartTimeFind = false;
      let isServiceProviderSlotEndTimeFind = false;
      teamSlotsAvailabilities.forEach(function (teamSlotsAvailability) {
        teamSlotsAvailability.slotsAvailability.forEach(function (slotAvailability) {
          if(!serviceProviderSlotAvailabily.isAvailable){
            serviceProviderSlotAvailabily.status = 2;
            return;
          }
          let teamSlotStartTime = getTimeDate(slotAvailability.slotTime.split('-')[0], date);
          let teamSlotEndTime = getTimeDate(slotAvailability.slotTime.split('-')[1], date);
          if(teamSlotStartTime <= serviceProviderSlotStartTime && serviceProviderSlotStartTime < teamSlotEndTime) {
            isServiceProviderSlotStartTimeFind = true;
          }
          if(isServiceProviderSlotStartTimeFind && !isServiceProviderSlotEndTimeFind){
            serviceProviderSlotAvailabily.isAvailable = slotAvailability.isAvailable;
          }
          if(teamSlotStartTime < serviceProviderSlotEndTime && serviceProviderSlotEndTime <= teamSlotEndTime) {
            isServiceProviderSlotEndTimeFind = true;
          }
        });
      });
    });
    return serviceProviderSlotsAvailability;
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
        workingDay.slotTimes = that.buildSlotTimes(calendarSetting.slotDuration, workingDay.lunch, workingDay.slots);
        workingDay.appointmentPerSlot = workingDay.slotTimes.length;
        workingDay.totalSlots = workingDay.appointmentPerSlot * calendarSetting.appointmentCountPerSlots;
        delete workingDay.lunch;
        delete workingDay.slots;
        return workingDay;
      });
      return userSlots;
    } else {
      //they are free
    }
  }

  //Will book appointment if user is free
  bookAppointment(appointmentId, taskId, sessionId, hour, minute, day, month, year){
    const that = this;
    /**
     * Initialize the date object and set date month and year
     */
    let date = new Date();
    date.setDate(day);
    date.setMonth(month);
    date.setYear(year);
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    /**
     * Fetch user task info and calendar setting
     */
    let task = mlDBController.findOne('MlTask', taskId);
    /**
     * Find the requested session
     */
    let session = task.session.find(function (data) {
      return data.sessionId == sessionId;
    });
    let sessionDuration = session.duration;
    if(sessionDuration){
      let canAppoinmentBook = true;
      let isStartTimeFind = false;
      let totalSlotsDuration = 0;
      let availableSlots = that.getSessionTimeSlots(taskId, sessionId, day, month, year);
      if(!availableSlots || !availableSlots.length) {
        canAppoinmentBook = false;
      }
      session.duration.hours = session.duration.hours ? session.duration.hours : 0 ;
      session.duration.minutes = session.duration.minutes ? session.duration.minutes : 0 ;
      let sessionDurationInMinutes = session.duration.hours * 60 + session.duration.minutes;
      availableSlots.forEach(function (availableSlot) {
        if(!canAppoinmentBook || totalSlotsDuration >= sessionDurationInMinutes ){
          return ;
        }
        let slotStartTime = getTimeDate(availableSlot.slotTime.split('-')[0], date);
        if(date.getHours() === slotStartTime.getHours() && date.getMinutes() === slotStartTime.getMinutes()){
          isStartTimeFind = true;
        }
        let slotEndTime = getTimeDate(availableSlot.slotTime.split('-')[1], date);
        let slotDifference = slotEndTime - slotStartTime;
        let slotDurationInMinutes = Math.round((slotDifference % 86400000) / 60000);
        if(isStartTimeFind) {
          if(!availableSlot.isAvailable) {
            canAppoinmentBook =false;
          }
          totalSlotsDuration += slotDurationInMinutes;
        }
      });

      if(canAppoinmentBook && (totalSlotsDuration >= sessionDurationInMinutes) ) {
        let endDate = new Date(date);
        endDate.setMinutes(endDate.getMinutes()+sessionDurationInMinutes);
        return {
          success: true,
          start: date,
          end: endDate
        };
      } else {
        return {
          success: false,
          message: "Service Provide is not available, Please select a different time slot"
        };
      }
    } else {
      //Send error session duration not set
    }
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

    if(!calendarSetting){
      return { days: [] };
    }

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
        date: new Date(date),//.getDate(),
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
function getTimeDate(time, date) {
  let timeParts = time.split(':');
  let d = date ? new Date(date) : new Date();
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

module.exports = new MlAppointment();
