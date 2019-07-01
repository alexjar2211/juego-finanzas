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
	let avanzarTiempoReloj;
	let puntajexPregunta = 50;
	let preguntaActual = 0;
	let listaPreguntas = [];

	$.ajax({
		type: "GET",
		url: "php/preguntas.controller.php?action=consultar",
		dataType: "json",
		success: function (preguntas) {
			listaPreguntas = preguntas;
			agregarPreguntas();
			preguntaActual++;
		}
	});

	function agregarPreguntas() {
		console.log("NUmero de acceso :" + preguntaActual);
		$(".correct").removeClass("correct");
		$(".pregunta").text(listaPreguntas[preguntaActual].titulo);

		const respuesta = ['r1', 'r2', 'r3', 'r4'];

		$("." + respuesta[0]).text(listaPreguntas[preguntaActual].r1);
		$("." + respuesta[1]).text(listaPreguntas[preguntaActual].r2);
		$("." + respuesta[2]).text(listaPreguntas[preguntaActual].r3);
		$("." + respuesta[3]).text(listaPreguntas[preguntaActual].r4);

		const opciones = ((Object.keys(listaPreguntas[preguntaActual]).filter((e) => e.includes("r"))));

		opciones.forEach((e) => {
			let r = e.substr(1);
			if (r == parseInt(listaPreguntas[preguntaActual].ok)) {
				console.log(r);
				console.log(listaPreguntas[preguntaActual].ok);
				$(".r" + r).addClass('correct');
			}
		});
	}

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
		});

		$(".scoreboard").fadeOut(200);

		$(this).css({
			'display': 'none'
		});
		$(".container-timer").fadeIn();

		display = $(".time");

		timer = minutos, minutes, seconds;
		clock = setInterval(changeClock, intervalTime);

		avanzarTiempoReloj = setInterval(function (e) {
			var el = document.getElementById("hand");
			gradosActual += gradosAvance;
			el.style.webkitTransform = 'rotate(' + gradosActual + 'deg)';
			if (gradosActual >= gradosFinal) {
				pararReloj();
			}
		}, intervaloTiempoAvance);
	});

	function pararReloj() {
		clearInterval(avanzarTiempoReloj);
	}

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
		const isCorrect = $(this).hasClass('correct');
		console.log({
			isCorrect
		});

		if (isCorrect) {
			$("#puntuacion").text(
				parseInt($("#puntuacion").text()) + puntajexPregunta
			);
		};

		let segundosExtras = 3;
		timer += segundosExtras;
		gradosActual = gradosActual - ((gradosAvance * 100) * segundosExtras);

		setTimeout(function (e) {
			$('.fade-text').animate({
				'opacity': '0.1'
			}, 300, function (e) {
				agregarPreguntas();
				$('.fade-text').animate({
					'opacity': '1'
				}, 300);

				preguntaActual++;

			})
		}, 300);
	});

	$(".scoreboard").click(function (e) {

		$(".scoreboard-container").fadeIn(200);

		$.ajax({
			type: "GET",
			url: "php/preguntas.controller.php?action=consultarPuntuaciones",
			dataType: "json",
			success: function (puntuaciones) {
				puntuaciones.forEach((e) => {
					let template = `	<div class="puntuaciones" style="margin-bottom: 10px">
												<span style="padding-right: 10px;">${e.nombre}</span>
												<span>..............................................................................................</span>
												<span style="padding-left: 10px;">${e.puntos}</span>
											</div>`;
					$(".scoreboard-container .container-puntuaciones").append(template);
				})
			}
		});


	});

	$(".btn-cerrar").click(function (e) {
		$(".scoreboard-container").fadeOut(200);
	})
})