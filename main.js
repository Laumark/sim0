
var c = document.getElementById("simView");
var ctx = c.getContext("2d");

// Background

ctx.fillStyle = "#bbf2f1";
ctx.fillRect(0, 0, simSize, simSize);


function drawClunks() {
	var clunkSize = 10;
	for (var i = 0; i < allClunks.length; i++) {
		var x = allClunks[i].x * 10;
		var y = allClunks[i].y * 10;
		ctx.beginPath();
		ctx.fillStyle = clunkColors[allClunks[i].clunkType];
		ctx.fillRect(x, y, clunkSize, clunkSize);

	}
}


