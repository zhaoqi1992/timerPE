$('document').ready(function() {
	var min = 0,
		sec = 0,
		msec = 0;
	var timerInterval;
	var clicknumber_pause = 0,
		clicknumber_count = 0;
	var text = '';
	var listNumber = 0;
	var studentList = new Array();
	$('#Ok').attr('disabled', 'disabled');

	function Student(name, order, grade) {
		this.name = name;
		this.order = order;
		this.grade = grade;
	}

	function getHistory() {
		var history = localStorage.getItem('history');
		if (!history) {
			history = '';
		}
		$('#history').empty().show();
		$('#result').empty();
		var historyItem = history.split(',');
		for (var j = 1; j < historyItem.length; j++) {
			var newTitle = '<li class="list-group-item historyItem btn">' + historyItem[j] + '</li>';
			$('#history').append(newTitle);
		}
		$('li.historyItem').click(function() {
			$('#history').hide();
			var tableName = $(this).text();
			var table = localStorage.getItem(tableName);
			table = JSON.parse(table);
			for (var i = 0; i < table.length; i++) {
				var name = table[i].name;
				var order = table[i].order;
				var grade = table[i].grade;
				var item = "<tr><td>No." + order + '</td><td>' + grade + '</td><td>' + name + '</td></tr>';
				$('#result').append(item);
			}
			// var deleteButton = '<button class="btn deleteTable">delete</button>';
			// $('#result').append(deleteButton);
			// localStorage.removeItem(tableName);
			// $('button .deleteTable').click(function() {
			// 	var p = history.indexOf(tableName);
			// 	history.splice(p-1, tableName.length+1);
			// 	alert(history);
			// 	localStorage.setItem(history);
			// 	alert('delete'+tableName);
			// });
		});
	}

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
		clicknumber_count = 0;
		listNumber = 0;
		$('h1').text('00:00:00');
		$('#start').text('start');
		$('#result').empty();
		$('#grade').empty().show();
		$('#history').empty();
		$('#input_name div').remove();
		$('#show').removeAttr('disabled');
		$('#start').removeAttr('disabled');
		$('#count').removeAttr('disabled');
		$('#toNext').removeAttr('disabled');
		$('#Ok').removeAttr('disabled');
		studentList = new Array();
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
		clicknumber_count++;
		addZeroToTime();
		$('h1').text(text);
		// var grade_table = '<tr><td>' + clicknumber_count + '</td><td>' + text + '</td></tr>';
		var grade_div = '<tr><td class="order">No.' + clicknumber_count + '</td> <td class="time">' + text + '</td></tr>';
		// $('#result').append(grade_table);
		$('#grade').append(grade_div);
	});
	$('#show').click(function() {
		$('#grade').hide();
		$('#show').attr('disabled', 'disabled');
		$('#count').attr('disabled', 'disabled');
		$('#start').attr('disabled', 'disabled');
		clearInterval(timerInterval);
		var time = $('#grade tr .time');
		var order = $('#grade tr .order');
		var gradeForStudent = '<div>' + time.eq(listNumber).text() + '</div>';
		$('#input_name').append(gradeForStudent);
		// var item = "<tr><td>"+i+'</td><td>'+time.eq(i).text()+'</td><td>'+name+'</td></tr>';
		// $('#result').append(item);
		$('#toNext').click(function(event) {
			/* Act on the event */
			if (listNumber < time.length) {
				var name = $('#input_name input#addName').val();
				if (name) {
					var item = "<tr><td>No." + (listNumber + 1) + '</td><td>' + time.eq(listNumber).text() + '</td><td>' + name + '</td></tr>';
					$('#result').append(item);
					var newStudent = new Student(name, listNumber + 1, time.eq(listNumber).text());
					studentList.push(newStudent);
					listNumber++;
					gradeForStudent = '<div>' + time.eq(listNumber).text() + '</div>';
					$('#input_name div').replaceWith(gradeForStudent);
					$('#input_name input#addName').val('');
				}
			}
			if (listNumber == time.length) {
				$('#toNext').attr('disabled', 'disabled');
				$('#Ok').removeAttr('disabled');
			}
		});
		$('#Ok').click(function() {
			var history = localStorage.getItem('history');
			if (!history) {
				history = '';
			}
			$('#input_name input#addName').val('');
			$('#Ok').attr('disabled', 'disabled');
			var newTittle = $('#input_name input#addTittle').val();
			history += ',' + newTittle;
			localStorage.setItem('history', history);
			var storageStydentList = JSON.stringify(studentList);
			localStorage.setItem(newTittle, storageStydentList);
			if (newTittle) {
				$('#history').append('<li class="list-group-item">' + newTittle + '</li>');
			}
			$('#input_name input#addTittle').val('');
			listNumber = 0;
		});
	});
	$('#showHistory').click(getHistory);
});