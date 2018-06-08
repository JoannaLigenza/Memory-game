
document.addEventListener('DOMContentLoaded', function() {
	
	const allTd = document.getElementsByTagName("td");	
	let result = document.getElementById("result"); 
	const clicked = [];
	const invisible = [];
	const clickNumber = [];
	const smallTable = document.getElementById("mala");
	const largeTable = document.getElementById("duza");
	const resetButton = document.getElementById("button");
	const colorsTab = ["red", "blue", "green", "yellow", "oragne", "rose", "lila", "sea", "green2", 
							"pink", "purple", "creme", "gray", "bronze", "green3"];
							
	
	// Function draw table
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
						}
		}
	}

	
	function addListenetrs() { 		
		smallTable.addEventListener("click", function() {makeTable(4,3)});
		largeTable.addEventListener("click", function() {makeTable(6,5)});
		// Reset game
		resetButton.addEventListener("click", function() {resetGame()});
	}
	
	// Draw table
	function makeTable(a,b) {
		const getTable = document.getElementById("table");
		getTable.parentNode.removeChild(table)
		drawTable(a,b);
		drawPictures(randomTab((a*b)/2));
		colorClick();
		result.innerText = "";
	}
	
	// Add colors to td
	function drawPictures(arr) {
		for (let i=0; i < allTd.length; i++ ) {
				let randomColor = Math.floor(Math.random() * arr.length);
				const color = allTd[i].classList.add(arr[randomColor]);
				arr.splice(randomColor, 1);
			} 
	}
	
	// How much color should be in array with colors
	function randomTab(z) {
		let temp = colorsTab.slice(0,z).concat(colorsTab.slice(0,z));
		return temp;
	}
	
	// Show and hide colors when click on td
	function showColor(td) {
		clickNumber.push(1);
			// Block click on invisible colors
				if (td.classList.contains("invisible")) {
					return;
				}
			// Check click number - block more than two click
				if (clickNumber.length > 2) {
					return;
				}
			// Show colors
				if (clicked.length < 2) {
					td.classList.remove("tdBgColor");
					td.setAttribute("name", "clicked");
					clicked.push(td);
					if (clicked[0] == clicked[1] ) {	// If some td was clicked twice, then last click is remove
						clicked.splice(1,1);
						clickNumber.length = 1;
					}
				} 
			// Hide colors
				if (clicked.length == 2) {
					setTimeout(function() {
						sleep(clicked, td)
					}, 500);
			return;	
				}
	}
	
	function sleep(clicked, td) {
			// Check if two clicked td colors are the same
			if (clicked[0].className == clicked[1].className) {
				for (let i=0; i < 2; i++) {
					clicked[i].className = "";
					clicked[i].classList.add("invisible");
					invisible.push(1);
				}
				// Check result
				if (invisible.length == allTd.length) {
					showWin("WYGRANA!");
				}
			} 
			// Hide colors
			for (let i=0; i < 2; i++) { 
				clicked[i].classList.add("tdBgColor");
				clicked[i].removeAttribute("name");
			}	
			clicked.splice(0,2);
			clickNumber.splice(0,clickNumber.length);
		}	
	
	// Result function
	function showWin(textt){
		result.innerText = textt;
	}
	
	// Check if td was clicked
	function colorClick() {
		for ( let i=0; i < allTd.length; i++) { 
			allTd[i].addEventListener("click", function() {showColor(allTd[i])});  
	}	}	
	
	// Reset game function
	function resetGame() {
		for (let i=0; i < allTd.length; i++) { 
			allTd[i].classList.remove("invisible");
		}
		result.innerText = "";
		if (smallTable.checked) { 
			makeTable(4,3);
		}
		if (largeTable.checked) { 
			makeTable(6,5);
		}
	}
	
	drawTable(4,3);
	addListenetrs();
	drawPictures(randomTab((4*3)/2));
	colorClick();
	
});