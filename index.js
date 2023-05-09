const prompt = require('prompt-sync')();
const askDate = (message) => {
    const result = prompt(message);
    const date = new Date(result);
    if (date == 'Invalid Date' || result.split('-').length < 3 || result.split('-')[0].length < 4) {
        console.log('Date is wrong! Please give valid date (yyyy-mm-dd)')
        return askDate(message)
    }
    return date
}

const askEndDate = (message, startDate) => {
    const result = askDate(message);
    if (result <= startDate) {
        console.log('Your end date is before start date! Please insert date higher');
        return askEndDate(message, startDate);
    }
    return result;
}

const calculateWorkDays = (startDate, endDate) => {
    var workDays = 0;

    while(startDate < endDate){
        startDate.setDate(startDate.getDate() + 1);
        if(![0, 6].includes(startDate.getDay())){
            ++workDays ;
        }
    }
    return workDays
}

const askDayOff = (message) => {
    let dayOff = prompt(message)
    if (['undefined', undefined, false].includes(dayOff)) {
        return askDayOff(message);
    }
    if (dayOff == null || dayOff == 'null' || dayOff == '') dayOff = 0;

    if (isNaN(Number(dayOff))) {
        console.log("Wrong input! Please insert number only");
        return askDayOff(message);
    }
    console.log(`total dayoff ${dayOff}`);
    return dayOff;
}

let startDate = askDate('When is the start date (yyyy-mm-dd)? ');
let endDate = askEndDate('When is the end date (yyyy-mm-dd)? ', startDate);
let dayOff  = askDayOff('How many dayoff you plan to take? ');
const workDays = calculateWorkDays(startDate, endDate);
console.log(`Your working days are ${workDays - dayOff}`);