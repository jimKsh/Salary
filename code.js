// initialize
let formCode = '';
for (i=0; i<31; i++){
    formCode += '<div class="day" id="day-'+(i+1)+'">';
    formCode += '<span class="dayNumber">'+(i+1)+'.</span>';
    formCode += '<span class="dayStart">מ:</span><input class="startTime" "data-day="'+(i+1)+'" type="time" onchange="checkDates('+(i+1)+')">';
    formCode += '<span class="dayEnd">עד:</span>   <input class="endTime" data-day="'+(i+1)+'" type="time" onchange="checkDates('+(i+1)+')">';
    formCode += '<span class="dayTotal">סה"כ</span>   <input class="totalTime" data-day="'+(i+1)+'" disabled>';
    formCode += '</div>';
}
document.getElementById('myForm').innerHTML = formCode;

// check dates validation
function checkDates(day){
    let startTime = document.getElementById('day-'+day).querySelector('input.startTime').value;
    let endTime = document.getElementById('day-'+day).querySelector('input.endTime').value;
    if ( startTime && endTime ){
        if ( startTime > endTime ) {
            document.getElementById('day-'+day).querySelector('input.totalTime').value = "";
            document.getElementById('day-'+day).classList.add('invalidDates');
        }
        else {
            document.getElementById('day-'+day).classList.remove('invalidDates');
            let startTimeHour = parseInt(startTime.slice(0, 2));
            let startTimeMin = parseInt(startTime.slice(3, 5));
            let endTimeHour = parseInt(endTime.slice(0, 2));
            let endTimeMin = parseInt(endTime.slice(3, 5));
            let timeDiff = (endTimeHour*60+endTimeMin)-(startTimeHour*60+startTimeMin);
            let timeDiffHour = (parseInt(timeDiff/60)>9)?parseInt(timeDiff/60):'0'+parseInt(timeDiff/60);
            let timeDiffMin = ((timeDiff%60)>9)?(timeDiff%60):'0'+(timeDiff%60);
            document.getElementById('day-'+day).querySelector('input.totalTime').value = timeDiffHour+':'+timeDiffMin;
        }
    }
}o

// calculate salary
function calculate(){
    // read salary by hour
    let salaryByHour = document.querySelector('input#salaryByHour').value;

    // check for valid 
    if (!salaryByHour || isNaN(salaryByHour)) {
        alert('אנא הכנס את גובה השכר לפי שעה');
        return;
    }
    else {
        salaryByHour = parseFloat(salaryByHour);
    }
    
    // calculate total minutes     
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

    // calculate total hours and salary
    let totalHour = totalMin / 60;
    let totalSalary = totalHour * salaryByHour;
    
    // output salary
    document.querySelector('input#salary').value = parseInt(totalSalary);
}