let formCode = '';
for (i=0; i<31; i++){
    formCode += '<div class="day" id="day-'+(i+1)+'">';
    formCode += '<span class="dayNumber">'+(i+1)+'</span>';
    formCode += '<span class="dayStart">מ:</span><input class="startTime" "data-day="'+(i+1)+'" type="time" onchange="checkDates('+(i+1)+')">';
    formCode += '<span class="dayEnd">עד:</span>   <input class="endTime" data-day="'+(i+1)+'" type="time" onchange="checkDates('+(i+1)+')">';
    formCode += '<span class="dayTotal">סה"כ</span>   <input class="totalTime" data-day="'+(i+1)+'" type="time" disabled>';
    formCode += '<span class="alert"></span>';
    formCode += '</div>';
}
document.getElementById('myForm').innerHTML = formCode;

function checkDates(day){
    let startTime = document.getElementById('day-'+day).querySelector('input.startTime').value;
    let endTime = document.getElementById('day-'+day).querySelector('input.endTime').value;
    if ( startTime && endTime ){
        if ( startTime > endTime ) {
            document.getElementById('day-'+day).querySelector('.alert').innerHTML = "!!!!";
        }
        else {
            document.getElementById('day-'+day).querySelector('.alert').innerHTML = "";
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
}

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