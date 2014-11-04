var labelsComponents = function(idInput){
	var max_input = 6;
	
	var $input = $('#'+idInput);
	$input.wrap('<div class="container"></div>');
	var $container = $input.closest('.container');
	
	$container
		.append('<input type="submit" value="Add '+idInput+'" class="button add_js">')
		.append('<input type="reset" value="Remove '+idInput+'" class="button reset_js">')
		.append('<div class="label_container"></div>');
	
	var $buttonAdd = $container.find('.add_js');
	var $buttonReset = $container.find('.reset_js');



	var isDuplicate = function( string ) {
		var isCondition = false;
		$container.find('.label').each(function( index, element ) {
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
			.insertAfter($buttonReset)
			.show(200);
	};

	var removeErrorMessage = function( id ) {
		$('#' + id).remove();
	};

	$input.on('input', function( e ) {
		removeErrorMessage('duplicate_err');
		if ( isDuplicate($(this).val()) === true ) {
			displayErrorMessage('You already written this message. Please write another message.', 'duplicate_err');
		}

		if ( $(this).val().trim().length !== 0 ) {
			removeErrorMessage('empty_err');
		}
	});

	var toggleDisableElements = function() {
		var nrLabels = $container.find('.label').length;

		$buttonAdd.removeAttr('disabled');
		$input.removeAttr('disabled');
		$('p').remove();
		if ( nrLabels >= max_input ) {
			$buttonAdd.attr('disabled', 'disabled');
			$input.attr('disabled', 'disabled');
			displayErrorMessage( 'You have reached maximum capacity. Remove a label to add a new message' , 'max_err');
		}
		$buttonReset.removeAttr('disabled');
		if ( nrLabels === 0 ) {
			$buttonReset.attr('disabled', 'disabled');
		}
	};
	toggleDisableElements();

	var addNewLabel = function(value) {
		var addContent = $('<div class="label"><a href="#">&times</a><span>' +value+'</span></div>');

		$('p').remove();
		$input.focus();

		if ( value.length === 0 ) {
			displayErrorMessage('Please write a message in the input field.', 'empty_err');
			return;
		}

		if ( isDuplicate(value) === true ) {
			displayErrorMessage('You already written this message. Please write another message.', 'duplicate_err');
			return;
		}

		addContent
			.hide()
			.appendTo( $container.find('.label_container') )
			.show(200);

		toggleDisableElements();
	};

	$buttonAdd.click(function( e ) {
		e.preventDefault();
		var toAdd = $input.val().trim();
		$input.val(''); 
	    addNewLabel( toAdd );
		toggleDisableElements();
	});

	$container.find('.label_container').on('click', 'a', function( e ) {
		e.preventDefault();
		$(this).closest('.label').hide(300, function() {
			$(this).remove();
			toggleDisableElements();
		});
	});

	$buttonReset.click(function(e) {
		e.preventDefault();
		$('.label').hide(300, function() {
			$(this).remove();
			toggleDisableElements();
		});
	});

	var change_input = function(){
		$container.find('.label_container').on('dblclick', '.label', function() {
			var firstText = $(this).find('span').text();
			$(this).find('span').replaceWith('<input type="text" data-first-text="' +firstText+ '"  name="edit_text" id="edit_text" value="' +firstText+'">');
			$('#edit_text').focus();
		});

		$container.find('.label_container').on('focusout', '.label', function() {
			var newText = $('#edit_text').val().trim();
			if ( isDuplicate(newText) === true || newText === '' ){
				displayErrorMessage('You already written this message. Please write another message.', 'duplicate_err');
				$('#edit_text').replaceWith('<span>' + $('#edit_text').attr('data-first-text') + '</span>');
				return;
			}
			else{
				$('#edit_text').replaceWith('<span>' + newText+ '</span>');
				$input.focus();
			}
		});
	}
	change_input();
};



$(document).ready(function() {
	labelsComponents('labels');
	labelsComponents('hobbies');
});
