var leftContainer = document.getElementsByClassName("left-container")[0];
var boat = document.getElementsByClassName("boat")[0];
var rightContainer = document.getElementsByClassName("right-container")[0];

let count = {
	leftContainer: {
		missionaries: 0,
		cannibals: 0,
		isDisable: false,
	},
	boat: {
		missionaries: 0,
		cannibals: 0,
		isDisable: false,
	},
	rightContainer: {
		missionaries: 3,
		cannibals: 3,
		isDisable: false,
	},
};

const check = () => {
	const totalLeftMissonaries = count.leftContainer.missionaries + (boat.classList.contains("move-left") ? count.boat.missionaries : 0);
	const totalLeftCannibals = count.leftContainer.cannibals + (boat.classList.contains("move-left") ? count.boat.cannibals : 0);
	const totalRightMissonaries = count.rightContainer.missionaries + (boat.classList.contains("move-right") ? count.boat.missionaries : 0);
	const totalRightCannibals = count.rightContainer.cannibals + (boat.classList.contains("move-right") ? count.boat.cannibals : 0);

	if ((totalLeftCannibals > 0 && totalLeftCannibals < totalLeftMissonaries) || (totalRightCannibals > 0 && totalRightCannibals < totalRightMissonaries)) {
		alert("Game Over");
		window.location.reload();
	}

	if (count.leftContainer.missionaries + count.leftContainer.cannibals === 6) {
		alert("You won");
		window.location.reload();
	}
};

const addClick = (div, container) => {
	div.addEventListener("click", e => {
		if (div.classList.contains("disable")) return;

		let missional;
		if (div.classList.contains("missionary")) missional = "missionaries";
		else missional = "cannibals";

		if (container === leftContainer) {
			count.leftContainer[missional]--;
			count.boat[missional]++;
		} else if (container === rightContainer) {
			count.rightContainer[missional]--;
			count.boat[missional]++;
		} else {
			count.boat[missional]--;
			if (boat.classList.contains("move-right")) count.rightContainer[missional]++;
			else count.leftContainer[missional]++;
		}
		e.stopPropagation();
		configueMissionals();
	});
};

const configueMissionals = () => {
	leftContainer.innerHTML = "";
	boat.innerHTML = "";
	rightContainer.innerHTML = "";

	if (count.boat.cannibals + count.boat.missionaries > 0 && count.boat.cannibals + count.boat.missionaries < 3) boat.classList.remove("disable");
	else boat.classList.add("disable");

	if (count.boat.cannibals + count.boat.missionaries == 2) {
		count.leftContainer.isDisable = true;
		count.rightContainer.isDisable = true;
	} else {
		if (boat.classList.contains("move-right")) {
			count.leftContainer.isDisable = true;
			count.rightContainer.isDisable = false;
		} else {
			count.rightContainer.isDisable = true;
			count.leftContainer.isDisable = false;
		}
	}

	Object.entries(count).forEach(([key, value]) => {
		for (let i = 0; i < value.missionaries; ++i) {
			const div = document.createElement("div");
			div.classList.add("missionary");
			addClick(div, window[key]);
			if (value.isDisable) div.classList.add("disable");
			window[key].appendChild(div);
		}
		for (let i = 0; i < value.cannibals; ++i) {
			const div = document.createElement("div");
			div.classList.add("cannibal");
			addClick(div, window[key]);
			if (value.isDisable) div.classList.add("disable");
			window[key].appendChild(div);
		}
	});

	setTimeout(() => {
		check();
	}, 200);
};

boat.addEventListener("click", () => {
	if (boat.classList.contains("disable")) return;

	boat.classList.add("disable");
	setTimeout(() => {
		boat.classList.remove("disable");
	}, 500);

	if (boat.classList.contains("move-right")) {
		boat.classList.replace("move-right", "move-left");
	} else if (boat.classList.contains("move-left")) {
		boat.classList.replace("move-left", "move-right");
	}

	setTimeout(() => {
		configueMissionals();
	}, 500);
});

window.onload = () => {
	configueMissionals();
};
