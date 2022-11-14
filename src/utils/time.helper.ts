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