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
	         	range = "/values/" + "A2:" + "M" + (data.values.length).toString();
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
        render();
    } else {
        poststart += postNum;
        postend=numberofposts;
        $("#loadnext").addClass('disabled');
        $("#loadprev").removeClass('disabled');
				render();
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
			render()
		}
    else if (poststart-postNum > 0){
        poststart -= postNum
        postend -= postNum
				$("#loadprev").removeClass('disabled');
				$("#loadnext").removeClass('disabled');
        render()
    } else {
        poststart=0
        postend=postNum
        render()
        $("#loadprev").addClass('disabled')
        $("#loadnext").removeClass('disabled')
    }
    console.log('A', poststart, 'B', postend);
});

render();

// Function to render posts from int poststart to intpostend
function render(){
	console.log('render', poststart, postend)
	for (let i = poststart; i < postend; i++){
		console.log('post', i)
		let id = i.toString()
		let article = $("<article class = 'post' id = art" + id + ">" +
							"<header id = hd" + id + ">" +
								"<div class = 'title'>" +
									 "<h2 id = h" + id + "></h2>" +
										"<p id = sub" + id + "></p>" +
								"</div>" +
								"<div class = 'meta'>" +
									"<time class = 'published' id = t" + id + "></time>" +
									"<a href='#' class='author' id = a1" + id + ">" +
										"<span class='name' id=name" + id + ">" + "</span>" +
									"</a>" +
								"</div>" +
							"</header>" +
							"<a href='#' class='image featured' id = a2" + id + ">" +
							"</a>" +
							"<p id = p" + id + "></p>" +
							"<footer id = f" + id + ">" +
								"<ul class='actions' id=ul" + id + ">" +
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
		$("#name"+id).append(input[i][11]); //author name
		$("#t"+id).append(input[i][2]); //time
		$("#h"+id).append(input[i][3]); //heading
		$("#sub"+id).append(input[i][4]); //subheading
		$("#topic"+id).append(input[i][6]); //topic

		//continue reading ... & btn
		if (input[i][5].length > 350){
			$("#p"+id).append(input[i][5].substr(0, 350) + "..."); //paragraph
		} else {
			$("#p"+id).append(input[i][5])
			$("#ul"+id).empty()
		}

		//inserting avatar image if exists
		if (input[i][12]){
			input[i][12]=input[i][12].replace("open?id=", "uc?id=");
			$("#a1"+id).append("<img src='"+input[i][12]+"&export=download' alt='' />")
		} else{
			$("#a1"+id).append("<img src='images/avatar.jpg' alt='' id = img1" + id + "/>")
		}

		//inserting image or video
		if (input[i][8] == "IMAGE"){
			input[i][9]=input[i][9].replace("open?id=", "uc?id=");
			$("#a2"+id).append("<img src='"+input[i][9]+"&export=download' alt='' />")
		} else if (input[i][8] == "VIDEO") {
			//	swap watch?v= with embed/ in input[i][8]
			input[i][10]=input[i][10].replace("watch?v=", "embed/");
			$("#a2"+id).append("<iframe width='840' height='500' src='"+input[i][10]+"'></iframe>")
		}

	}
}

// Create menu bar on side with hard-coded search bar
function menubar(){
	for (let i = poststart; i < postend; i++){
		let id = i.toString();
		let menuItem = $("<li>"+
										 "<a href=\'single.html?"+id+"#sp" +id+"\'>"+ // placeholder for link
											"<h3 id=menuh"+ id+"></h3>"+
											"<p id= p2id"+id+"></p>"+
											"</a>"+
											"</li>"
										);

		$("#menuitems").append(menuItem); //menu item
		$("#menuh"+id).append(input[i][3]); // title
		$("#p2id"+id).append(input[i][4]); // subtitle
}}
menubar();
