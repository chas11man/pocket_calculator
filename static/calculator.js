var lastNum = 0;
var memory = 0;
var operator = '';
var lastInput = $();
var result = '';

$(document).ready(function() {
	$(':button').click(function() {

		if ($(this).hasClass('num')) {
			if (lastInput.attr('id') == 'equ') {
				lastNum = 0;
				operator = '';
			}
			changeDisplay($(this).text());

			lastInput = $(this);

		} else if ($(this).hasClass('clr')) {
			if ($(this).attr('id') == 'clr') {
				lastNum = 0;
				operator = '';
				lastInput = $(this);
			}
			changeDisplay('clr');

		} else if ($(this).hasClass('opr')) {
			result = '';
			switch ($(this).attr('id')) {
				case 'equ':
					switch (operator) {
						case '+':
							result = add(lastNum, displayNum());
							break;
						case '-':
							result = subtract(lastNum, displayNum());
							break;
						case 'x':
							result = multiply(lastNum, displayNum());
							break;
						case '/':
							result = divide(lastNum, displayNum());
							break;
						default:
							result = displayNum();
					}

					if (lastInput.attr('id') != 'equ') {
						lastNum = displayNum();
					}
					break;

				case 'add':
					if (lastNum === 0 || lastInput.hasClass('opr')) {
						lastNum = displayNum();
					} else {
						result = add(lastNum, displayNum());
						lastNum = result;
					}
					operator = '+';
					break;

				case 'sub':
					if (lastNum === 0 || lastInput.hasClass('opr')) {
						lastNum = displayNum();
					} else {
						result = subtract(lastNum, displayNum());
						lastNum = result;
					}
					operator = '-';
					break;

				case 'mul':
					if (lastNum === 0 || lastInput.hasClass('opr')) {
						lastNum = displayNum();
					} else {
						result = multiply(lastNum, displayNum());
						lastNum = result;
					}
					operator = 'x';
					break;

				case 'div':
					if (lastNum === 0 || lastInput.hasClass('opr')) {
						lastNum = displayNum();
					} else {
						result = divide(lastNum, displayNum());
						lastNum = result;
					}
					operator = '/';
					break;

				case 'sqr':
					result = squareRoot(displayNum());
					break;

				case 'per':
					result = percent(lastNum, displayNum());
					break;

				default:
					console.log('fix something');
					break;
			}

			lastInput = $(this);
			changeDisplay(result);

		} else if ($(this).hasClass('neg')) {
			if (displayNum() !== 0 && !lastInput.hasClass('opr')) {
				changeDisplay('neg');
			}
		} else if ($(this).hasClass('mem')) {
			switch ($(this).attr('id')) {
				case 'mcl':
					memory = 0;
					break;
				case 'mrc':
					if (memory !== 0) {
						lastInput = $(this);
						changeDisplay(memory);
					}
					break;
				case 'mpl':
					memory = add(memory, displayNum());
					break;
				case 'mmi':
					memory = subtract(memory, displayNum());
					break;
			}

			if (memory !== 0) {
				$('#memory').css('visibility', 'visible');
			} else {
				$('#memory').css('visibility', 'hidden');
			}
		}
	});
});

function displayNum() {
	return +($('#display').text());
}

function displayTxt() {
	return $('#display').text();
}

function hasDecimal(number) {
	if (arguments.length == 1) {
		text = number.toString();
	} else {
		text = $('#display').text();
	}

	if (text.indexOf('.') === -1) {
		return false;
	}
	return true;
}

function isNegative(number) {
	if (arguments.length == 1) {
		text = number.toString();
	} else {
		text = $('#display').text();
	}

	if (text.indexOf('-') === 0) {
		return true;
	}
	return false;
}

function changeDisplay(input) {
	input = input.toString();
	var newDisp;

	if (input == 'clr') {
		newDisp = '0';
	} else if (input == '.') {
		if (!hasDecimal()) {
			newDisp = displayTxt() + input;
		}
	} else if (input == 'neg') {
		if (isNegative()) {
			newDisp = displayTxt().substring(1);
		} else {
			newDisp = '-' + displayTxt();
		}
	} else if (input.length && (displayNum() === 0 || lastInput.hasClass('opr') || lastInput.hasClass('mem'))) {
		newDisp = input;
	} else {
		newDisp = displayTxt() + input;
	}

	var digits = 10;
	if (isNegative(newDisp)) {
		digits++;
	}
	if (hasDecimal(newDisp)) {
		digits++;
	}

	$('#display').text(newDisp.substring(0, digits));
}

function add(a, b) {
	var addResult = null;
	$.ajax({
		url: '/add',
		data: {a: a, b: b},
		async: false,
		success: function(data) {
			addResult = data['result'];
		}
	});
	return addResult;
}

function subtract(a, b) {
	var subResult = null;
	$.ajax({
		url: '/subtract',
		data: {a: a, b: b},
		async: false,
		success: function(data) {
			subResult = data['result'];
		}
	});
	return subResult;
}

function multiply(a, b) {
	var mulResult = null;
	$.ajax({
		url: '/multiply',
		data: {a: a, b: b},
		async: false,
		success: function(data) {
			mulResult = data['result'];
		}
	});
	return mulResult;
}

function divide(a, b) {
	var divResult = null;
	$.ajax({
		url: '/divide',
		data: {a: a, b: b},
		async: false,
		success: function(data) {
			divResult = data['result'];
		}
	});
	return divResult;
}

function squareRoot(a) {
	var sqrResult = null;
	$.ajax({
		url: '/square_root',
		data: {a: a},
		async: false,
		success: function(data) {
			sqrResult = data['result'];
		}
	});
	return sqrResult;
}

function percent(a, b) {
	var perResult = null;
	$.ajax({
		url: '/percent',
		data: {a: a, b: b},
		async: false,
		success: function(data) {
			perResult = data['result'];
		}
	});
	return perResult;
}
