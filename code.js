

function calculate(){
    let salaryByHour = parseInt(document.querySelector('input#salaryByHour').value);
    
    let totalMin = 0;
    for (var day=1; day<32; day++){
        let startTime = document.getElementById('day-'+day).querySelector('input.startTime').value;
        let endTime = document.getElementById('day-'+day).querySelector('input.endTime').value;
        if ( startTime && endTime ){
            if ( startTime <= endTime ) {
                let startTimeHour = parseInt(startTime.slice(0, 2));
                let startTimeMin = parseInt(startTime.slice(3, 5));
                let endTimeHour = parseInt(endTime.slice(0, 2));
                let endTimeMin = parseInt(endTime.slice(3, 5));
                let timeDiff = (endTimeHour*60+endTimeMin)-(startTimeHour*60+startTimeMin);
                totalMin += timeDiff; 
            }
        }
    }
    let totalHour = totalMin / 60;
    let totalSalary = totalHour * salaryByHour;
    
    document.querySelector('input#salary').value = parseInt(totalSalary);
}