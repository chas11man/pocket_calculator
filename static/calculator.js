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
		    lastNum = 0;
		    operator = '';
		    lastInput = $(this);
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
		            
		        default:
		            console.log('fix something');
		            break;
		    }
		    
		    lastInput = $(this);
		    changeDisplay(result);
		    
		} else if ($(this).hasClass('neg')) {
		    changeDisplay('neg');
		}
	});
});

function displayNum() {
    return +($('#display').text());
}

function displayTxt() {
    return $('#display').text();
}

function hasDecimal() {
    if ($('#display').text().indexOf('.') === -1) {
        return false;
    }
    return true;
}

function isNegative() {
    if ($('#display').text().indexOf('-') === 0) {
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
    } else if (input.length && (displayNum() === 0 || lastInput.hasClass('opr'))) {
		newDisp = input;
	} else {
		newDisp = displayTxt() + input;
	}
	
	$('#display').text(newDisp.substring(0,10));
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