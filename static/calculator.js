var lastNum = 0;
var memory = 0;
var operator = '';
var lastInput = $();
var result = 0;

$(document).ready(function() {
	$(':button').click(function() {
	    
		if ($(this).hasClass('num')) {
		    if (lastInput.attr('id') == 'equ') {
		        lastNum = 0;
		        operator = '';
		    }
			changeDisplay($(this).text());
			
		} else if ($(this).hasClass('clr')) {
		    lastNum = 0;
		    operator = '';
		    lastInput = $(this);
		    changeDisplay('clr');
		    
		} else if ($(this).hasClass('opr')) {
		    
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
                    lastInput = $(this);
                    changeDisplay(result);
		            break;
		        
		        case 'add':
		            if (lastNum === 0 || lastInput.hasClass('opr')) {
		                lastNum = displayNum();
		                operator = '+';
		            } else {
		                result = add(lastNum, displayNum());
		                lastNum = result;
		                operator = '+';
		                lastInput = $(this);
		                changeDisplay(result);
		            }
		            break;
		            
                case 'sub':
                    if (lastNum === 0 || lastInput.hasClass('opr')) {
		                lastNum = displayNum();
		                operator = '-';
		            } else {
		                result = subtract(lastNum, displayNum());
		                lastNum = result;
		                operator = '-';
		                lastInput = $(this);
		                changeDisplay(result);
		            }
		            break;
		            
		        default:
		            console.log('fix something');
		            break;
		    }
		}
		
		lastInput = $(this);
	});
});

function displayNum() {
    return +($('#display').text());
}

function changeDisplay(input) {
    input = input.toString();
    var newDisp;

    if (input == 'clr') {
        newDisp = '0';
    } else if (+(displayNum()) === 0 || lastInput.hasClass('opr')) {
		newDisp = input;
	} else {
		newDisp = displayNum() + input;
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

function subtract(a, b) { }

function multiply(a, b) { }

function divide(a, b) { }