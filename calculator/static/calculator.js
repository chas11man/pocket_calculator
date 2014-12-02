var lastNum = 0;
var memory = 0;
var operator = '';
var lastInput = $();
var result = '';

/**
 *  Button press logic handler
 */

$(document).ready(function() {
	$(':button').click(function() {

		// Numbers and decimal
		if ($(this).hasClass('num')) {
			if (lastInput.attr('id') == 'equ') {
				lastNum = 0;
				operator = '';
			}
			changeDisplay($(this).text());
			lastInput = $(this);

		// C or CE
		} else if ($(this).hasClass('clr')) {
			if ($(this).attr('id') == 'clr') {
				lastNum = 0;
				operator = '';
				lastInput = $(this);
			}
			changeDisplay('clr');

		// Operators: =, +, -, *, /, %, sqrRoot
		} else if ($(this).hasClass('opr')) {
			result = '';
			switch ($(this).attr('id')) {
				case 'equ':
					result = checkLastOperator();

					if (lastInput.attr('id') != 'equ') {
						lastNum = displayNum();
					}
					break;

				case 'add':
					defaultOperator();
					operator = '+';
					break;

				case 'sub':
					defaultOperator();
					operator = '-';
					break;

				case 'mul':
					defaultOperator();
					operator = 'x';
					break;

				case 'div':
					defaultOperator();
					operator = '/';
					break;

				case 'sqr':
					result = squareRoot(displayNum());
					break;

				case 'per':
					if (lastNum !== 0) {
						result = percent(lastNum, displayNum());
					}
					break;

				default:
					console.log("Something's broken, fix it!");
					break;
			}

			lastInput = $(this);
			changeDisplay(result);

		// +/-
		} else if ($(this).hasClass('neg')) {
			if (displayNum() !== 0 && !lastInput.hasClass('opr')) {
				changeDisplay('neg');
			}

		// Memory: MC, MR, M+, M-
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

/**
 * Display handlers
 */

function changeDisplay(input) {
	input = input.toString();
	var newDisp;

	// Clear display
	if (input == 'clr') {
		newDisp = '0';

	// Decimal button
	} else if (input == '.') {
		if (!hasDecimal()) {
			newDisp = displayTxt() + input;
		}

	// +/- button
	} else if (input == 'neg') {
		if (isNegative()) {
			newDisp = displayTxt().substring(1);
		} else {
			newDisp = '-' + displayTxt();
		}

	// If a fresh input or if display can be cleared
	} else if ( input.length > 0 && (
					(displayNum() === 0 && !hasDecimal()) ||
					lastInput.hasClass('opr') ||
					lastInput.hasClass('mem'))) {
		newDisp = input;

	// Number buttons
	} else {
		newDisp = displayTxt() + input;
	}

	var digits = 10;
	if (isNegative(newDisp)) { digits++; }
	if (hasDecimal(newDisp)) { digits++; }

	$('#display').text(newDisp.substring(0, digits));
}

/**
 * Helper functions
 */

function displayNum() {
	return +($('#display').text());
}

function displayTxt() {
	return $('#display').text();
}

function toScientific(number) {
	number = +(number);
	return number.toExponential(2);
}

function hasDecimal(number) {
	if (arguments.length == 1) {
		text = number.toString();
	} else {
		text = displayTxt();
	}

	if (text.indexOf('.') === -1) {
		return false;
	} else {
		return true;
	}
}

function isNegative(number) {
	if (arguments.length == 1) {
		text = number.toString();
	} else {
		text = displayTxt();
	}

	if (text.indexOf('-') === 0) {
		return true;
	} else {
		return false;
	}
}

function checkLastOperator() {
	switch (operator) {
		case '+':
			return add(lastNum, displayNum());
			break;
		case '-':
			return subtract(lastNum, displayNum());
			break;
		case 'x':
			return multiply(lastNum, displayNum());
			break;
		case '/':
			return divide(lastNum, displayNum());
			break;
		default:
			return displayNum();
			break;
	}
}

function defaultOperator() {
	if (lastNum === 0 || lastInput.hasClass('opr')) {
		lastNum = displayNum();
	} else {
		result = checkLastOperator();
		lastNum = result;
	}
}

/**
 * API caller functions
 */

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
