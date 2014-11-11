var labelsComponents = function(idInput) {

	var max_input = 6;
	var $input, $container, $buttonAdd, $buttonReset;

	var init = function() {
		$input = $('#'+idInput);
		$input.wrap('<div class="container"></div>');
		$container = $input.closest('.container');

		$container
			.append('<input type="submit" value="Add '+idInput+'" class="button js-add">')
			.append('<input type="reset" value="Remove All" class="button js-reset">')
			.append('<div class="label_container"></div>');

		$buttonAdd = $container.find('.js-add');
		$buttonReset = $container.find('.js-reset');

		toggleDisableElements();
		attachEvents();
	};

	var isDuplicate = function( string ) {
		var isCondition = false;
		$container.find('.label').each(function( index, element ) {
			if ( $(element).find('span').text() === string ) {
				isCondition = true;
			}
		});
		return isCondition;
	};

	var toogleErrorMessage = function( text ) {
		$('p').remove();
		$('<p>'+ text +'</p>')
			.hide()
			.insertAfter($buttonReset)
			.show(200);
	};

	var toggleDisableElements = function() {
		var nrLabels = $container.find('.label').length;

		$buttonAdd.removeAttr('disabled');
		$input.removeAttr('disabled');
		$('p').remove();

		if ( nrLabels >= max_input ) {
			$buttonAdd.attr('disabled', 'disabled');
			$input.attr('disabled', 'disabled');
			toogleErrorMessage( 'You have reached maximum capacity. Remove a label to add a new message');
		}

		$buttonReset.removeAttr('disabled');
		if ( nrLabels === 0 ) {
			$buttonReset.attr('disabled', 'disabled');
		}
	};

	var addNewLabel = function(value) {
		var addContent = $('<div class="label"><a href="#">&times</a><span>' +value+'</span></div>');

		$('p').remove();
		$input.focus();

		if ( value.length === 0 ) {
			toogleErrorMessage('Please write a message in the input field.');
			return;
		}

		if ( isDuplicate(value) === true ) {
			toogleErrorMessage('You already written this message. Please write another message.');
			return;
		}

		addContent
			.hide()
			.appendTo( $container.find('.label_container') )
			.show(200);

		toggleDisableElements();
	};

	var attachEvents = function() {
		$input.on('input', function( e ) {
			removeErrorMessage('duplicate_err');
			if ( isDuplicate($(this).val()) === true ) {
				toogleErrorMessage('You already written this message. Please write another message.');
			}

			if ( $(this).val().trim().length !== 0 ) {
				removeErrorMessage('empty_err');
			}
		});

		$buttonAdd.click(function( e ) {
			e.preventDefault();
			var toAdd = $input.val().trim();
			addNewLabel( toAdd );
			$input.val('');
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
			$container.find('.label').hide(300, function() {
				$(this).remove();
				toggleDisableElements();
			});
		});

		$container.find('.label_container').on('dblclick', '.label', function() {
			var firstText = $(this).find('span').text();
			$(this).find('span').replaceWith('<input type="text" data-first-text="' +firstText+ '" name="edit_text" value="' +firstText+'">');
			$container.find('[name="edit_text"]').focus();
		});

		$container.find('.label_container').on('focusout', '.label', function() {
			var $inputEdit = $('[name="edit_text"]'),
				newText = $inputEdit.val().trim();

			if ( isDuplicate(newText) === true || newText === '' ){
				displayErrorMessage('You already written this message. Please write another message.', 'duplicate_err');
				$inputEdit.replaceWith('<span>' + $inputEdit.attr('data-first-text') + '</span>');
			} else {
				$inputEdit.replaceWith('<span>' + newText+ '</span>');
				$input.focus();
			}
		});
	};

	init();

	return {
		getNumber: function(){
			return $container.find('.labels').length;
		},
		addLabel: function(value){
			addNewLabel(value);
		},
		maxInput: function(value){
			max_input = value;
			toggleDisableElements();
		}
	};
};


