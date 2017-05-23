import async from 'async';
import each from 'async/each';
import moment from'moment'

class MlTransactionsHandler {
  constructor() {
  }

  insertTransactions(transactionsParams) {
      let userAgent = {
      OS: '-',
      ipAddress: transactionsParams.connection.clientAddress,
      browser:transactionsParams.connection.httpHeaders['user-agent'],
      deviceModel: "-",
      deviceType: "-",
      deviceVendor: "-"
    }

    let toInsert =
      {
        emailId: transactionsParams.user.profile.email,
        userId: transactionsParams.user._id,
        userName: transactionsParams.user.profile.InternalUprofile.moolyaProfile.firstName,
        url: transactionsParams.connection.httpHeaders.host,
        docId: " ",
        action: transactionsParams.methodName,
        moduleName: " ",
        userAgent: userAgent,
        createdAt: new Date(),
        transactionDetails: `User ${transactionsParams.user.profile.InternalUprofile.moolyaProfile.firstName} performed ${transactionsParams.methodName} action at ${new Date()} `
      }
    const resp = MlTransactionsLog.insert(toInsert);
    return resp
  }
}

  module.exports = MlTransactionsHandler
