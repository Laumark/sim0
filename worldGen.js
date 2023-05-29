
var startX = Math.floor(Math.random() * startRangeMax) + startRangeMin;
var startY = Math.floor(Math.random() * startRangeMax) + startRangeMin;

// newClunk(startX, startY, 1);
// newClunk(startX + 1, startY, 1);
// newClunk(startX - 1, startY, 1);
// newClunk(startX, startY + 1, 1);
// newClunk(startX, startY - 1, 1);

// fillNearbyClunk(0);

var clunkCursorX = startX;
var clunkCursorY = startY;
var clunkFailed = false;
var clunkCount = 0;
var curClunk = 0;
var curBiome = 1;

function generateBiome() {

	clusters--;

	startX = Math.floor(Math.random() * startRangeMax) + startRangeMin;
	startY = Math.floor(Math.random() * startRangeMax) + startRangeMin;

	var startClunk = isClunkFree(
		startX,
		startY
	);

	if (!startClunk) {
		console.log("start clunk tile was blocked at: X" + startX + ", Y" + startY);
		clusters++;
		generateBiome();
		return;
	}

	curBiome = Math.floor(Math.random() * clunkColors.length) + 1;
	clusterSize = Math.floor(Math.random() * 500) + 300;

	console.log("new clunk at: " + startX + ", " + startY);
	newClunk(startX, startY, curBiome);

	for (var i = 0; i < clusterSize; i++) {
		fillNearbyClunk(curClunk);
		if (clunkFailed) {
			clunkFailed = false;
			curClunk = findClunkWithManyFriends();
		} else {
			clunkCount++;
			curClunk = clunkCount;
		}
		drawClunks();
		// generateClunk();
	}

	clunkCount = 0;
	curClunk = 0;
	clunks = [];

	if (clusters > 0) {
		generateBiome();
	}
}

// function generateClunk() {
// 	setTimeout(function() {
// 		fillNearbyClunk(curClunk);
// 		if (clunkFailed) {
// 			clunkFailed = false;
// 			curClunk = findClunkWithManyFriends();
// 		} else {
// 			clunkCount++;
// 			curClunk = clunkCount;
// 		}
// 		drawClunks();
// 	}, 5);
// }

generateBiome();

// console.log("clunkCount: " + clunkCount);