
document.addEventListener('DOMContentLoaded', function() {
	
	function drawTable(x,y) {
		const table = document.createElement("table");
		table.id = "table";
		const tablePartDiv = document.getElementById("tablePartDiv");
		tablePartDiv.appendChild(table);
		for (let i=1; i <= y; i++) {
					const tr = table.appendChild(document.createElement("tr"));
						for (let j=1; j <= x; j++) {
							const td = tr.appendChild(document.createElement("td"));
							td.classList.add("tdBgColor");
							td.setAttribute("data-color", "");
						}
		}
	}
	
	drawTable(4,3);
	
	function addListenetrs() { 
		const smallTable = document.getElementById("mala");
		const largeTable = document.getElementById("duza");
		const resetButton = document.getElementById("button");
		
		// Zmiana tablicy na mniejsza
		smallTable.addEventListener("click", function (){
			const colorsTabSmall = ["#ff0000", "#8a0000", "#ffa2f5", "#ee00d5", "#640059", "#b187ff",   "#ff0000", "#8a0000", "#ffa2f5", "#ee00d5", "#640059", "#b187ff",];
			const getTable = document.getElementById("table");
			getTable.parentNode.removeChild(table)
			drawTable(4,3);
			drawPictures(colorsTabSmall);
			colorClick();
		})
		// Zmiana tablicy na wieksza
		largeTable.addEventListener("click", function (){
			const colorsTabLarge = ["#ff0000", "#8a0000", "#ffa2f5", "#ee00d5", "#640059", "#b187ff", "#81acfb", "#00049e", "#47f3fe", "#007178", "#000000", "#00563f", "#28ff60", "#dcfc01", "#fca001",   "#ff0000", "#8a0000", "#ffa2f5", "#ee00d5", "#640059", "#b187ff", "#81acfb", "#00049e", "#47f3fe", "#007178", "#000000", "#00563f", "#28ff60", "#dcfc01", "#fca001" ];
			const getTable = document.getElementById("table");
			getTable.parentNode.removeChild(table)
			drawTable(6,5);
			drawPictures(colorsTabLarge);
			colorClick();
		})
		// Reset gry
		resetButton.addEventListener("click", resetGame);
	}
	
	addListenetrs();
	
	function drawPictures(arr) {
		//console.log(arr);
		const allTd = document.getElementsByTagName("td"); //powtorzony
		for (let i=0; i < allTd.length; i++ ) {
				let randomColor = Math.floor(Math.random() * arr.length);
				let tdColors = allTd[i].setAttribute("data-color", arr[randomColor]);
				arr.splice(randomColor, 1);
			} 
	}
	
	drawPictures(["#ff0000", "#8a0000", "#ffa2f5", "#ee00d5", "#640059", "#b187ff",   "#ff0000", "#8a0000", "#ffa2f5", "#ee00d5", "#640059", "#b187ff"]);
	
	function showColor(e) {
		const clicked = document.getElementsByName("clicked");
		const animation = document.getElementsByClassName("animation");
		const allTd = document.getElementsByTagName("td");	//powtorzony
			// Block click on invisible colors
				if (e.target.closest("td").classList.contains("invisible")) {
					return;
				}
			// Show colors
				if (clicked.length < 2) {
					const color = e.target.closest("td").getAttribute("data-color");
					//console.log(e.target.closest("td"));
					e.target.closest("td").style.backgroundColor = color;
					e.target.closest("td").setAttribute("name", "clicked");
					}
			// Hide colors
				if (clicked.length == 2) {
					for ( let i=0; i < allTd.length; i++) { 
						allTd[i].removeEventListener("click", showColor);
					}
					setTimeout(function() {
						if (clicked[0].getAttribute("data-color") == clicked[1].getAttribute("data-color")) {
							for (let i=0; i < 2; i++) {
								clicked[i].classList.add("invisible");
							}
						// Check result
							if (document.getElementsByClassName("invisible").length == allTd.length) {
								result();
							}
						}
						for (let i=0; i < 2; i++) { 
							clicked[0].removeAttribute("style");
							clicked[0].removeAttribute("name");
						}
						for ( let i=0; i < allTd.length; i++) { 
							allTd[i].addEventListener("click", showColor);
						}					
					}, 500 );
				}
	}
	
	function result(){
		let result = document.getElementById("result");
		result.innerText = "WYGRANA!";
	}
	
	function colorClick() {
		const allTd = document.getElementsByTagName("td");	//powtorzony
		for ( let i=0; i < allTd.length; i++) { 
			allTd[i].addEventListener("click", showColor) 
	}	}
	
	colorClick();	
	
	function resetGame() {
		const allTd = document.getElementsByTagName("td");	//powtorzony
		let result = document.getElementById("result"); // powtorzony
		for (let i=0; i < allTd.length; i++) { 
			allTd[i].classList.remove("invisible");
		}
		result.innerText = "";
		if (document.getElementById("mala").checked) { 
			drawPictures(["#ff0000", "#8a0000", "#ffa2f5", "#ee00d5", "#640059", "#b187ff",   "#ff0000", "#8a0000", "#ffa2f5", "#ee00d5", "#640059", "#b187ff"]);
		}
		if (document.getElementById("duza").checked) { 
			drawPictures(["#ff0000", "#8a0000", "#ffa2f5", "#ee00d5", "#640059", "#b187ff", "#81acfb", "#00049e", "#47f3fe", "#007178", "#000000", "#00563f", "#28ff60", "#dcfc01", "#fca001",   "#ff0000", "#8a0000", "#ffa2f5", "#ee00d5", "#640059", "#b187ff", "#81acfb", "#00049e", "#47f3fe", "#007178", "#000000", "#00563f", "#28ff60", "#dcfc01", "#fca001"]);
		}
	}
	
});