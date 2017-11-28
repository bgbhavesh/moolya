MlSerialNumbers = new Mongo.Collection('mlSerialNumbers')

// if(Meteor.isServer){
const portfolioNumber = MlSerialNumbers.findOne({ _id: 'portfolioNumber' });
if (!portfolioNumber) {
  MlSerialNumbers.insert({ _id: 'portfolioNumber', seq: 0 });
}

const registrationNumber = MlSerialNumbers.findOne({ _id: 'registrationNumber' });
if (!registrationNumber) {
  MlSerialNumbers.insert({ _id: 'registrationNumber', seq: 0 });
}
// }
const transactionNumber = MlSerialNumbers.findOne({ _id: 'transactionNumber' });
if (!transactionNumber) {
  MlSerialNumbers.insert({ _id: 'transactionNumber', seq: 0 });
}
const requestsNumber = MlSerialNumbers.findOne({ _id: 'requestsNumber' });
if (!requestsNumber) {
  MlSerialNumbers.insert({ _id: 'requestsNumber', seq: 0 });
}
const officeNumber = MlSerialNumbers.findOne({ _id: 'officeTransaction' });
if (!officeNumber) {
  MlSerialNumbers.insert({ _id: 'officeTransaction', seq: 0 });
}

const profileNumber = MlSerialNumbers.findOne({ _id: 'profileNumber' });
if (!profileNumber) {
  MlSerialNumbers.insert({ _id: 'profileNumber', seq: 0 });
}

const internalTaskNumber = MlSerialNumbers.findOne({ _id: 'internalTaskNumber' });
if (!internalTaskNumber) {
  MlSerialNumbers.insert({ _id: 'internalTaskNumber', seq: 0 });
}

const activityNumber = MlSerialNumbers.findOne({ _id: 'activityNumber' });
if (!activityNumber) {
  MlSerialNumbers.insert({ _id: 'activityNumber', seq: 0 });
}
const taskNumber = MlSerialNumbers.findOne({ _id: 'taskNumber' });
if (!taskNumber) {
  MlSerialNumbers.insert({ _id: 'taskNumber', seq: 0 });
}
const sessionNumber = MlSerialNumbers.findOne({ _id: 'sessionNumber' });
if (!sessionNumber) {
  MlSerialNumbers.insert({ _id: 'sessionNumber', seq: 0 });
}
const serviceNumber = MlSerialNumbers.findOne({ _id: 'serviceNumber' });
if (!serviceNumber) {
  MlSerialNumbers.insert({ _id: 'serviceNumber', seq: 0 });
}

const userServiceOrderNumber = MlSerialNumbers.findOne({ _id: 'userServiceOrderNumber' });
if (!userServiceOrderNumber) {
  MlSerialNumbers.insert({ _id: 'userServiceOrderNumber', seq: 0 });
}

const appointmentNumber = MlSerialNumbers.findOne({ _id: 'appointmentNumber' });
if (!appointmentNumber) {
  MlSerialNumbers.insert({ _id: 'appointmentNumber', seq: 0 });
}

const vactionNumber = MlSerialNumbers.findOne({ _id: 'vactionNumber' });
if (!vactionNumber) {
  MlSerialNumbers.insert({ _id: 'vactionNumber', seq: 0 });
}

const shareNumber = MlSerialNumbers.findOne({ _id: 'shareNumber' });
if (!shareNumber) {
  MlSerialNumbers.insert({ _id: 'shareNumber', seq: 0 });
}

const paymentNumber = MlSerialNumbers.findOne({ _id: 'paymentNumber' });
if (!paymentNumber) {
  MlSerialNumbers.insert({ _id: 'paymentNumber', seq: 0 });
}

orderNumberGenService = (function () {
  function getNextSequence(name) {
    const ret = MlSerialNumbers.update(
      { _id: name },
      { $inc: { seq: 1 } },
      { upsert: true }
    )
    if (ret === 1) {
      const data = MlSerialNumbers.findOne({ _id: name })
      if (data) {
        return data.seq
      }
    }
    return ret;
  }

  return {
    assignRegistrationId(registration) {
      registration.registrationId = `MLRE${FormatUtil.leadingZeros(getNextSequence('registrationNumber'), 8)}`;
    },
    assignPortfolioId(portfolio) {
      const portfolioId = `MLPF${FormatUtil.leadingZeros(getNextSequence('portfolioNumber'), 8)}`;
      portfolio.portfolioId = portfolioId
      portfolio.transactionId = portfolioId
    },
    assignTransationRequest(transaction) {
      transaction.transactionTypeId = `MLTR${FormatUtil.leadingZeros(getNextSequence('transactionNumber'), 8)}`;
    },
    assignRequests(requests) {
      requests.requestId = `MLREQ${FormatUtil.leadingZeros(getNextSequence('requestsNumber'), 8)}`;
    },
    assignOfficeTransaction(officeTransaction) {
      officeTransaction.transactionId = `MLOF${FormatUtil.leadingZeros(getNextSequence('officeTransaction'), 8)}`;
    },
    assignProcessSetupTransaction(officeTransaction) {
      officeTransaction.transactionId = `MLPS${FormatUtil.leadingZeros(getNextSequence('officeTransaction'), 8)}`;
    },
    createUserProfileId(userProfile) {
      userProfile.profileId = `MLPRO${FormatUtil.leadingZeros(getNextSequence('profileNumber'), 8)}`;
    },
    createinternalTaskId(taskObj) {
      taskObj.internalTaskId = `MLITK${FormatUtil.leadingZeros(getNextSequence('internalTaskNumber'), 8)}`;
    },
    createInteractionSCcode(scDef) {
      scDef.code = `MLINT${FormatUtil.leadingZeros(getNextSequence('interactionSC'), 8)}`;
    },
    createBspokeOfficeSCcode(scDef) {
      scDef.code = `ML-OFF-${FormatUtil.leadingZeros(getNextSequence('bspoke'), 8)}`;
    },
    createOfficeSCcode(scDef) {
      scDef.code = `ML-OFF-${FormatUtil.leadingZeros(getNextSequence('office'), 8)}`;
    },

    createActivityId(userActivity) {
      userActivity.transactionId = `MLACT${FormatUtil.leadingZeros(getNextSequence('activityNumber'), 8)}`;
    },
    createTaskId(userTask) {
      userTask.transactionId = `MLTSK${FormatUtil.leadingZeros(getNextSequence('taskNumber'), 8)}`;
    },
    createSessionId(userTask) {
      userTask.sessionId = `MLSES${FormatUtil.leadingZeros(getNextSequence('sessionNumber'), 8)}`;
    },
    createServiceId(userService) {
      userService.transactionId = `MLSER${FormatUtil.leadingZeros(getNextSequence('serviceNumber'), 8)}`;
    },
    createUserServiceOrderId(data) {
      data.orderId = `MLUSO${FormatUtil.leadingZeros(getNextSequence('userServiceOrderNumber'), 8)}`;
    },
    createAppointmentId(appointmentData) {
      appointmentData.appointmentId = `MLAPT${FormatUtil.leadingZeros(getNextSequence('appointmentNumber'), 8)}`;
    },
    createVactionId(vactionData) {
      vactionData.vacationId = `MLHLD${FormatUtil.leadingZeros(getNextSequence('vactionNumber'), 8)}`;
    },
    createShareId(data) {
      data.sharedId = `MLSHR${FormatUtil.leadingZeros(getNextSequence('shareNumber'), 8)}`;
    },
    createPaymentId(data) {
      data.paymentId = `MLPYM${FormatUtil.leadingZeros(getNextSequence('paymentNumber'), 8)}`;
    },
    generateRandomPassword() {
      const randomId = function makeid() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 7; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
        return text;
      }

      return `ML${randomId()}`;
    }

    /* generateProfileId:function(transaction){
      regDetails.profileId="ML-PR-"+FormatUtil.leadingZeros(getNextSequence("profileNumber"),8);
    } */
  }
}());

FormatUtil = {
  leadingZeros: pad
};

function pad(num, size) {
  const s = `000000000${num}`;
  return s.substr(s.length - size);
}
