  $(document).ready(function(){
          var max_input=6;
          var x=0; 
          $('#button').click(function(){
            var toAdd= $('input[name=user_input]').val();
              if(x< max_input){
               x++;
               $('.add_input').append('<div class="add"><a href="#">&times</a>' +toAdd+ '</div>');
              };
          });
        $('.add_input').on('click' , 'a', function(){
          $(this).click('.add').remove();
        });
        });
 