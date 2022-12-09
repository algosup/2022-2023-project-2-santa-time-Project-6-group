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