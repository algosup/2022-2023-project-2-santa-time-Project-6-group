
var address = {
    address1: { addressName: "28 rue Jean Baptiste Leclerc", longitude: 2.42957, Country: "France", timezone: 1 },
    address2: { addressName: "15 Rue Neuve", longitude: 4.35456, Country: "Belgium", timezone: 1 },
    address3: { addressName: "Allée George Charpak", longitude: 2.07118, Country: "France", timezone: 1 }
};

function Search(input) {
    if (!input) {
        alert('Please, enter a location in this format : "address, country "')
    } else {
        for (const location in address) {
            var name=input.split(", ")[0]
            var country=input.split(", ")[1]
            
            if (name == address[location].addressName && country ==address[location].Country) {
                setInterval(function () {
                    var RemainingTime = SantArrival(address[location].longitude, address[location].timezone)
                    document.getElementById("remaining").innerHTML =RemainingTime[0]+" days "+ RemainingTime[1] + "h : " + RemainingTime[2] + "m : " + RemainingTime[3] + "s"
                }, 1000)
            }
        }
        if(document.getElementById('time').innerHTML=="HH, MM, SS"){
            alert("Incorrect or unknown adress, please, enter a location in this format : address, country")
        }
    }
}
var input = document.getElementById("input");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    Search(input.value)
  }
});
function getFractYear() {
    var fractYear;
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var day = Math.floor((now - start) / 1000 / 60 / 60 / 24);
    var year = now.getFullYear();
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        fractYear = ((2 * Math.PI) / 366) * (day - 1 + (now.getHours() - 12) / 24);
    } else {
        fractYear = ((2 * Math.PI) / 365) * (day - 1 + (now.getHours() - 12) / 24);
    }
    return fractYear
}
function SolarTime(longitude, timezone) {
    var fractYear = getFractYear()
    var eqtime = 229.18 * (0.000075 + (0.001868 * Math.cos(fractYear)) - (0.032077 * Math.sin(fractYear)) - (0.014615 * Math.cos(2 * fractYear)) - (0.040849 * Math.sin(2 * fractYear)));
    time_offset = eqtime + 4 * longitude - 60 * timezone
    date = new Date()


    tst = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60 + time_offset
    var tsth = parseInt(tst / 60)
    var tstm = parseInt(tst - (tsth * 60))
    var tsts = parseInt((tst - tstm - (tsth * 60)) * 60)
    return [tsth, tstm, tsts]
}
function SantArrival(longitude, timezone) {
    var st=SolarTime(longitude,timezone)
    var hours= 24-(st[0])
    var minutes= 60 - st[1]
    var seconds= 60-st[2]
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var day = Math.floor((now - start) / 1000 / 60 / 60 / 24);
    day = 358-day
    
    return [day, hours, minutes, seconds]

}

