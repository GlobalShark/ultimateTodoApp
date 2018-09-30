

	$('.todo-wrap').each(function( index ) {
  //       var msg = new SpeechSynthesisUtterance();
  //       var voices = window.speechSynthesis.getVoices();
  //       msg.voice = voices[2];
		// msg.text = $( this ).text();
		// speechSynthesis.speak(msg);
	});


  function startDictation() {

	var recognition = new webkitSpeechRecognition();

	  recognition.continuous = false;
	  recognition.interimResults = false;

	  recognition.lang = "en-US";

	  recognition.start();
	  
      recognition.onresult = function(e) {
       	var textTodo = document.getElementById('text-todo').value
                                 = e.results[0][0].transcript;
        addItem();

        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[2];

        if( textTodo === 'Facebook' || textTodo === 'Google' || textTodo === 'YouTube' || textTodo === 'Gmail' || textTodo === 'localhost'){
        	if(textTodo === 'Facebook'){window.location.href = "http://fb.com";}
        	if(textTodo === 'Google'){window.location.href = "http://google.com";}
        	if(textTodo === 'YouTube'){window.location.href = "http://youtube.com";}
        	if(textTodo === 'Gmail'){window.location.href = "http://gmail.com";}
        	if(textTodo === 'localhost'){window.location.href = "http://localhost/tez/view/main.php";}
        }else{
			msg.text = textTodo;
			speechSynthesis.speak(msg);	
        }
        document.getElementById('text-todo').value = '';

      };

      recognition.onerror = function(e) {
        recognition.stop();
      }

  }
