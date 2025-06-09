const date = new Date();
console.log(typeof(date));
console.log(date);

const date2 = new Date()+new Date().toDateString();
console.log(date2);

// var currentTime = new Date();
// var currentOffset = currentTime.getTimezoneOffset();

// var ISTOffset = 330;   // IST offset UTC +5:30 
// var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

// var hoursIST = ISTTime.getHours()
// var minutesIST = ISTTime.getMinutes()

// console.log(hoursIST+":"+minutesIST);

const data = [
    { name: 'Event 1', date: "2024-12-23T15:17:38.963Z" },
    { name: 'Event 2', date: "2024-12-12T18:30:00.000Z" },
    { name: 'Event 3', date: "2024-12-21T18:30:00.000Z" }
];

// Sorting the array based on the 'date' property
data.sort((a, b) => (a.date > b.date  ? 1 : a.date<b.date ? -1 : 0));

console.log(typeof(data));
console.log(data);

console.log(typeof(data[0].date));
// console.log(data[0].date.toDateString());

const formatDateISO = (date) => {
    // Convert the date to ISO string
    const isoString = date.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split("T")[0];
    return formattedDate;
};

// Example usage
const currentDate = new Date();
console.log(formatDateISO(currentDate)); // Output: yyyy-mm-dd
