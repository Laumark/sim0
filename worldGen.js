var startRangeMin = 20;
var startRangeMax = 40;
// var clusters = Math.floor(Math.random() * 12) + 6;

var clusterSize = Math.floor(Math.random() * 1000) + 500;
console.log("clusterSize: " + clusterSize);

var startX = Math.floor(Math.random() * startRangeMax) + startRangeMin;
var startY = Math.floor(Math.random() * startRangeMax) + startRangeMin;

console.log("startX: " + startX);

newClunk(startX, startY, 1);
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

for (var i = 0; i < clusterSize; i++) {
	fillNearbyClunk(curClunk);
	if (clunkFailed) {
		clunkFailed = false;
		curClunk = findClunkWithManyFriends();
	} else {
		clunkCount++;
		curClunk = clunkCount;
	}
}

console.log("clunkCount: " + clunkCount);