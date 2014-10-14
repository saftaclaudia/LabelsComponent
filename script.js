$(document).ready(function(){
  var max_input=6;
  var firstText;

  $('<div class="label_container"></div>').appendTo($('form'));
  
  var isDuplicate = function(string){
	var isCondition = false;
	$('.label').each(function(index, element){
	  if($(element).find('span').text() === string){
		isCondition = true; 
	  }
	});
	return isCondition;
  };

  var displayErrorMessage = function(text, id) {
  	$('p').remove();
	$('<p id='+ id +'>'+ text +'</p>')
	  .hide()
	  .insertAfter($('#resetButton'))
	  .show(200);
  };

  var removeErrorMessage =function(id){
	$('#' + id).remove();
  }

  $('#user_input').on('input', function(e){
	if( isDuplicate($(this).val()) === true){
	  displayErrorMessage('You already written this message. Please write another message.', 'duplicate_err');
	}
	else{
	  removeErrorMessage('duplicate_err');
	}
	if($(this).val().trim().length !== 0){
	  removeErrorMessage('empty_err');
	}
  });

 var disableButton = function(){
	if($('.label').length === max_input){
	  $('#button').attr('disabled', 'disabled');
	  $('#user_input').attr('disabled', 'disabled');
	  displayErrorMessage( 'You have reached maximum capacity. Remove a label to add a new message' , 'max_err');
	}

	else{
	  $('#button').removeAttr('disabled');
	  $('#user_input').removeAttr('disabled');
	  $('p').remove();
	}

	if($('.label').length === 0){
	  $('#resetButton').attr('disabled', 'disabled');
	}

	else{
	  $('#resetButton').removeAttr('disabled');
	}

};
  disableButton();
  
  $('#button').click(function(e){
	e.preventDefault();
	var toAdd= $('input[name=user_input]').val().trim();
	var addContent= $('<div class="label"><a href="#">&times</a><span>' +toAdd+'</span></div>');
	$('p').remove();
	$('#user_input').focus();  

	if(toAdd.length === 0){
	  displayErrorMessage('Please write a message in the input field.', 'empty_err');
	  return;
	}
	if(isDuplicate(toAdd) === true){
	  displayErrorMessage('You already written this message. Please write another message.', 'duplicate_err');
	  return;
	}

	addContent
	  .hide()
	  .appendTo($('.label_container'))
	  .show(200);
	$('#user_input').val(''); 

	disableButton();
  });

  $('.label_container').on('click', 'a', function(e){
	e.preventDefault();
	$(this).closest('.label').hide(300, function(){
	  $(this).remove();
	  disableButton();
	});
  });

  $('#resetButton').click(function(e){
	e.preventDefault();
	$('.label').hide(300, function(){
	  $(this).remove();
	  disableButton();
	});
  });

  $('.label_container').on('dblclick', '.label', function(){
    firstText = $(this).find('span').text();
	$(this).find('span').replaceWith('<input type="text" name="edit_text" id="edit_text" value="' +firstText+'">' );
	$('#edit_text').focus();
  });

  $('.label_container').on('focusout', '.label', function(){
	var newText = $('input[name = edit_text]').val().trim();
	if(isDuplicate(newText) === true || newText === ''){
	  displayErrorMessage('You already written this message. Please write another message.', 'duplicate_err');
	  $('#edit_text').replaceWith('<span>' +firstText+ '</span>');
	  return;
	}
	else{
	  $('#edit_text').replaceWith('<span>' + newText+ '</span>');
	  $('#user_input').focus();
	} 


 });
 
});






