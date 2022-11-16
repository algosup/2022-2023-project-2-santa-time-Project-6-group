
var adress = {
    adress1: { adressName: "28 rue Jean Baptiste Leclerc", longitude: 2.42957, Country: "France", timezone: 1 },
    adress2: { adressName: "15 Rue Neuve", longitude: 4.35456, Country: "Belgium", timezone: 1 },
    adress3: { adressName: "Allée George Charpak", longitude: 2.07118, Country: "France", timezone: 1 }
};

function Search(input) {
    if (!input) {
        alert('please, enter a location in this format : "Adress, Country "')
    } else {
        for (const location in adress) {
            if (input == adress[location].adressName) {
                setInterval(function () {
                    var time = SolarTime(adress[location].longitude, adress[location].timezone)
                    document.getElementById("test").innerHTML = time[0] + "h : " + time[1] + "m : " + time[2] + "s"
                }, 1000)

            }
        }
    }
}

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
function SantArrival(pos) {
    var fractYear = getFractYear()
    var crd = pos.coords
    var eqtime = 229.18 * (0.000075 + (0.001868 * Math.cos(fractYear)) - (0.032077 * Math.sin(fractYear)) - (0.014615 * Math.cos(2 * fractYear)) - (0.040849 * Math.sin(2 * fractYear)));
    time_offset = eqtime + 4 * crd.longitude - 60
    year = new Date()
    date = new Date(year.getFullYear(), 11, 25, 0, 0, 0)

    tst = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60 + time_offset
    var tsth = parseInt(tst / 60)
    var tstm = parseInt(tst - (tsth * 60))
    var tsts = parseInt((tst - tstm - (tsth * 60)) * 60)
    var array = new Array(3);
    array[0] = tsth
    array[1] = tstm
    array[2] = tsts
    return array
}

