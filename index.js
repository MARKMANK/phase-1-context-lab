let allEmployeeRecordsArray = [];
let employeeRecord = {};
//turns an array into an object with defined keys
function createEmployeeRecord ([firstName,familyName,title,payPerHour]){
    employeeRecord = {
        "firstName": firstName,
        "familyName": familyName,
        "title": title,
        "payPerHour": payPerHour,
        "timeInEvents": [],
        "timeOutEvents": [],
    }
    return employeeRecord;
}

//creates an array using the new objects
function createEmployeeRecords (inputArray){
    allEmployeeRecordsArray = [];
    for(let i = 0;i < inputArray.length;i++){
        const newEmployee = createEmployeeRecord(inputArray[i])
        allEmployeeRecordsArray.push(newEmployee)
    }
    return allEmployeeRecordsArray;
}
//stampSting in YYYY-MM-DD HHMM
function createTimeInEvent (stampString){
    const stampArray = stampString.split('');
    const clockInObject = {
        "type": "TimeIn",
        "hour": parseInt(stampArray.slice(11,15).join("")),
        "date": stampArray.slice(0,10).join(""),
    }
    this.timeInEvents.push(clockInObject);
    return this;
}
createTimeInEvent.bind(employeeRecord);

function createTimeOutEvent (stampString){
    const stampArray = stampString.split('');
    const clockOutObject = {
        "type": "TimeOut",
        "hour": parseInt(stampArray.slice(11,15).join("")),
        "date": stampArray.slice(0,10).join(""),
    }
    this.timeOutEvents.push(clockOutObject);
    return this;
}
createTimeOutEvent.bind(employeeRecord);

//dateString in YYYY-MM-DD
function hoursWorkedOnDate(dateString){
    let hoursWorked = 0;
    for(let i = 0;i < this.timeInEvents.length;i++){
        if(dateString == this.timeInEvents[i].date){
            hoursWorked = parseInt((this.timeOutEvents[i].hour)-(this.timeInEvents[i].hour))/100;
        }
} 
    return hoursWorked;
}
hoursWorkedOnDate.bind(employeeRecord);

function wagesEarnedOnDate(dateString){
    const payOwed = hoursWorkedOnDate.call(this, dateString) * this.payPerHour;
    return payOwed;
}
wagesEarnedOnDate.bind(employeeRecord);

function findEmployeeByFirstName(srcArray,firstName){
    for(let i = 0;i < srcArray.length;i++)
        if (srcArray[i].firstName == firstName){
            return srcArray[i]
        } else {
            return undefined;
        }
    }



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    console.log(this)
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
allWagesFor.bind(employeeRecord);

function calculatePayroll(employeeRecordsArray){
    let companyWagesArray = [];
    employeeRecordsArray.forEach(employeeRecord => {
        const amount = allWagesFor.call(employeeRecord)
        companyWagesArray.push(amount)
    })
    const companyPayOwed = companyWagesArray.reduce((a, b) => a + b, 0);
    return companyPayOwed;
}