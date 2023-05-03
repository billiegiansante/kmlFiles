function searchZone() {
	var input = document.getElementById("zone-search");
	var filter = input.value.toUpperCase();
	var dropdown = document.getElementById("dropdown");
	var dropdownList = document.getElementById("dropdownlist");
	var myGeojsonLayer = null;

	// Create a new XMLHttpRequest object
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			const fileContents = this.responseText.split("\n");
			const zones = fileContents.map(line => line.split(",")); // create array of arrays
			dropdownList.innerHTML = "";
			for (let i = 0; i < zones.length; i++) {
				
				if (zones[i][2].toUpperCase().indexOf(filter) > -1) {
					const li = document.createElement('li');
					li.textContent = zones[i][2];
					dropdownList.appendChild(li);

					li.addEventListener('click', function() {
                        		const zoneIDBox = document.getElementById('zoneID');
                        		zoneIDBox.value = zones[i][0]

                        			//map.data.revertStyle();
						const searchBox = document.getElementById('zone-search');
						searchBox.value = this.textContent.trim();

						const zoneId = zones[i][0]; // get the zone ID from the array

						// NOTE: This uses cross-domain XHR, and may not work on older browsers.
						map.data.loadGeoJson('https://raw.githubusercontent.com/billiegiansante/kmlFiles/master/map.geojson');


						map.data.overrideStyle(function(feature) {
							var objectid = feature.getProperty('objectid');
							var color = "green";
							if (objectid == zoneId) {
								color = "red";
							}
							return {
								fillColor: color,
								strokeWeight: 1
							}
						});
					});
				}	
			}
		}
	};
	xhttp.open("GET", "https://raw.githubusercontent.com/kaylaweldon/Visual-Analytics-For-Rideshare/main/zones2.txt", true);
	xhttp.send();
}
