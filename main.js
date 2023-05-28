var c = document.getElementById("simView");
var ctx = c.getContext("2d");

//Background

ctx.fillStyle = "#bbf2f1";
ctx.fillRect(0, 0, 800, 800);

function drawClunks() {
	var clunkSize = 10;
	for (var i = 0; i < clunks.length; i++) {
		var x = clunks[i].x * 10;
		var y = clunks[i].y * 10;
		ctx.beginPath();
		ctx.fillStyle = "#32a852";
		ctx.fillRect(x, y, clunkSize, clunkSize);

	}
}

drawClunks();
