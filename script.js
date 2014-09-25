$(document).ready(function(){
  var max_input=6; 

  $('#button').click(function(e){
    e.preventDefault();
    var toAdd= $('input[name=user_input]').val();
    var addContent= $('<div class="add"><a href="#">&times</a>' +toAdd+ '</div>');
    
    if($('.add').length === max_input && $('.message_1').length<1 && toAdd.length > 0){
      $('.add_input').prepend('<p class="message_1">text1</p>');
    };

    $('.add').each(function(element){
      if( $('element').text() === toAdd && $('.message_1').length<1 && toAdd.length > 0){
        $('.add_input').prepend('<p class="message_2">text2</p>');
      };
    });

   if($('.add').length < max_input && toAdd.length > 0 && toAdd !== ""){
      $('.add_input').append(addContent);
      $('#user_input').val('');
      $('#user_input').focus();
    };
  });
       
  $('.add_input').on('click', 'a', function(e){
    e.preventDefault();
    $(this).closest('.add').remove();
  });

});
 