import moment from "moment/moment";

export function timeCheckin(currentDateTime) {
    const defaultTime = moment('08:00:00', 'HH:mm:ss');
    const checkInTime = moment(String(currentDateTime), 'HH:mm:ss')
    const lateDuration = moment.duration(checkInTime.diff(defaultTime));
    let hoursLate = lateDuration.hours();
    let minutesLate = lateDuration.minutes();
    if(hoursLate < 0) hoursLate = 0
    if(minutesLate < 0) minutesLate = 0
    // const formattedLateTime = `${String(hoursLate).padStart(2, '0')}:${String(minutesLate).padStart(2, '0')}`;
    return `${hoursLate} giờ ${minutesLate} phút`
}

export function timeCheckout(timeCheckout) {
    const defaultTime = moment('17:00:00', 'HH:mm:ss');
    const checkInTime = moment(String(timeCheckout), 'HH:mm:ss')
    const lateDuration = moment.duration(defaultTime.diff(checkInTime));
    let hoursLate = lateDuration.hours();
    let minutesLate = lateDuration.minutes();
    if(hoursLate < 0) hoursLate = 0
    if(minutesLate < 0) minutesLate = 0
    return `${hoursLate} giờ ${minutesLate} phút`
}