export const getTimeMinutes = (time: string | number | Date) =>
{
    const newTime =  new Date(time);
    let hour    = newTime.getHours();
    let minute: string | number = newTime.getMinutes();

    hour %= 24;
    hour = hour || 24;
    minute = minute < 10 ? `0${minute}` : minute;

    return `${hour}:${minute}`;
}

export const getTimeFormat  = (time: string | number | Date) =>
{
    const newTime =  new Date(time);
    let year: number | string   = newTime.getFullYear();
    let month: number | string   = newTime.getMonth() + 1;
    let day: number | string     = newTime.getDate();
    let hour: number | string    = newTime.getHours();
    let minute: number | string  = newTime.getMinutes();
    let second: number | string  = newTime.getSeconds();

    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'

    if(day < 10) {day = '0' + day}
    if(hour < 10) {hour = '0' + hour}
    if(minute < 10) {minute = '0' + minute}
    if(second < 10) {second = '0' + second}
    if(month < 10) {month = '0' + month}

    return month + "/" + day + '/' +  year + ' ' + hour + ':' + minute + ':' + second + " " + ampm;
}

export const getHoursMinutes = (second: number) =>
{
    const t = Math.floor(second)
    const seconds = t % 60
    const minutes = Math.floor(second / 60) % 60
    const hours = Math.floor(second / 3600) % 24
    const days = Math.floor(second / 3600 / 24)

    if (days > 0) 
    {
        return (days + "d " + hours + "h " + minutes + "m " + seconds + "s");
    }
    if (hours > 0) 
    {
        return (hours + "h " + minutes + "m " + seconds + "s");
    }
    if (minutes > 0) 
    {
        return (minutes + "m " + seconds + "s");
    }
    return (seconds + "s");

}