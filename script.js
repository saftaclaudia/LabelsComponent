var labelsComponents = function(input){
	var max_input = 6;
	$('#'+input).wrap('<div class="container"></div>');
	$('<div class="label_container_'+input+'"></div>').insertAfter($('#'+input));
	$('<input type="reset" id="resetButton_'+input+'" value="Remove All" class="button">').insertAfter($('#'+input));
	$('<input type="submit" id="button_'+input+'" value="Add '+input+'" class="button">').insertAfter($('#'+input));

	var isDuplicate = function( string ) {
		var isCondition = false;
		$('.label_'+input).each(function( index, element ) {
			if ( $(element).find('span').text() === string ) {
				isCondition = true; 
			}
		});
		return isCondition;
	};

	var displayErrorMessage = function( text, id ) {
		$('p').remove();
		$('<p id='+ id +'>'+ text +'</p>')
			.hide()
			.insertAfter($('#resetButton_'+input))
			.show(200);
	};

	var removeErrorMessage = function( id ) {
		$('#' + id).remove();
	};

	$('#'+input).on('input', function( e ) {
		removeErrorMessage('duplicate_err');
		if ( isDuplicate($(this).val()) === true ) {
			displayErrorMessage('You already written this message. Please write another message.', 'duplicate_err');
		}

		if ( $(this).val().trim().length !== 0 ) {
			removeErrorMessage('empty_err');
		}
	});

	var disableButton = function() {
		$('#button_'+input).removeAttr('disabled');
		$('#'+input).removeAttr('disabled');
		$('p').remove();
		if ( $('.label_'+input).length === max_input ) {
			$('#button_'+input).attr('disabled', 'disabled');
			$('#'+input).attr('disabled', 'disabled');
			displayErrorMessage( 'You have reached maximum capacity. Remove a label to add a new message' , 'max_err');
		}

		$('#resetButton_'+input).removeAttr('disabled');
		if ( $('.label_'+input).length === 0 ) {
			$('#resetButton_'+input).attr('disabled', 'disabled');
		}
	};
	disableButton();

	$('#button_'+input).click(function( e ) {
		e.preventDefault();
		var toAdd = $('#'+input).val().trim();
		var addContent = $('<div class="label_'+input+'"><a href="#">&times</a><span>' +toAdd+'</span></div>');
		$('p').remove();
		$('#'+input).focus();  

		if ( toAdd.length === 0 ) {
			displayErrorMessage('Please write a message in the input field.', 'empty_err');
			return;
		}

		if ( isDuplicate(toAdd) === true ) {
			displayErrorMessage('You already written this message. Please write another message.', 'duplicate_err');
			return;
		}

		addContent
			.hide()
			.appendTo($('.label_container_'+input))
			.show(200);

		$('#'+input).val(''); 

		disableButton();
	});

	$('.label_container_'+input).on('click', 'a', function( e ) {
		e.preventDefault();
		$(this).closest('.label_'+input).hide(300, function() {
			$(this).remove();
			disableButton();
		});
	});

	$('#resetButton_'+input).click(function(e) {
		e.preventDefault();
		$('.label_'+input).hide(300, function() {
			$(this).remove();
			disableButton();
		});
	});

	var change_input = function(){
		$('.label_container_'+input).on('dblclick', '.label_'+input, function() {
			var firstText = $(this).find('span').text();
			$(this).find('span').replaceWith('<input type="text" data-first-text="' +firstText+ '"  name="edit_text" id="edit_text_'+input+'" value="' +firstText+'">');
			$('#edit_text'+input).focus();
		});

		$('.label_container_'+input).on('focusout', '.label_'+input, function() {
			var newText = $('#edit_text_'+input).val().trim();
			if ( isDuplicate(newText) === true || newText === '' ){
				displayErrorMessage('You already written this message. Please write another message.', 'duplicate_err');
				$('#edit_text_'+input).replaceWith('<span>' + $('#edit_text_'+input).attr('data-first-text') + '</span>');
				return;
			}
			else{
				$('#edit_text_'+input).replaceWith('<span>' + newText+ '</span>');
				$('#'+input).focus();
			}
		});
	}
	change_input();
};



$(document).ready(function() {
	labelsComponents('labels');
	labelsComponents('hobbies');
});
