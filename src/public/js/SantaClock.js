var interval;

function SantaIsHere() {
	document.getElementById("here").style.display="block"
}

function Search(input) {
	if (!input || !input.includes(',')) {
		document.getElementById("errorMessage").style.display = "block"
	} else {
		if (interval === 'undefined') {
			InitInterval(input);
		} else {
			clearInterval(interval);
			InitInterval(input);

		}

	}
}
async function InitInterval(input) {
	var isFound = false
	if (input) {
		var city = input.split(",")[0]
		var postcode = input.split(",")[1]
		city = city.trim();
		city = city.replaceAll(' ', '-');
		postcode = postcode.trim();
		postcode = postcode.replaceAll(' ', '-');

		console.log(city, postcode)
		var longitude = async function connect(filters) {
			var city = 0.000000000;
			var fetching = await fetch("http://20.229.204.94/api?q=" + filters[0] + "/" + filters[1])
				.then(res => res.json())
				.then((responseData) => {
					// loop to search every through every city in API's link
					for (var i = 0; i < responseData.features.length; i++) {

						// if the city is found
						if (responseData.features[i].properties.postcode == filters[1]) {
							city = responseData.features[i].geometry.coordinates[0]
						}
					}
				}


				)
			return city
		}
		var location = await longitude([city, postcode])

		if (location != 0.000000000) {
			isFound = true
			
			interval = setInterval(function () {
				var RemainingTime = SantArrival(location)
				document.getElementById("remainingNumbers").innerHTML = RemainingTime[0] + " : " + RemainingTime[1] + " : " + RemainingTime[2] + " : " + RemainingTime[3]
				if (document.getElementById("remainingNumbers").innerHTML == "00 : 00 : 00 : 00") {
					SantaIsHere()
					clearInterval(interval);
				}
			}, 1000)

		} else {
			if (isFound == false) {
				document.getElementById("errorMessage").style.display = "block"
			} else {
				document.getElementById("errorMessage").style.display = "none"
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
function SolarTime(longitude) {
	var fractYear = getFractYear()
	var eqtime = 229.18 * (0.000075 + (0.001868 * Math.cos(fractYear)) - (0.032077 * Math.sin(fractYear)) - (0.014615 * Math.cos(2 * fractYear)) - (0.040849 * Math.sin(2 * fractYear)));
	time_offset = eqtime + 4 * longitude - 60
	date = new Date()


	tst = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60 + time_offset
	var tsth = parseInt(tst / 60)
	var tstm = parseInt(tst - (tsth * 60))
	var tsts = parseInt((tst - tstm - (tsth * 60)) * 60)

	return [tsth, tstm, tsts]
}

function SantArrival(longitude) {
	var st = SolarTime(longitude)
	var hours = 24 - (st[0])
	var minutes = 60 - st[1]
	var seconds = 60 - st[2]
	for (; seconds >= 60;) {
		seconds -= 60
		minutes++
	}
	var now = new Date();
	var start = new Date(now.getFullYear(), 0, 0);
	var day = Math.floor((now - start) / 1000 / 60 / 60 / 24);
	day = 358 - day

	return [day, hours, minutes, seconds]

}

// Change Language
function Language(language) {
	var santaMessage = document.getElementById("Message");
	var input = document.getElementById("userInput");
	var button = document.getElementById("button");
	var Remaining = document.getElementById("remainingDays");
	var feedback = document.getElementById("feedback")
	var error = document.getElementById("errorMessage")
	var hat = document.getElementById("hat")
	var example = document.getElementById("Example")
	switch (language) {
		case "FR":
			santaMessage.innerHTML = "Le père noël sera là dans:"
			input.placeholder = "Écrivez votre ville, votre code postal"

			button.innerHTML = "Rechercher"

			Remaining.innerHTML = "Jours : Heures : Minutes : Secondes"

			hat.src = "/img/French-Hat.png"

			feedback.innerHTML = "Donnez nous votre avis"

			error.innerHTML = "Nous n'avons pas trouvé votre ville, êtes vous sûr d'avoir utiliser le bon format?"
			example.innerHTML = "Exemple: Paris, 75000"
			break;
		case "UK":
			santaMessage.innerHTML = "Santa Claus will be there in"
			input.placeholder = "Write your city, postal code"

			button.innerHTML = "Search"

			Remaining.innerHTML = "Days : Hours : Minutes : Seconds"

			hat.src = "/img/hat.png"

			feedback.innerHTML = "Give us your feedback"

			error.innerHTML = "We can't find your city, are you sure you used the correct format?"
			example.innerHTML = "Example: Paris, 75000"


			break;
	}
}

var input = document.getElementById("userInput");
input.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		document.getElementById('errorMessage').style.display = 'none';
		Search(input.value)
	}

});
input.addEventListener("click", function () {
	document.getElementById('errorMessage').style.display = 'none';
})
input.oninput = function () {
	document.getElementById('errorMessage').style.display = 'none';
}
	// map function WIP
// 	function MapCoordinates(longitude, latitude){
// 		var map=document.getElementById("map")	

// 		var origin= [map.offsetLeft+map.width/2.15, map.offsetTop+map.width/1.70]
// 		//place 0°,0° on website's map
// 		var x=origin[0]
// 		var y=origin[1]

// 		var mapLonLeft = 9.8;
// 		var mapLonRight = 10.2;
// 		var mapLonDelta = mapLonRight - mapLonLeft;		
// 		var mapLatBottom = 53.45;
// 		var mapLatBottomDegree = mapLatBottom * Math.PI / 180;	


// 		//pin's position on map by using percentage and origin's position 
// 		var mercatorMax=20037508.3427892*2
// 		var x2=(latLong[1]*100)/mercatorMax
// 		var y2=(latLong[0]*100)/mercatorMax
// 		x2=x2*(origin[0])
// 		y2=y2*(origin[1])
// 	document.getElementById("test").style.left=x+"px"
// 	document.getElementById("test").style.top=y+"px"

// 	document.getElementById("test2").style.left=x2+"px"
// 	document.getElementById("test2").style.top=y2+"px"

// }
/*
origin + origin =100%
origin - origin =0%
lat = 180-> 0.5*origin*2
pour la long/lat:

long = -180 ->180
lat= -90->90
long/lat= long/lat -> 0->360 / 0->180 =100%
0.1 =

1: 2.400355675172844 47.08128689938308
SantaClock.js:232 2: 182.40035567517285 137.0812868993831
SantaClock.js:243 3: 50.66676546532579 76.15627049965727
*/
