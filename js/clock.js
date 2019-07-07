$(document).ready(function (e) {
	let intervalTime = 1000;
	let display;
	let segundos = 20;
	let minutos = segundos - 1;
	var timer = minutos,
		minutes, seconds;
	let clock;
	let nombre;
	let warning = true;
	let gradosFinal = 360;
	let gradosActual = 0;
	let intervaloTiempoAvance = 10;
	let gradosAvance = (gradosFinal / segundos) / 100;
	let avanzarTiempoReloj;
	let puntajexPregunta = 50;
	let preguntaActual = 0;
	let listaPreguntas = [];
	let puntuacion = 0;

	$.ajax({
		type: "GET",
		url: "php/preguntas.controller.php?action=consultar",
		dataType: "json",
		success: function (preguntas) {
			listaPreguntas = preguntas;
			console.log('Ordenado', listaPreguntas);
			listaPreguntas = listaPreguntas.sort(function () {
				return Math.random() - 0.5
			});
			console.log('Desordenado', listaPreguntas);
			agregarPreguntas();
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
		console.log(preguntaActual);
		preguntaActual++;
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

		$(this).addClass('hidden');

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
		// $(".scale-background").removeClass('scale-background');
		clearInterval(avanzarTiempoReloj);

		$(".mi-puntuacion .puntos").text($("#puntuacion").text());

		setTimeout(function () {
			// $(".fill-background").css({'background':'#fff'});
			$(".fill-background").addClass('retract-background');
			// $(".fill-background").removeClass('scale-background');
			$(".container-timer").fadeOut();
			$(".container-puntuacion").css({
				'color': '#fff'
			});

			$(".respuestas").css({
				'visibility': 'hidden'
			});

			$(".pregunta").addClass('hidden');
		}, 1000);


		setTimeout(function () {
			$(".mi-puntuacion").fadeIn(600);
			$(".fill-background").css({
				'background': '#1BB287'
			});

			const datos = {
				puntos: puntuacion,
				nombre: $("#txtNombre").val()
			};

			$.ajax({
				type: "POST",
				url: "php/preguntas.controller.php?action=guardarPuntuacion",
				data: datos,
				dataType: "json",
				success: function (response) {
					console.log(response);
				}
			});

			$(".container-respuestas").css({
				'margin-top': '0'
			});
		}, 1500);

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
				// $(".timer").removeClass('danger-clock');
				$(".timer").addClass('warning-clock');

				if (warning) {

					$(".fill-background").animate({
						backgroundColor: "#dc0d32"
					}, 400);

					document.querySelectorAll('.timer')[0].style.setProperty("--color", "#dc0d32");
					$('.timer').css('data-content', '#dc0d32');


				} else {
					$(".fill-background").animate({
						backgroundColor: "#1bb287"
					}, 400);

					document.querySelectorAll('.timer')[0].style.setProperty("--color", "#1bb287");
					$('.timer').attr('data-content', '#1bb287');
				}
				warning = !warning;

		} else {
			$(".warning-clock").removeClass('warning-clock');
			$(".fill-background").animate({
				backgroundColor: "#1bb287"
			}, 400);
			document.querySelectorAll('.timer')[0].style.setProperty("--color", "#1bb287");
					$('.timer').attr('data-content', '#1bb287');
		}
	}

	function changeBackground() {
		$(".fill-background").removeClass('retract-background');
		$(".fill-background").addClass('scale-background');
	}

	$(".respuesta").click(function (e) {
		const isCorrect = $(this).hasClass('correct');
		console.log({
			isCorrect
		});

		if (isCorrect) {
			$(".segundos-aum-dis .signo").text('+');
			$(".segundos-aum-dis").css({
				'bottom': '-100px'
			});

			$("#puntuacion").text(
				parseInt($("#puntuacion").text()) + puntajexPregunta
			);

			puntuacion = parseInt($("#puntuacion").text());

			$(".container-puntuacion span").animate({
				'font-size': '1.7rem'
			}, 300, function () {
				$(".container-puntuacion span").animate({
					'font-size': '1.5rem'
				}, 300)
			});

			$(".segundos-aum-dis").animate({
				'opacity': '1',
				'bottom': '-60px'
			}, 300, function (e) {
				$(".segundos-aum-dis").animate({
					'opacity': '0'
				}, 300, function (e) {
					$(".segundos-aum-dis").css({
						'bottom': '-80px'
					})
				})
			});

			if (timer < 20) {
				let segundosExtras = 3;
				if (timer >= 17) {
					segundosExtras = 20 - timer;
				}
				timer += segundosExtras;
				gradosActual = gradosActual - ((gradosAvance * 100) * segundosExtras);
			}
		} else {
			$(".segundos-aum-dis .signo").text('-');
			$(".segundos-aum-dis").css({
				'bottom': '-60px'
			});

			$(".segundos-aum-dis").animate({
				'opacity': '1',
				'bottom': '-100px'
			}, 300, function (e) {
				$(".segundos-aum-dis").animate({
					'opacity': '0'
				}, 300, function (e) {
					$(".segundos-aum-dis").css({
						'bottom': '-80px'
					})
				})
			});

			if (timer > 0) {
				let segundosExtras = 3;
				if ((timer - 3) <= 0) {
					segundosExtras = timer;
				}
				timer -= segundosExtras;
				gradosActual = gradosActual + ((gradosAvance * 100) * segundosExtras);
			}
		}



		// if(timer < 20){
		// 	let segundosExtras = 3;
		// 	if(timer >=17){
		// 		segundosExtras = 20 - timer;
		// 	}
		// 	timer += segundosExtras;
		// 	gradosActual = gradosActual - ((gradosAvance * 100) * segundosExtras);
		// }


		// setTimeout(function (e) {
		// 	$('.fade-text').animate({
		// 		'opacity': '0.1'
		// 	}, 300, function (e) {
		// 		console.log("asdasdasdasdasda");
		// 		$('.fade-text').animate({
		// 			'opacity': '1'
		// 		}, 300);
		// 		// preguntaActual++;
		// 	})
		// }, 300);
		agregarPreguntas();
	});

	$(".scoreboard").click(function (e) {
		$(".container-puntuaciones").children().remove();
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
	});

	$(".btn-aceptar").click(function (e) {
		$(".container-puntuacion").css({
			'color': '#000'
		});

		gradosActual = 0;
		segundos = 20;
		preguntaActual = 0;

		$("#puntuacion").text('0');
		$("#txtNombre").val('');
		$(".preguntas-random, .titulo-app, .nombre input").removeClass('hidden');

		$(".start-game").removeClass('hidden');

		$(".container-puntuacion").fadeIn(200);

		$(".mi-puntuacion").fadeOut(100);
		$(".scoreboard").fadeIn(200);

		$(".container-puntuacion").fadeIn(200);
	});
})