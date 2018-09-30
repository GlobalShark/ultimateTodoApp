
$("#time-todo").val(moment().format('H:m'));

document.getElementById("date-todo").value = moment().add(1, 'days').format('MM/DD/YYYY');

$(function(){
  $('.repeat').click(function(){
      var classes =  $(this).parent().attr('class');
      $(this).parent().attr('class', 'animate');
      var indicator = $(this);
      setTimeout(function(){ 
          $(indicator).parent().addClass(classes);
      }, 20);
  });
});
function showTime(){
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var tD = new Date();
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][tD.getMonth()];
  var str = tD.getDate() + '-' + month + '-' + tD.getFullYear().toString().substr(-2);
  var time = str + ' ' + h + ":" + m + " " + session + '  Pakistan';
  document.getElementById("txt").innerText = time;
  document.getElementById("txt").textContent = time;
  
  setTimeout(showTime, 1000);

  $('.todo-wrap').each(function( index ) {
    var d1 = new Date( $(this).find('.timeLine').html() ).getTime();
    var d2 = new Date().getTime();
    // console.log( d1.toString().slice(0, -4)  + '=' + d2.toString().slice(0, -4) );
    if( d1.toString().slice(0, -4)  ===  d2.toString().slice(0, -4) ){
      var msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[2];
      msg.text = $(this).text();
      speechSynthesis.speak(msg);
    }
  });

}

showTime();

//addItem

  $('#add-todo').click(function(){
    addItem();
  });

  // remove items 

  function deleteItem(id){
    console.log(id);
    var parentItem = $('#'+id).parent();
    parentItem.animate({
      left:"-30%",
      height:0,
      opacity:0
    },200);
    setTimeout(function(){ $(parentItem).remove(); }, 1000);
    localStorage.removeItem(id);
  }

  function setClock() {
       var time = new Date(),
       minutes = time.getMinutes() * 6,
       hours = time.getHours() % 12 / 12 * 360 + (minutes / 12),
       seconds = time.getSeconds() * 6;
         
        $(".hours").css("transform", "rotate("+hours+"deg)");
        $(".seconds").css("transform", "rotate("+seconds+"deg)");
        $(".minutes").css("transform", "rotate("+minutes+"deg)");
  }
  function refresh() {
         setClock();
         setTimeout(refresh, 1000);
  }
  refresh();

  function addItem(argument) {
    var x = new Date().getTime();
    var time = $("#time-todo").val();
    var date = $("#date-todo").val();
    var todo = $("#text-todo").val();
    localStorage.setItem( x, todo+' '+date+' '+time);
    $('<span class="todo-wrap"><input type="checkbox" id="'+x+'"/><label for="'+x+'" class="todo"><i class="fa fa-check"></i>'
      +todo+'</label><div class="timeLine">At '
      +date+' '+time+'</div><span id="todo'+x+'" class="delete-item" title="remove" onClick="deleteItem('+x+')"><i class="fa fa-times-circle"></i></span>'
      +'<span class="update-item" title="remove" onClick="updateItem('+x+')"><i class="fa fa-edit"></i></span></span>').insertBefore('.todo-wrap:last');
    var todo = $("#text-todo").val('');
  }


  function updateItem(id){
    // sweet alert
    var time = $("#time-todo").val();
    var date = $("#date-todo").val();
    var newVal = prompt("Enter new value:",);
    if (newVal === "") {
        Swal('Value Is Empty','Are You Serious ?','warning')
    } else if (newVal) {
        Swal('Success','Updated Successfully','success')
        localStorage.setItem( id, newVal+' '+date+' '+time);
        setTimeout(function(){ location.reload(); }, 1000);
    } else {
        Swal('Canceled',' ','error')
    }
  }

  str = JSON.stringify(localStorage);
  obj = JSON.parse(str);

  console.log(localStorage)

  // print all data
  concatString = '';
  for (var key in obj){
  console.log(key)
    var key1 = localStorage.getItem(key).slice(0, -16);
    var key2 = localStorage.getItem(key).slice(1).slice(-16);
    concatString += '<span class="todo-wrap"><input id="'+key+'" type="checkbox" /><label for="'+key+'" class="todo"><i class="fa fa-check"></i>'
                      +key1+'</label><div class="timeLine">At '
                      +key2+'</div><span id="todo'+key+'" class="delete-item" title="remove" onClick="deleteItem('+key+')"><i class="fa fa-times-circle"></i></span>'
                      +'<span class="update-item" title="remove" onClick="updateItem('+key+')"><i class="fa fa-edit"></i></span></span>';
  }
  $( "#task" ).html(concatString);