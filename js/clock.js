$(document).ready(function (e) {
	let intervalTime = 1000;
	let minutos = 19;
	let display;
	var timer = minutos,
		minutes, seconds;
	let clock;
	let nombre;
	let warning = true;
	let gradosFinal = 360;
	let gradosActual = 0;
	let segundos = 20;
	let intervaloTiempoAvance = 10;
	let gradosAvance = (gradosFinal / segundos) / 100;

	console.log(gradosAvance);


	// let tiempoAvance = 31.45;
	// let avanceGrados = (gradosFinal / segundos)/tiempoAvance;
	var avanzarTiempoReloj;


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

		avanzarTiempoReloj = setInterval(function(e){
			var el = document.getElementById("hand");
			
			gradosActual+=gradosAvance;

			el.style.webkitTransform = 'rotate(' + gradosActual + 'deg)';
			
			if(gradosActual >= gradosFinal){
				pararReloj();
			}
		},intervaloTiempoAvance);
	});

	function pararReloj(){
		clearInterval(avanzarTiempoReloj);
	}

	function changeClock() {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10) ;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.text(minutes + ":" + seconds);

		console.log(timer);
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

		let segundosExtras = 3;
		timer+=segundosExtras;
		gradosActual = gradosActual - ( (gradosAvance*100)*segundosExtras );
	
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