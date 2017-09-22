var link =  "https://sheets.googleapis.com/v4/spreadsheets/";
const spreadsheetID = "1EX_QfOxLd6JM12nuSwlaJ4vJo4cESEf8wAXaHmFQfcg";
const API_KEY = "?key=AIzaSyDQkiv-Fe56n9mcjFZ0BEZpJI5c-RhmyvE";
var range = "/values/" + "A" + ":" + "A";
var dataSheets = {};
/*
//find range of data
$.get(link + spreadsheetID + range + API_KEY, function(data, status){
	console.log("Length:", data.values.length, "Status :", status);
	range = "/values/" + "A2:" + "I" + (data.values.length).toString();

})
//new get request for all the data
	         	$.get(link + spreadsheetID + range + API_KEY, function(data, status){
					console.log("Data:", data, "Status :", status);
					dataSheets = data;
				})
*/

$.ajax({
	type: "GET",
	url: link + spreadsheetID + range + API_KEY,
	async: false,
	success: function(data, status){
	         	console.log("Length:", data.values.length, "Status :", status);
	         	range = "/values/" + "A2:" + "I" + (data.values.length).toString();
	     	}

})

//new get request for all the data
$.ajax({
	type: "GET",
	url: link + spreadsheetID + range + API_KEY,
	async: false,
	success: function(data, status){
		dataSheets = data;
			}


})

var arrayValues = data.values
for (var i = 0; i < arrayValues.length; i++){
	var article = $("<article id = art" + i.toString() + "><div> </div><article>");
	$("#main").append(article);
};




