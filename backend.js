$(document).ready(function(){

	// here we start the program
	let main_desc_clicked = false;
	let rect_score = 100;
	let footer_wow = true;
	let footer_dbl = false;


	// random
	$(".ni, .outerNi").click(function(){
		$(this).hide();
	});


	// question mark
	$(".question_mark_navbar").click(function(){
		$("*").css("background-color", "#ffffff");
	});

	// title
	$("#welcome").mouseenter(function(){
		if(main_desc_clicked == true){
			$(header).toggle(200);
		}
	});
	
	// main_desc
	$("#main_desc").load("assets/texts/main_desc.txt");

	$("#main_desc").click(function(){
		$(this).css("color", "#000539");
		main_desc_clicked = true;
	});

	// score
	$(".score").click(function(){
		rect_score += 1;

		$(this).css("width", "9%");
		$(this).html(rect_score);
	});

	// rect
	$("#rect").click(function(){
		rect_score -= 1;

		if (rect_score <= 0){
			rect_score = 0;

			$(".score").css("width", "22%");
			$(".score").html("Yay you won!");
		} else {
			$(".score").css("width", "9%");
			$(".score").html(rect_score);
		}
	});


	// footer
	$(".footer").on({
		dblclick : function(){
			$(this).html("wow");
			$("section, header").toggle(5000);

			if (footer_dbl == true){
				$(this).css("font-size", "20px");
				footer_dbl = false;
			} else {
				$(this).css("font-size", "400px");
				footer_dbl = true;
			}

			footer_wow = true;
		},
		
		click : function(){
			if (footer_wow == true){
				$(this).html("try double click");
				footer_wow = false;
			} else {
				$(this).html("wow");
				footer_wow = true;
			}
		}
	});


	console.log("Everything is running.");

});
