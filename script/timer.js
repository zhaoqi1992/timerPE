$('document').ready(function() {
	var min = 0,
		sec = 0,
		msec = 0;
	var timerInterval;
	var clicknumber_pause = 0,
		clciknumber_count = 0;
	var text = '';

	function addZeroToTime() {
		if (msec < 10) {
			msec = '0' + msec;
		}
		if (sec < 10) {
			sec = '0' + sec;
		}
		if (min < 10) {
			min = '0' + min;
		}
		text = min + ':' + sec + ':' + msec;
		msec = parseInt(msec);
		sec = parseInt(sec);
		min = parseInt(min);
	}

	function timer() {
		if (msec == 99) {
			if (sec == 60) {
				min += 1;
				sec = 0;
			}
			sec += 1;
			msec = 0;
		}
		msec += 1;
		addZeroToTime();
		$('h1').text(text);

	}
	$('#reset').click(function() {
		clearInterval(timerInterval);
		msec = 0;
		sec = 0;
		min = 0;
		clciknumber_count = 0;
		$('h1').text('00:00:00');
		$('#start').text('start');
		$('#result').empty();
		$('#grade').empty();
	});
	$('#start').click(function() {
		if (clicknumber_pause % 2) {
			clearInterval(timerInterval);
			addZeroToTime();
			$('h1').text(text);

			$(this).text('start');
		} else {
			timerInterval = setInterval(timer, 10);
			$(this).text('pause');
		}
		clicknumber_pause++;
	});
	$('#count').click(function() {
		clciknumber_count++;
		addZeroToTime();
		$('h1').text(text);

		// var grade_table = '<tr><td>' + clciknumber_count + '</td><td>' + text + '</td></tr>';
		var grade_div = '<p><span class="order">' + clciknumber_count + '</span> <span class="time">' + text + '</span></p>';
		// $('#result').append(grade_table);
		$('#grade').append(grade_div);
	});
	$('#show').click(function() {
		var i = 0;
		var time = $('#grade p .time');
		var order = $('#grade p .order');
		$('#timer').detach();
		alert(time.first().text());
		var nameForStudent = '<sapn>' + time.first().text() + '</span>';
		$('#input_grade').append(nameForStudent);
	});
});