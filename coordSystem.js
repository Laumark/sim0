function newClunk(xVal, yVal, clunkType) {
	clunks.push({x: xVal, y: yVal, clunkType});
}

var clunks = [];

// 0 water
// 1 grass

var clunkColors = [
	"#bbf2f1",
	"#32a852",
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
			newClunk(clunkCursorX, clunkCursorY, 1);
		} else if (r == 1) {
			var clunkCursorX = x + 1;
			var clunkCursorY = y;
			newClunk(clunkCursorX, clunkCursorY, 1);
		} else if (r == 2) {
			var clunkCursorX = x;
			var clunkCursorY = y + 1;
			newClunk(clunkCursorX, clunkCursorY, 1);
		} else {
			var clunkCursorX = x - 1;
			var clunkCursorY = y;
			newClunk(clunkCursorX, clunkCursorY, 1);
		}
	} else {
		clunkFailed = true;
	}
}

function isClunkFree(x, y) {
	for (var i = 0; i < clunks.length; i++) {
		if (x < 0 || x > simSize) return false;
		if (y < 0 || y > simSize) return false;
		if (clunks[i].x == x && clunks[i].y == y) {
			return false;
		}
	}
	return true;
}

function findClunkWithManyFriends() {

	var applicants = [];

	for (var i = 0; i < clunks.length; i++) {
		var x = clunks[i].x;
		var y = clunks[i].y;
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
			var thisClunk = clunks[i];
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

