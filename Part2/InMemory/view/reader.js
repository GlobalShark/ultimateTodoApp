
$('#action-todo').click(function(){

	var recognition = new webkitSpeechRecognition();

	  recognition.continuous = false;
	  recognition.interimResults = false;

	  recognition.lang = "en-US";

	  recognition.start();
	  
      recognition.onresult = function(e) {
       	var textTodo = document.getElementById('text-todo').value
                                 = e.results[0][0].transcript;
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[2];

        if( textTodo === 'hi' || textTodo === 'how are you' || textTodo === 'open GitHub' || textTodo === 'open profile' || textTodo === 'Zeeshan Hanif' || textTodo === 'open Facebook' || textTodo === 'open Google' || textTodo === 'open YouTube' || textTodo === 'open Gmail' || textTodo === 'open localhost'){
        	if(textTodo === 'open Facebook'){window.open('https://fb.com', '_blank');}
        	if(textTodo === 'open Google'){window.open("http://google.com", '_blank');}
        	if(textTodo === 'open YouTube'){window.open("http://youtube.com", '_blank');}
          if(textTodo === 'open Gmail'){window.open("http://gmail.com", '_blank');}
          if(textTodo === 'open profile'){window.open("http://fb.com/ziakhan", '_blank');}
          if(textTodo === 'Zeeshan Hanif'){window.open("http://fb.com/zeeshanhanif", '_blank');}
          if(textTodo === 'open GitHub'){window.open("http://github.com", '_blank');}
        	if(textTodo === 'how are you'){
            msg.text = 'I Am Fine, How Are you';
            speechSynthesis.speak(msg); 
          }
          if(textTodo === 'hi'){
            msg.text = 'hey, Kesay Ho?';
            speechSynthesis.speak(msg); 
          }
        	if(textTodo === 'open localhost'){window.open("http://localhost/tez/view/main.php", '_blank');}
        }else{
    			msg.text = textTodo;
    			speechSynthesis.speak(msg);	
          addItem();
        }
        document.getElementById('text-todo').value = '';
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }

  });
