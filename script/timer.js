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
		$('#input_name div').remove();
		$('#show').removeClass('disabled');
		$('#start').removeClass('disabled');
		$('#count').removeClass('disabled');
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
		var grade_div = '<tr><td class="order">No.' + clciknumber_count + '</td> <td class="time">' + text + '</td></tr>';
		// $('#result').append(grade_table);
		$('#grade').append(grade_div);
	});
	$('#show').click(function() {
		$('#show').addClass('disabled');
		$('#count').addClass('disabled');
		$('#start').addClass('disabled');
		var i = 0;
		var time = $('#grade tr .time');
		var order = $('#grade tr .order');
		var nameForStudent = '<div>' + time.eq(i).text() + '</div>';
		$('#input_name').append(nameForStudent);
		// var item = "<tr><td>"+i+'</td><td>'+time.eq(i).text()+'</td><td>'+name+'</td></tr>';
		// $('#result').append(item);
		$('#toNext').click(function(event) {
			/* Act on the event */
			if (i < time.length) {
				var name = $('#input_name input').val();
				if (name) {
					var item = "<tr><td>No." + (i + 1) + '</td><td>' + time.eq(i).text() + '</td><td>' + name + '</td></tr>';
					$('#result').append(item);
					i++;
					nameForStudent = '<div>' + time.eq(i).text() + '</div>';
					$('#input_name div').replaceWith(nameForStudent);
					$('#input_name input').val('');
				}
			}
		});
	});
	$('#Ok').click(function() {
		$('#show').removeClass('disabled');
	});
});