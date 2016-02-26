var months = ["Jänner", "Februar", "März"];
var weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

var Clock = function (date) {
    this.year = date.getFullYear();
    this.day = date.getDate();
    this.hour = date.getHours();
    this.month = date.getMonth();
    this.dayOfWeek = date.getDay();

    if (this.hour<10) {
        this.hour = "0" + this.hour;
    }
    this.minutes = date.getMinutes();
    if (this.minutes < 10) {
        this.minutes = "0" + this.minutes;
    }
    this.seconds = date.getSeconds();
    if (this.seconds < 10) {
        this.seconds = "0" + this.seconds;
    }
    this.getDateString = function () {
        return weekdays[this.dayOfWeek] +
                ": " + this.day +
                " " + months[this.month] +
                " "+this.year;
    }
    this.getTimeString = function () {
        return this.hour + ":" + this.minutes + ":" + this.seconds;
    }
};