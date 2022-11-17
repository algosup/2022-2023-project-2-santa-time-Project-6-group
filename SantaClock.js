
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





var Snowflake = (function() {

	var flakes;
	var flakesTotal = 40;
	var wind = 0;
	

	function Snowflake(size, x, y, vx, vy) {
		this.size = size;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.hit = false;
		this.div = document.createElement('div');
		this.div.classList.add('snowflake');
		this.div.style.width = this.size + 'px';
		this.div.style.height = this.size + 'px';
	}

	Snowflake.prototype.move = function() {

			this.x += this.vx + Math.min(Math.max(wind, -10), 10);
			this.y += this.vy;

		// Wrap the snowflake to within the bounds of the page
		if (this.x > window.innerWidth + this.size) {
			this.x -= window.innerWidth + this.size;
		}

		if (this.x < -this.size) {
			this.x += window.innerWidth + this.size;
		}

		if (this.y > window.innerHeight + this.size) {
			this.x = Math.random() * window.innerWidth;
			this.y -= window.innerHeight + this.size * 2;
		}

	};

	Snowflake.prototype.draw = function() {
		this.div.style.transform =
		this.div.style.MozTransform =
		this.div.style.webkitTransform =
			'translate3d(' + this.x + 'px' + ',' + this.y + 'px,0)';
	};

	function update() {
		for (var i = flakes.length; i--; ) {
			var flake = flakes[i];
			flake.move();
			flake.draw();
		}
		requestAnimationFrame(update);
	}

	Snowflake.init = function(container) {
		flakes = [];

		for (var i = flakesTotal; i--; ) {
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
    


	  
  	window.ondeviceorientation = function(event) {
	  	if (event) {
		  	wind = event.gamma / 10;
  		}
  	};
    
  	update();
	};

	return Snowflake;

}());

window.onload = function() {
  setTimeout(function() {
  	Snowflake.init(document.getElementById('snow'));
  }, 500);
}