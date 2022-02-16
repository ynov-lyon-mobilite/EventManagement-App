export function displayDate(date){
    let newDate = date;
    if(!(newDate instanceof Date)) newDate = new Date(newDate);
    return newDate.toLocaleDateString();
}

// const app = document.getElementById("startDate");
// startDate = displayDate(app.textContent);
// startDate += "AHHHHH";
// console.log(startDate)

window.onload = function() {
    // let newDate = date;
    // if(!(newDate instanceof Date)) newDate = new Date(newDate);
    // newDate = newDate.toLocaleDateString();

    // const app = document.getElementById("startDate");
    // startDate = displayDate(app.textContent);
    // startDate += "AHHHHH";
    // console.log(startDate)
  };