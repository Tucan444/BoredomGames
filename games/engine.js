// learn imports

// object for circles inside .game_box
class Circle{
	constructor(x, y, radius, element, speed=1){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.element = element;
		this.speed = speed;

		// variables for css
		this.right = -(50 + this.x);
		this.top = 125 + this.y;

		this.element.css({
			"right": `${this.right.toString()}px`,
			"top": `${this.top.toString()}px`
		})
	}

	// for debugging
	print = function(){
		console.log(`pos: ${this.x},${this.y} ; rt: ${this.right},${this.top} ; radius: ${this.radius}`);
	}

	// moving
	move = function(x, y){
		x *= this.speed;

		this.x += x;
		this.y += y;

		// variables for css
		this.right = -(50 + this.x);
		this.top = 125 + this.y;

		this.element.css({
			"right": `${this.right.toString()}px`,
			"top": `${this.top.toString()}px`
		})
	}

	//updating pos
	update = function(x=this.x, y=this.y){
		this.x = x;
		this.y = y;

		// variables for css
		this.right = -(50 + this.x);
		this.top = 125 + this.y;

		this.element.css({
			"right": `${this.right.toString()}px`,
			"top": `${this.top.toString()}px`
		})
	}

	// collisions
	collisions = function(Xlimit, other_circle){
		if(this.x > Xlimit){
			this.x = -50;

			$(".cgame").css("background-color", "#ffdccc");
			setTimeout(function(){
				$(".cgame").css("background-color", "#f2f3fe");
			},1000);
		}

		// if collide

		// css bad u go after first circle so u need to add 50 cause visually it starts right after 1. circle
		if (distance_indicator([this.x, this.y], [other_circle.x + 50, other_circle.y]) < (this.radius + other_circle.radius)){
			this.x = -50;
			other_circle.update(other_circle.x, random_integer(250) - 125);

			$(".cgame").css("background-color", "#b0ffb3");
			setTimeout(function(){
				$(".cgame").css("background-color", "#f2f3fe");
			},1000);
		}
	}
}

// function for changing aplitude
function change_amplitude(amplitude, dir, step=1){  // limits are set to -1.5 and 1.5
	if (amplitude >= 120){
		dir = "down";
	} else if (amplitude <= -120){
		dir = "up";
	}
	
	if (dir == "up"){
		amplitude += step;
	} else {
		amplitude -= step;
	}

	return [amplitude, dir];
}


// useful funcs
function random_integer(max){
	let lim = Math.floor(Math.log10(max)) + 1;
	let random_num = max + 1;

	while (random_num > max){
		random_num = Math.floor(Math.random() * Math.pow(10, lim));
	}

	return random_num;
}

function distance_indicator(cords0, cords1){
	let x_dist = Math.abs(cords0[0] - cords1[0]);
	let y_dist = Math.abs(cords0[1] - cords1[1]);
	let dist = Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2));

	return dist;
}

function random_color(){
	let digits = [];
	for (let i = 0; i < 10; i++){
		digits.push(i.toString());
	}

	digits = digits.concat(["a", "b", "c", "d", "e", "f"]);

	let color_tag = "#";

	for (let i = 0; i < 6; i++){
		color_tag += digits[random_integer(15)];
	}

	return color_tag;
}

$(document).ready(function(){
    
    // We start the program here
    let footer_wow = true;
	let footer_dbl = false;
	let title_right = 0;
	let footer_changed = false;
	let temporary_variable = 0;
	let digits = [];
	for (let i = 0; i < 10; i++){
		digits.push(i.toString());
	}
	let wee_count = 0;
	let pink_titles = false;

	// preparing colors
	let colors = ["Red", "Lime", "Aqua", "Yellow", "White", "Black", "Violet", "Pink", "Orange"];
	let colors_score = 0;

	for (color_ of colors){
		$(".color_options").append(`<p id="X${color_}">${color_}</p>`);
	}

	let color = colors[random_integer(8)];
	$(".color_current").html(colors[random_integer(8)]).css("color", color);

	// preparing sin wave game

	temporary_variable = random_integer(83);
	let angle = 0;
	let amplitude = 120;
	let dir = "up";
	let target_circle = new Circle(700, (temporary_variable * 3) - 125, 25, $("#target_circle"));

	let moving_circle = new Circle(0, 0, 25, $("#moving_circle"));

	$(".amplitude_showerX").css("top", `${125 - (amplitude + 25)}px`);
	$(".shower").css("top", 125 + (moving_circle.y - 25));

	$("#target_circle").css("top", `${temporary_variable}%`);

	target_circle.update()

	// preparing elements game

	let element_size = [];
	let win_fade_game = false;

	$(".helloX").hide();

	for (let i = 0; i < 150; i++){
		$(".sgame").append(`<p id="X${i}"> &nbsp; </p>`);
	}

	for (let i = 0; i < 150; i++){
		$(`#X${i}`).css("background-color", random_color());
		if (element_size.length < 2){
			element_size.push($(`#X${i}`).outerWidth(true));
			element_size.push($(`#X${i}`).outerHeight(true));
		}
	}

	// Here prep work ends

    // random
	$(".ni, .outerNi").click(function(){
		$(this).hide();
	});


	// question mark
	$(".question_mark_navbar").click(function(){
		$("*").css("background-color", "#ffffff");
	});

	// title
	$(".brrr").click(function(){
		title_right--;

		if (title_right < -20){
			title_right = 0;
		}
		
		$(this).css("right", `${title_right}%`);
	})

	// current_color
	$(".color_current").click(function(){
		$(".color_options, .colors_score").slideToggle(5000);
	});

	// colors score
	$(".colors_score").click(function(){
		if (footer_changed == false){
			$(".footer").css("font-size", "400px");
			footer_changed = true;
		} else {
			$(".footer").css("font-size", "20px");
			footer_changed = false;
		}
	});

	// first game

	// clicking elements
    $(".color_options").children("p").click(function(){

		if ($(this).html() != color){
			$(this).hide(1000);
			$(".color_options").children("p").css("background-color", "#f2f3fe");
			const old_score = colors_score;
			colors_score = 0;

			$(".colors_score").html(`${colors_score} ;${old_score}`).animate({
				marginLeft: "+=80%"
			}, 3000);
		} else {
			color = colors[random_integer(8)];
			$(".color_current").html(colors[random_integer(8)]).css("color", color);
			$(this).css("background-color", colors[random_integer(8)]);
			colors_score++;
			$(".colors_score").html(colors_score);
		}

	});

	// reseting elements
	$(".color_options").click(function(){
		$(this).children().show(2000);
	});

	// second game

	// game loop

    setInterval(function(){ 
		moving_circle.move(1, 0);
		moving_circle.update(moving_circle.x, Math.cos(angle) * amplitude);
		$(".shower").css("top", 125 + (moving_circle.y - 25));

		moving_circle.collisions(parseInt($(".game_box").width()) - 150, target_circle);
		angle += 0.01;

	}, 8);

	// changing amplitude
	$(".cgame, .amplitude").click(function(){
		returned_list = change_amplitude(amplitude, dir, 10);
		amplitude = returned_list[0];
		dir = returned_list[1];
		$(".amplitude_showerX").css("top", `${125 - (amplitude + 25)}px`);

		$(".amplitude").html(`Amplitude: ${amplitude}`);
	});

	// second title
	$(".title2").on({
		mouseenter: function(){

			$(".cgame").css("background-color", "#000539");
	
		},
		mouseleave: function(){
			$(".cgame").css("background-color", "#f2f3fe");
		},
		click: function(){
			$(this).css("background-color", "#000539");
		}
	});

	$("body").keypress(function( event ) {
		if (event.key in digits){
			if (wee_count < 3){
				$(".secret").append('<span> WEE </span>');
				wee_count++;
			}
		}
	});

	// third game

	for (let i = 0; i < 150; i++){
		$(`#X${i}`).on({
			mouseenter: function(){
			
				let rni = random_integer(10);
				
				// 0 3 height, 2 opacity, 4 bg
				if (rni == 0){
					op = $(`#X${i}`).css("opacity");
					$(`#X${i}`).css("opacity", op  -0.1);
	
					$(`#X${i}`).animate({
						height: 51
					}, 1500 );
				} else if (rni == 1){
					$(`#X${i}`).animate({
						opacity: 0.2
					}, 1500 );
				} else if (rni == 2){
					op = $(`#X${i}`).css("opacity");
					$(`#X${i}`).css("opacity", op  -0.4);
	
				} else if (rni == 3){
					op = $(`#X${i}`).css("opacity");
					$(`#X${i}`).css("opacity", op  -0.1);
	
					$(`#X${i}`).animate({
						height: `${element_size[1]}px`
					}, 1500 );
				} else if (rni == 4){
					op = $(`#X${i}`).css("opacity");
					$(`#X${i}`).css("opacity", op  -0.1);
	
					$(`#X${i}`).css("background-color", random_color());
				} else if (rni == 5){
					op = $(`#X${i}`).css("opacity");
					$(`#X${i}`).css("opacity", op  -0.1);
	
					$(`#X${i}`).css("right", parseInt($(`#X${i}`).css("right").slice(0, -2)) + 10);
				} else if (rni == 6){
					op = $(`#X${i}`).css("opacity");
					$(`#X${i}`).css("opacity", op  -0.1);
	
					$(`#X${i}`).css("top", parseInt($(`#X${i}`).css("top").slice(0, -2)) + 10);
				} else if (rni == 7){
					op = $(`#X${i}`).css("opacity");
					$(`#X${i}`).css("opacity", op  -0.1);
	
					$(`#X${i}`).css("bottom", parseInt($(`#X${i}`).css("top").slice(0, -2)) + 10);
				} else if (rni == 8){
					op = $(`#X${i}`).css("opacity");
					$(`#X${i}`).css("opacity", op  -0.1);
	
					$(`#X${i}`).css("left", parseInt($(`#X${i}`).css("left").slice(0, -2)) + 10);
				} else if (rni == 9){
					op = $(`#X${i}`).css("opacity");
					$(`#X${i}`).css("opacity", op  -0.1);
	
					$(`#X${i}`).css("border-radius", parseInt($(`#X${i}`).css("border-radius").slice(0, -2)) + 6);
				} else if (rni == 10){
					op = $(`#X${i}`).css("opacity");
					$(`#X${i}`).css("opacity", op  -0.1);
	
					$(`#X${i}`).addClass("box_shadow");
				}
			},

			click: function(){
				op = $(`#X${i}`).css("opacity");
				$(`#X${i}`).css("opacity", op  -0.15);
			}
		});
	}

	setInterval(function(){
		if (win_fade_game == false){
			let clear = true;

			for (let i = 0; i < 150; i++){
				op = $(`#X${i}`).css("opacity");
				if (op > 0.022){
					clear = false;
				} 
			}

			if (clear == true){
				win_fade_game = true;

				$(".sgame").css("background-color", "#b5ffb8").toggle(3000);

				setTimeout(function(){
					$(".sgame").css("background-color", "#f2f3fe");
				}, 3000)

				$(".helloX").show(3000);
			}
		}
	}, 1000);

	$(".helloX").on({
		click: function(){
			$(".sgame").empty();

			win_fade_game = false;

			for (let i = 0; i < 150; i++){
				$(".sgame").append(`<p id="X${i}"> &nbsp; </p>`);
			}

			for (let i = 0; i < 150; i++){
				$(`#X${i}`).css("background-color", random_color());
			}

			for (let i = 0; i < 150; i++){
				$(`#X${i}`).on({
					mouseenter: function(){
					
						let rni = random_integer(10);
						
						// 0 3 height, 2 opacity, 4 bg
						if (rni == 0){
							op = $(`#X${i}`).css("opacity");
							$(`#X${i}`).css("opacity", op  -0.1);
			
							$(`#X${i}`).animate({
								height: 51
							}, 1500 );
						} else if (rni == 1){
							$(`#X${i}`).animate({
								opacity: 0.2
							}, 1500 );
						} else if (rni == 2){
							op = $(`#X${i}`).css("opacity");
							$(`#X${i}`).css("opacity", op  -0.4);
			
						} else if (rni == 3){
							op = $(`#X${i}`).css("opacity");
							$(`#X${i}`).css("opacity", op  -0.1);
			
							$(`#X${i}`).animate({
								height: `${element_size[1]}px`
							}, 1500 );
						} else if (rni == 4){
							op = $(`#X${i}`).css("opacity");
							$(`#X${i}`).css("opacity", op  -0.1);
			
							$(`#X${i}`).css("background-color", random_color());
						} else if (rni == 5){
							op = $(`#X${i}`).css("opacity");
							$(`#X${i}`).css("opacity", op  -0.1);
			
							$(`#X${i}`).css("right", parseInt($(`#X${i}`).css("right").slice(0, -2)) + 10);
						} else if (rni == 6){
							op = $(`#X${i}`).css("opacity");
							$(`#X${i}`).css("opacity", op  -0.1);
			
							$(`#X${i}`).css("top", parseInt($(`#X${i}`).css("top").slice(0, -2)) + 10);
						} else if (rni == 7){
							op = $(`#X${i}`).css("opacity");
							$(`#X${i}`).css("opacity", op  -0.1);
			
							$(`#X${i}`).css("bottom", parseInt($(`#X${i}`).css("top").slice(0, -2)) + 10);
						} else if (rni == 8){
							op = $(`#X${i}`).css("opacity");
							$(`#X${i}`).css("opacity", op  -0.1);
			
							$(`#X${i}`).css("left", parseInt($(`#X${i}`).css("left").slice(0, -2)) + 10);
						} else if (rni == 9){
							op = $(`#X${i}`).css("opacity");
							$(`#X${i}`).css("opacity", op  -0.1);
			
							$(`#X${i}`).css("border-radius", parseInt($(`#X${i}`).css("border-radius").slice(0, -2)) + 6);
						} else if (rni == 10){
							op = $(`#X${i}`).css("opacity");
							$(`#X${i}`).css("opacity", op  -0.1);
			
							$(`#X${i}`).addClass("box_shadow");
						}
					},
		
					click: function(){
						op = $(`#X${i}`).css("opacity");
						$(`#X${i}`).css("opacity", op  -0.15);
					}
				});
			}

			$(".helloX").hide(3000);
			$(".sgame").show(3000);
		},
		dblclick: function(){
			$(".sgame p, .color_current").addClass("ss");
		}
	});

	$(".title3").click(function(){
		if (pink_titles){
			$(".title").toggleClass("title_shadow");
			$(".title").toggleClass("box_shadow_secret");
		} else {
			$(".title").toggleClass("title_shadow");
			$(".title").toggleClass("box_shadow_secret");
		}
	});

	// footer

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
	
	// debug message

	console.log("Everything is running.");

});
