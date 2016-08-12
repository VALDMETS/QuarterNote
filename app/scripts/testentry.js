import {Howl} from 'howler';
import $ from 'jquery';

// pulls music file from dropbox, since uploading bank to website would be cumbersome. Allows on-demand song pulls.

let sound = new Howl({
  src: ['https://www.dropbox.com/s/16ntxe5gx9dixav/merchantnew.mp3?dl=1']
});

sound.play();

sound.on('load', function(){
  console.log('synced with start of sound!');
  letterPunch(['wow ','this ','is ','an ', 'awe','some ','app!']);
});

// structure for 'animating' text

function letterPunch(array){
  setTimeout(function(){
    $('#message-container').append(`<span>${array[0]}</span>`);
    setTimeout(function(){
      $('#message-container').append(`<span>${array[1]}</span>`);
      setTimeout(function(){
        $('#message-container').append(`<span>${array[2]}</span>`);
        setTimeout(function(){
          $('#message-container').append(`<span>${array[3]}</span>`);
          setTimeout(function(){
            $('#message-container').append(`<span>${array[4]}</span>`);
            setTimeout(function(){
              $('#message-container').append(`<span>${array[5]}</span>`);
              setTimeout(function(){
                $('#message-container').append(`<span>${array[6]}</span>`);
              },250);
            },750);
          },125);
        },125);
      },750);
    },3000);
  },8000);
}
