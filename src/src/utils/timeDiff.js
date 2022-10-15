export const hoursDiff = (startTime, endTime) => {
    let startTimeHour = parseInt(startTime.slice(0, 2));
    let startTimeMin = parseInt(startTime.slice(3, 5));
    let endTimeHour = parseInt(endTime.slice(0, 2));
    let endTimeMin = parseInt(endTime.slice(3, 5));
    return (endTimeHour*60+endTimeMin)-(startTimeHour*60+startTimeMin);
}

export const minutesToDuration = (minutes) => {
    let timeDiffHour = (parseInt(minutes/60)>9)?parseInt(minutes/60):'0'+parseInt(minutes/60);
    let timeDiffMin = ((minutes%60)>9)?(minutes%60):'0'+(minutes%60);
    return timeDiffHour+':'+timeDiffMin;
}