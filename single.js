window.onload = () => {
	var readId = window.location.search.substr(1);
	console.log(readId)
	var singleArticle = $("<article class='post' id=sart" + readId + ">" +
									"<header>" +
										"<div class='title'>" +
											"<h2 id=sh" + readId + "><a href='#'></a></h2>" +
											"<p id=ssub" + readId + "></p>" +
										"</div>" +
										"<div class='meta'>" +
											"<time class='published' id=st" + readId + "></time>" +
											"<a href='#'' class='author' id=sa1" + readId + ">" +
											"<span class='name' id=sname" + readId + "></span>" +
											"<img src='images/avatar.jpg' alt='' id=simg1" + readId + "/></a>" +
										"</div>" +
									"</header>" +
									"<span class='image featured' id=span" + readId + ">" +
									"</span>" +
									"<p id=sp" + readId + "></p>" +
									"<footer>" +
										"<ul class='stats'>" +
											"<li><a href='#' id=stopic" + readId + "></a></li>" +
											"<li><a href='#' class='icon fa-heart'>28</a></li>" +
											"<li><a href='#' class='icon fa-comment'>128</a></li>" +
										"</ul>" +
									"</footer>" +
								"</article>");

	$("#smainpost").append(singleArticle); //article
	$("#sname"+readId).append(input[readId][11]); //author name
	$("#st"+readId).append(input[readId][2]); //title
	$("#sh"+readId).append(input[readId][3]); //heading
	$("#ssub"+readId).append(input[readId][4]); //subheading
	$("#sp"+readId).append(input[readId][5]); //paragraph
	$("#stopic"+readId).append(input[readId][6]); //topic

	//inserting image or video
	if (input[readId][8] == "IMAGE"){
		$("#span"+readId).append("<img src='"+input[readId][9]+"' alt='' />")
	} else if (input[readId][8] == "VIDEO") {
		//	swap watch?v= with embed/ in input[i][8]
		input[readId][10]=input[readId][10].replace("watch?v=", "embed/");
		console.log(input[readId][10])
		$("#span"+readId).append("<iframe width='840' height='500' src='"+input[readId][10]+"'></iframe>")
	}
	console.log(typeof window.location.search, readId);

	//Scroll to body
	$(document).ready(function () {
    // Handler for .ready() called.
    $('html, body').animate({
        scrollTop: $('#sp' + readId).offset().top
    }, 'slow');
});

}
