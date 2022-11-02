
$(function()
{
    function after_form_submitted(data) 
    {				

/*** Client Leads *********/		
		data.cid = '36';
		data.pid = '61';			
		data.url = window.location.href;
		data.flag = 'LSPWC';		
		
		$.ajax({
                type: "POST",
                url: 'http://onedotm.net/demo/api/api.php',
				//url: 'http://live3.onedotm.com/api/api.php',
                data: { result : data },
                success: function(data){
					console.log(data);
					//alert(data.sent_to);
				},
                dataType: 'json' 
            });    
/*** END ******/
			
        if(data.result == 'success')
        {
            $('form#reused_form').hide();
            $('#success_message').show();
            $('#error_message').hide();
        }
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });
            
        }//else
    }

	$('#reused_form').submit(function(e)
      {
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' ); 
            $btn.prop('orig_label',$btn.text());
            $btn.text('Sending ...');
        });
        

                    $.ajax({
                type: "POST",
                url: './mail/handler.php',
                data: $form.serialize(),
                success: after_form_submitted,
                dataType: 'json' 
            });        
        
      });	
});



$(function()
{
	$('#captcha_reload').on('click',function(e)
	{
	  e.preventDefault();
	  d = new Date();
	  var src = $("img#captcha_image").attr("src");
	  src = src.split(/[?#]/)[0];
	  
	  $("img#captcha_image").attr("src", src+'?'+d.getTime());
	});
});