$(document).ready(function (e) {
	let intervalTime = 1000;
	let minutos = 29;
	let display;
	var timer = minutos, minutes, seconds;
	let clock;


	$(".start-game").click(function (e) {
		changeBackground();
		$(this).css({ 'display': 'none' })
		$(".container-timer").fadeIn();
		display = $(".time");

		timer = minutos, minutes, seconds;
		clock = setInterval(changeClock, intervalTime);
	})

	function changeClock() {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.text(minutes + ":" + seconds);

		timer--;

		if (minutes == 0 && seconds == 0) clearInterval(clock);
	}

	function changeBackground(){
		$(".fill-background").addClass('scale-background');
	}
})