# zParallel

JQuery Plugin to simulate parallel execution of a function(nextThis) during idle time during idle time for objects from jQuery selector.

      // Example of an original code:

       $("input[name$='xxx'],...").each( function(){runForThis(this)}, ticksToRun );

      // The updated code using the Plugin:

        $(document).zParallel({
              name: "Example",
              selectorToRun: "input[name$='xxx'],...",
              funcRun: runForThis
          });
    
    
    
// Testing zParallel Plugin:    https://jsfiddle.net/NickU/1xt8L7co/59/

      <html>
        <body>
          <table id="tbl1">
      </table>
      </body>
      </html>



// JS code

      (function ($)
      {

          var tab1 = $('#tbl1');
          for (i = 0; i < 1000; i++)
              $("<tr>"+
              "<td>#" + i + "</td>"+
              "<td><input id='a_" + i + "' value='" + i + "' >"+
              "</td><td><input id='b_" + i + "' value='" + i + "' ></td></tr>")
                  .appendTo(tab1);

          $(document).zParallel({
              name: "A",
              selectorToRun: "input[id^='a_']",
              funcRun: function (nextThis)
              {
                  var $this = $(nextThis);

                  var nowDateTime = Date.now();
                  var i = 0;
                  while( Date.now() < nowDateTime + 2)
                        i++;

                  $this.val( i );
                  if (i > 100)
                      $this.css('color', 'green').css('font-weight', 'bold');
                  else
                      $this.css('color', 'blue');
              }
          });


          $(document).zParallel({
              name: "B",
              selectorToRun: "input[id^='b_']",
              funcRun: function (nextThis)
              {
                  var $this = $(nextThis);

                  var nowDateTime = Date.now();
                  var i = 0;
                  while( Date.now() < nowDateTime + 2)
                        i++;

                  $this.val( i );

                  if (i > 100)
                      $this.css('background', '#BBFFBB');
                  else
                      $this.css('background', '#FFBBBB');
              }
          });
      })(jQuery);



