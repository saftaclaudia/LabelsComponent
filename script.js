$(document).ready(function(){
  var max_input=6; 
  $('<div class="add_input"></div>').appendTo($('form'));
  
  $('#button').click(function(e){
    e.preventDefault();
    var toAdd= $('input[name=user_input]').val().trim();
    var addContent= $('<div class="add"><a href="#">&times</a><span>' +toAdd+'</span></div>');
    $('p').remove();
    $('#user_input').focus();  
    
    var displayErrorMessage = function(text) {
      $('<p>'+ text +'</p>')
        .hide()
        .insertAfter($('#resetButton'))
        .show(200);
    };

    if(toAdd.length === 0){
      displayErrorMessage('Please write a message in the input field.');
      return;
    }

    if($('.add').length === max_input){
      displayErrorMessage('You have reached maximum capacity. Remove a label to add a new message'); 
      return;
    }

    var isDuplicate = false;
    $('.add').each(function(index, element){
      if($(element).find('span').text() === toAdd){
        isDuplicate = true;
      }
    });

    if( isDuplicate === true){
      displayErrorMessage('You already written this message. Please write another message.');
      return;
    }

    addContent
      .hide()
      .appendTo($('.add_input'))
      .show(200);
    $('#user_input').val('');  
  });
       
  $('.add_input').on('click', 'a', function(e){
    e.preventDefault();
    $(this).closest('.add').hide(300, function(){
      $(this).remove();
    });
  });

  $('#resetButton').click(function(e){
    e.preventDefault();
    $('.add').hide(300, function(){
      $(this).remove();
    });
  });

});

 