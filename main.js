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
	         	range = "/values/" + "A2:" + "L" + (data.values.length).toString();
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

var input = dataSheets.values.reverse();

// Removing not archived
var notArchived = []
for (obji in input){
	if (input[obji][7]=="YES") notArchived.push(input[obji])
}
input = notArchived

console.log(input);
var numberofposts = input.length
var poststart = 0;
var postNum = Math.min(5,numberofposts)
var postend = postNum

// Disable load next/prev btn when posts < 5
if (numberofposts <= 5){
	$("#loadnext").addClass('disabled');
	$("#loadprev").addClass('disabled');
}


// Load next when btn clicked
$("#loadnext").click(function(){
    $("#mainposts").empty();
    if (postend+postNum <numberofposts){
        poststart+=postNum;
        postend+=postNum;
				$("#loadprev").removeClass('disabled');
				$("#loadnext").removeClass('disabled');
        render(input, poststart, postend);
    } else {
        poststart += postNum;
        postend=numberofposts;
        $("#loadnext").addClass('disabled');
        $("#loadprev").removeClass('disabled');
				render(input, poststart, postend);
    }
    console.log('A', poststart, 'B', postend);
});

// Load previous when btn clicked
$("#loadprev").click(function(){
    $("#mainposts").empty();
		if (poststart>numberofposts - postNum){
			poststart = numberofposts - postNum - numberofposts % postNum;
			postend = poststart+postNum;
			$("#loadprev").removeClass('disabled');
			$("#loadnext").removeClass('disabled');
			render(input, poststart, postend)
		}
    else if (poststart-postNum > 0){
        poststart -= postNum
        postend -= postNum
				$("#loadprev").removeClass('disabled');
				$("#loadnext").removeClass('disabled');
        render(input, poststart, postend)
    } else {
        poststart=0
        postend=postNum
        render(input, poststart, postend)
        $("#loadprev").addClass('disabled')
        $("#loadnext").removeClass('disabled')
    }
    console.log('A', poststart, 'B', postend);
});


render(input, poststart, postend);


// Function to render posts from int poststart to intpostend
function render(inputA, starthere, endhere){
	console.log('render', starthere, endhere)
	for (var i = starthere; i < endhere; i++){
		console.log('post', i)
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
							"</a>" +
							"<p id = p" + id + "></p>" +
							"<footer id = f" + id + ">" +
								"<ul class='actions'>" +
									"<li><a href='single.html?" + id + "#sp" + id + "' class='button big' id = read" + id + ">Continue Reading</a></li>" +
								"</ul>" +
								"<ul class='stats'>" +
									"<li><a href='#' id = topic" + id + "></a></li>" +
									"<li><a href='#' class='icon fa-heart'>28</a></li>" +
									"<li><a href='#' class='icon fa-comment'>128</a></li>" +
								"</ul>" +
							"</footer>" +
						"</article>");

		$("#mainposts").append(article); //article
		$("#name"+id).append(inputA[i][11]); //author name
		$("#t"+id).append(inputA[i][2]); //time
		$("#h"+id).append(inputA[i][3]); //heading
		$("#sub"+id).append(inputA[i][4]); //subheading
		$("#p"+id).append(inputA[i][5].substr(0, 350) + "..."); //paragraph
		$("#topic"+id).append(inputA[i][6]); //topic

		//inserting image or video
		if (inputA[i][8] == "IMAGE"){
			inputA[i][9]=inputA[i][9].replace("open?id=", "uc?id=");
			$("#a2"+id).append("<img src='"+input[i][9]+"&export=download' alt='' />")
		} else if (inputA[i][8] == "VIDEO") {
			//	swap watch?v= with embed/ in input[i][8]
			inputA[i][10]=inputA[i][10].replace("watch?v=", "embed/");
			$("#a2"+id).append("<iframe width='840' height='500' src='"+inputA[i][10]+"'></iframe>")
		}

	}
}

//find search term from window
var searchresults = [];
var searchterm = window.location.search.substr(7).toLowerCase();
console.log("lowercase searchterm:", searchterm);
console.log("search term:", searchterm, "typeof:", typeof searchterm, "length:", searchterm.length);

//only run when searching
if (searchterm != ""){

	//find matches
	for (objj in input){
		if (input[objj].join(" ").toLowerCase().search(searchterm) != -1){
			console.log("loging obj:", input[objj].join())
			searchresults.push(input[objj]);
		}
	}

//empty index.html
$("#mainposts").empty();

//create feedback message
var message = "";
if (searchresults.length != 0){
	message = $("<h2 style = 'text-align:center'>SEARCH RESULTS:</h2>");
}
else
{
	message = $("<h2 style = 'text-align:center'>NOTHING FOUND!</h2>");
}

//render message and results
$("#mainposts").append(message)
console.log("searchresults:", searchresults);
render(searchresults, 0, searchresults.length);

}




