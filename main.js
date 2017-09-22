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
console.log(dataSheets);


input = dataSheets.values.reverse();
console.log(input);
var rows = dataSheets.values.length


for (var i = 0; i < rows; i++){
	var id = i.toString()
	var article = $("<article class = 'post' id = art" + id + ">" + 
		            	"<header id = hd" + id + ">" + 
		            		"<div class = 'title'>" + 
		           				 "<h2 id = h" + id + "></h2>" +
		            				"<p id = sub" + id + "></p>" +
		            		"</div>" + 
		            		"<div class = 'meta'>" +
		            			"<time class = 'published' id = t" + id + "></time>" +
                                "<a href='#' class='author' id = a1" + id + ">" +
                                	"<span class='name' id=name" + id + ">" + "</span>" +
                                	 "<img src='images/avatar.jpg' alt='' id = img1" + id + "/>" + 
                                "</a>" +
							"</div>" +
						"</header>" +
						"<a href='#' class='image featured' id = a2" + id + ">" +
							"<img src='" + input[i][8] + "' alt='' id = img2" + id + "/>" +
						"</a>" +
						"<p id = p" + id + "></p>" +
						"<footer id = f" + id + ">" +
							"<ul class='actions'>" +
								"<li><a href='#'' class='button big'>Continue Reading</a></li>" +
							"</ul>" +
							"<ul class='stats'>" +
								"<li><a href='#' id = topic" + id + "></a></li>" +
								"<li><a href='#' class='icon fa-heart'>28</a></li>" +
								"<li><a href='#' class='icon fa-comment'>128</a></li>" +
							"</ul>" +
						"</footer>" +
					"</article>");


	
	$("#mainposts").append(article);
	$("#name" + id).append(input[i][2]);
	$("#t" + id).append(input[i][3]);
	$("#h" + id).append(input[i][4]);
	$("#sub" + id).append(input[i][5]);
	$("#p" + id).append(input[i][6]);
	$("#topic" + id).append(input[i][7]);


	console.log(typeof input[i][4], input[i][4]);
}




