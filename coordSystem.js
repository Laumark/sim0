function newClunk(xVal, yVal, clunkType) {
	clunks.push({x: xVal, y: yVal, clunkType});
	allClunks.push({x: xVal, y: yVal, clunkType});
}

var clunks = [];
var allClunks = [];

// 0 water
// 1 grass
// 2 desert
// 3 dry grass
// 4 swamp

var clunkColors = [
	"#bbf2f1",
	"#32a852",
	"#f0bb4a",
	"#ded143",
	"#3b8048",
];


// newClunk(2, 7, 1);
// newClunk(4, 4, 1);
// newClunk(8, 2, 1);

function fillNearbyClunk(clunkIndex) {
	var x = clunks[clunkIndex].x;
	var y = clunks[clunkIndex].y;
	var n = isClunkFree(x, y - 1);
	var e = isClunkFree(x + 1, y);
	var s = isClunkFree(x, y + 1);
	var w = isClunkFree(x - 1, y);
	// console.log("n: " + n + ", e: " + e + ", s: " + s + ", w: " + w);
	var dirs = [n, e, s, w];
	var availability = false;
	for (var i = 0; i < dirs.length; i++) {
		if (dirs[i]) availability = true; 
	}
	// console.log("availability: " + availability);
	if (availability) {
		var r = Math.floor(Math.random() * 4);	
		// console.log("r is: " + r);	
		if (r == 0) {
			var clunkCursorX = x;
			var clunkCursorY = y - 1;
			newClunk(clunkCursorX, clunkCursorY, curBiome);
		} else if (r == 1) {
			var clunkCursorX = x + 1;
			var clunkCursorY = y;
			newClunk(clunkCursorX, clunkCursorY, curBiome);
		} else if (r == 2) {
			var clunkCursorX = x;
			var clunkCursorY = y + 1;
			newClunk(clunkCursorX, clunkCursorY, curBiome);
		} else {
			var clunkCursorX = x - 1;
			var clunkCursorY = y;
			newClunk(clunkCursorX, clunkCursorY, curBiome);
		}
	} else {
		clunkFailed = true;
	}
}

function isClunkFree(x, y) {
	for (var i = 0; i < allClunks.length; i++) {
		if (x < 0 || x > simSize) return false;
		if (y < 0 || y > simSize) return false;
		if (allClunks[i].x == x && allClunks[i].y == y) {
			return false;
		}
	}
	return true;
}

function findClunkWithManyFriends() {

	var applicants = [];

	var clunkList;
	if (clunks.length == 0) {
		clunkList = allClunks;
	} else {
		clunkList = clunks;
	}

	for (var i = 0; i < clunkList.length; i++) {
		var x = clunkList[i].x;
		var y = clunkList[i].y;
		var n = isClunkFree(x, y - 1);
		var e = isClunkFree(x + 1, y);
		var s = isClunkFree(x, y + 1);
		var w = isClunkFree(x - 1, y);	
		var dirs = [n, e, s, w];
		var friends = 0;
		for (var j = 0; j < dirs.length; j++) {
			if (!dirs[j]) {
				friends++; 
			}
		}	
		// console.log("friends: " + friends);
		if (friends < 4) {
			var thisClunk = clunkList[i];
			applicants.push({clunk: thisClunk, pop: friends, index: i});
		}
	}

	var bestApplicant = applicants[0];
	var attemps = 100;
	for (var i = 0; i < applicants.length; i++) {
		if (applicants[i].friends > bestApplicant.friends) {
			bestApplicant = applicants[i];
		} else if (applicants[i].friends == bestApplicant.friends && attemps > 0) {
			if (Math.random() > 0.75) {
				bestApplicant = applicants[i];
			}
			// attemps--;
		}
	}

	return bestApplicant.index;
}

