$(document).ready(function(){
  var max_input=6; 

  $('#button').click(function(e){
    e.preventDefault();
    var toAdd= $('input[name=user_input]').val();
    var addContent= $('<div class="add"><a href="#">&times</a>' +toAdd+ '</div>');
    if($('.add').length < max_input && toAdd.length > 0){
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
 