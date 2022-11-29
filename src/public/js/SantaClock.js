
var address = {
	address1: { addressName: "28 rue Jean Baptiste Leclerc", longitude: 2.42957, Country: "France", timezone: 1 },
	address2: { addressName: "15 Rue Neuve", longitude: 4.35456, Country: "Belgium", timezone: 1 },
	address3: { addressName: "Allée George Charpak", longitude: 2.07118, Country: "France", timezone: 1 },
	address4: { addressName: "Aubigny", longitude: 2.4401326746767062, Country: "FR", timezone: 1 },
	address5: { addressName: "Bourges", longitude: 2.400355675172844,latitude:47.08128689938308,  Country: "FR", timezone: 1 },
	address6: { addressName: "Ouelen", longitude: -169.81217717912574,latitude: 66.1653823669088, Country: "Russia", timezone: 1 },
	address7: { addressName: "test", longitude:10.069208039834148,latitude: 2.045227812481695, Country: "test", timezone: 1 }
};
var interval;
function Search(input) {
	if (!input) {
		alert('Please, enter a location in this format : "address, country "')
	} else {
		if (interval === 'undefined') {
			InitInterval(input);
		} else {
			clearInterval(interval);
			InitInterval(input);

		}

	}
}


function InitInterval(input) {
	for (const location in address) {
		var name = input.split(", ")[0]
		var country = input.split(", ")[1]
		if (name == address[location].addressName && country == address[location].Country) {
			interval = setInterval(function () {
				var RemainingTime = SantArrival(address[location].longitude, address[location].timezone)
				document.getElementById("remaining").innerHTML = RemainingTime[0] + " : " + RemainingTime[1] + " : " + RemainingTime[2] + " : " + RemainingTime[3]
				MapCoordinates(address[location].longitude, address[location].latitude)
			}, 1000)
		}
	}

}

var input = document.getElementById("input");
input.addEventListener("keypress", function (event) {
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
	var st = SolarTime(longitude, timezone)
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





var Snowflake = (function () {

	var flakes;
	var flakesTotal = 70;
	var wind = 0;


	function Snowflake(size, x, y, vx, vy) {
		this.size = size;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.hit = true;
		this.div = document.createElement('div');
		this.div.classList.add('snowflake');
		this.div.style.width = this.size + 'px';
		this.div.style.height = this.size + 'px';
	}

	Snowflake.prototype.move = function () {

		this.x += this.vx + Math.min(Math.max(wind, -10), 10);
		this.y += this.vy;

		// Wrap the snowflake to within the bounds of the page
		if (this.x > window.innerWidth + this.size) {
			this.x -= window.innerWidth + this.size;
		}

		if (this.x < this.size) {
			this.x += window.innerWidth + this.size;
		}
		if (this.y > window.innerHeight + this.size * 23) {
			this.x = Math.random() * window.innerWidth;
			this.y -= window.innerHeight + this.size * 20;
		}

	};

	Snowflake.prototype.draw = function () {
		this.div.style.transform =
			this.div.style.MozTransform =
			this.div.style.webkitTransform =
			'translate3d(' + this.x + 'px' + ',' + this.y + 'px,0)';
	};

	function update() {
		for (var i = flakes.length; i--;) {
			var flake = flakes[i];
			flake.move();
			flake.draw();
		}
		requestAnimationFrame(update);
	}

	Snowflake.init = function (container) {
		flakes = [];

		for (var i = flakesTotal; i--;) {
			var size = (Math.random() + 0.2) * 12 + 1;
			var flake = new Snowflake(
				size,
				Math.random() * window.innerWidth,
				Math.random() * window.innerHeight,
				Math.random() - 0.5,
				size * 0.3
			);
			container.appendChild(flake.div);
			flakes.push(flake);
		}


		window.ondeviceorientation = function (event) {
			if (event) {
				wind = event.gamma / 10;
			}
		};

		update();
	};

	return Snowflake;

}());

window.onload = function () {
	setTimeout(function () {
		Snowflake.init(document.getElementById('snow'));
	}, 500);
}

// Change Language
function Language(language) {
	var text1 = document.getElementById("text1");
	var text2 = document.getElementById("text2");
	var input = document.getElementById("input");
	var button = document.getElementById("buttonText");
	var days = document.getElementById("Days");
	var hours = document.getElementById("Hours");
	switch (language) {
		case "FR":
			text1.innerHTML = "Entrez une adresse postale ici:"
			text2.innerHTML = "Le père noël arrive dans:"
			input.placeholder = "adresse postale, Pays"

			button.innerHTML = "Rechercher"
			button.style.marginLeft = "0%"
			document.getElementById("buttonIMG").style.marginLeft = "3%"
			document.getElementById("buttonIMG").style.maxWidth="25%"

			days.innerHTML = "Jours"
			hours.innerHTML = "Heures"
			break;
		case "UK":
			text1.innerHTML = "Enter a postal address here:"
			text2.innerHTML = "Santa will be there in:"
			input.placeholder = "Postal code, country"

			button.innerHTML = "Search"
			button.style.marginLeft = "10%"
			document.getElementById("buttonIMG").style.marginLeft = "10%"
			document.getElementById("buttonIMG").style.maxWidth="30%"

			days.innerHTML = "Days"
			hours.innerHTML = "Hours"
			break;
		}
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

		
// 		console.log("lat originiale="+latitude)
// 		console.log("lat="+latLong[1])
// 		//pin's position on map by using percentage and origin's position 
// 		var mercatorMax=20037508.3427892*2
// 		var x2=(latLong[1]*100)/mercatorMax
// 		var y2=(latLong[0]*100)/mercatorMax
// 		console.log("%="+y2)
// 		x2=x2*(origin[0])
// 		y2=y2*(origin[1])
// 		console.log("pos="+y2+"pos origin="+origin[1])
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
