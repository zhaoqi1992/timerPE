$('document').ready(function() {
	var sec = 0;
	var min = 0;
	var hour = 0;
	var msec = 0;
	var container = $('.container').detach();
	var nowTime = min + ' :' + sec + ' :' + msec;
	var timer = $('<h1>' + nowTime + '</h1>');

	setInterval(function() {
		$('body').append(timer);
		if (sec > 0) {
			sec--;
		}
		if (sec <= 0) {
			if (min <= 0) {
				if (hour > 0) {
					hour--;
					min = 59;
				}
			}
			if (min > 0) {
				min--;
				sec = 59;
			}
		}
		nowTime = hour + ' :' + min + ' :' + sec;

		timer = $('<h1>' + nowTime + '</h1>');
		$('body h1').replaceWith(timer);
	}, 1000);
	if (hour == 0 && min == 0 && sec == 0) {
		$('body h1').replaceWith(container);
	}
})