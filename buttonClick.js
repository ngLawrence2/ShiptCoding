$(document).ready(function(){
    $(".button").click(function(){
        var zipCode = document.getElementById("zip").value;
		if(validateZip(zipCode)) {
			/*
			Delete old data when user clicks button again
			*/
			deleteOldData();
			
			
			var url = "https://shipt-zip-code-test-api.herokuapp.com/api/zip_codes/" + zipCode;
			$.getJSON(url, function(json) {
			var data = [];
			for(var i = 0 ; i < json.stores.length ; i++ )  {
				var dateAvail = new Date(json.stores[i].launch_date);
				dateAvail.setDate(dateAvail.getDate() + 1);
				var currentDate = new Date();
				if(dateAvail > currentDate) {
					
					var currentData = {name : json.stores[i].name , date: "Coming " + dateAvail.getMonth() + "/" + dateAvail.getDate() + "/" + dateAvail.getFullYear() };
					data.push(currentData);
				} else {
					var currentData = {name : json.stores[i].name , date: "Now Available" };
					data.push(currentData);
				}
			}
			data.sort(function(a,b) {
				var nameA=a.name.toLowerCase(), nameB = b.name.toLowerCase()
				if(nameA < nameB)
					return -1
				if(nameA > nameB) 
					return 1
				return 0
			});
			
			if(data.length > 0 ) {
				$("#zipCodeInfo").append("<p id = delivery>DELIVERING FROM: </p>");
				var i ;
				for(i = 0 ; i < data.length ; i++ ) {
					
					$("#zipCodeInfo").append("<span class = storeTitle> " + data[i].name + " <br>" + "<span id = dateAvailable>" + data[i].date + "</span></span> " );
				}
				$("#zipCodeInfo").append("<div id = appendedButton><button class=button>GET STARTED</button></div>");
			} 
			})
			.fail(function() {
				alert("No data found in zip code " + zipCode); 
			})
		}else {
			alert("Zip code must be 5 digits");
		}
    });
});



function deleteOldData() {
	$("#appendedButton").remove();
	$("#delivery").remove();
	$("span").remove();
	
}


function validateZip(zip) {
	return /^(\d{5})/.test(zip);
}