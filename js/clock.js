$(document).ready(function (e) {
	let intervalTime = 1000;
	let minutos = 19;
	let display;
	var timer = minutos,
		minutes, seconds;
	let clock;
	let nombre;
	let warning = true;
	let gradosInicial = 0;
	let gradosFinal = 360;
	let gradosActual = 0;
	let segundos = 20;
	let tiempoAvance = 30;
	let avanceGrados = (gradosFinal / segundos)/tiempoAvance;


	$(".start-game").click(function (e) {
		changeBackground();
		$(".preguntas-random, .titulo-app, .nombre input").addClass('hidden');
		$(".pregunta").removeClass('hidden');
		$(".respuestas").css({
			'visibility': 'visible'
		});
		$(".container-respuestas").css({
			'margin-top': '9%'
		});
		nombre = $("#txtNombre").val();
		$(".container-puntuacion").css({
			'color': '#fff'
		})

		$(this).css({
			'display': 'none'
		});
		$(".container-timer").fadeIn();

		display = $(".time");

		timer = minutos, minutes, seconds;
		clock = setInterval(changeClock, intervalTime);

		setInterval(function(e){
			var el = document.getElementById("hand");
			gradosActual+=avanceGrados;
			el.style.webkitTransform = 'rotate(' + gradosActual + 'deg)';	
		},tiempoAvance);
	})

	function changeClock() {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.text(minutes + ":" + seconds);

		timer--;

		if (minutes == 0 && seconds == 0) {
			$("#timer").removeClass('danger-clock');
			clearInterval(clock);
			return;
		}

		if (seconds <= 15) {
			if (seconds <= 5) {
				$(".timer").addClass('danger-clock');
				$(".timer").removeClass('warning-clock');
			} else {
				$(".timer").removeClass('danger-clock');
				$(".timer").addClass('warning-clock');

				// setTimeout(function (e) {
				// 	if (warning) {
				// 		$('.fill-background').css({
				// 			'background-color': '#dc0d32'
				// 		});
				// 	} else {
				// 		$('.fill-background').css({
				// 			'background-color': '#1bb287'
				// 		});

				// 	}
				// 	warning = !warning;
				// }, 1000);

				if (warning) {

					$(".fill-background").animate({
						backgroundColor: "#dc0d32"
					}, 400);

					// $('.timer').css({
					// 	'--color':"#dc0d32"
					// });

					// document.querySelectorAll('.timer')[0].style.setProperty("--color", "#dc0d32");
					// $('.timer').css('data-content','#dc0d32');


				} else {
					$(".fill-background").animate({
						backgroundColor: "#1bb287"
					}, 400);

					// document.querySelectorAll('.timer')[0].style.setProperty("--color", "#1bb287");
					// $('.timer').attr('data-content','#1bb287');


				}
				warning = !warning;

			}
		} else {
			$(".timer").removeClass('warning-clock');
		}
	}

	function changeBackground() {
		$(".fill-background").addClass('scale-background');
	}

	function temblarClock() {

	}

	$(".respuesta").click(function (e) {

		const preguntas = [
			$(".r1"),
			$(".r2"),
			$(".r3"),
			$(".r4")
		];

		const respuestas = [
			'Creo que si',
			'No gracias yo no tomo',
			'No sera mejor dos',
			'Creo que si x2'
		];

		const isCorrect = $(this).hasClass('respuesta-correcta');
		console.log({
			isCorrect
		});

		var el = document.getElementById("hand");

		var st = window.getComputedStyle(el, null);

		var tr = st.getPropertyValue("-webkit-transform") ||
			st.getPropertyValue("-moz-transform") ||
			st.getPropertyValue("-ms-transform") ||
			st.getPropertyValue("-o-transform") ||
			st.getPropertyValue("transform") ||
			"Either no transform set, or browser doesn't do getComputedStyle";

		var values = tr.split('(')[1],
			values = values.split(')')[0],
			values = values.split(',');

		var a = values[0]; // 0.866025
		var b = values[1]; // 0.5
		var c = values[2]; // -0.5
		var d = values[3]; // 0.8660253

		var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		gradosActual = gradosActual - 50;
	
		setTimeout(function (e) {
			$('.fade-text').animate({
				'opacity': '0'
			}, 500, function (e) {
				$(".pregunta").text('No sera de tomar un traguito ?');

				for (let index = 0; index < 4; index++) {
					preguntas[index].text(respuestas[index]);
				}

				$('.fade-text').animate({
					'opacity': '1'
				}, 500);

			})
		}, 300);
	})
})