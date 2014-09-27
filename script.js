$(document).ready(function(){
  var max_input=6; 

  $('#button').click(function(e){
    e.preventDefault();
    var toAdd= $('input[name=user_input]').val().trim();
    var addContent= $('<div class="add"><a href="#">&times</a><span>' +toAdd+'</span></div>');
    $('p').remove();

    if(toAdd.length === 0){
      $('<p>Please write a message in the input field.</p>')
        .hide()
        .insertAfter($('form'))
        .show(200); 
      return;
    }

    if($('.add').length === max_input){
      $('<p>You have reached maximum capacity. Remove a label to add a new message</p>')
        .hide()
        .insertAfter($('form'))
        .show(200); 
      return;
    }

    var isDuplicate = false;
    $('.add').each(function(index, element){
      if($(element).find('span').text() === toAdd){
        isDuplicate = true;
      }
    });
    
    if( isDuplicate === true){
      $('<p>You already written this message. Please write another message.</p>')
        .hide()
        .insertAfter($('form'))
        .show(200); 
      return;
    }

    addContent
      .hide()
      .appendTo($('.add_input'))
      .show(200);

    $('#user_input').val('').focus();  
  });
       
  $('.add_input').on('click', 'a', function(e){
    e.preventDefault();
    $(this).closest('.add').hide(300, function(){
      $(this).remove();
    });
  });

});

 