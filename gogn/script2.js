document.addEventListener('DOMContentLoaded', function() {
  var videoID = window.location.search;
  console.log(videoID);
  var num = queryToNum(videoID);
  jsonRequest(num);
});

//Tekur '?id=' framan af query strengnum
function queryToNum(query) {
  var num = query.substring(4);
  return(num)
}

function jsonRequest(num) {
  var request = new XMLHttpRequest();
  request.open('GET', 'videos.json', true);
  // Setja loading gif meðan gögn eru sótt og unnið með þau
  var bida = document.querySelector('.bida');
  var loading = document.querySelector('.loading');
  loading.src = 'loading.gif';
  // Parsa og keyri show ef statuskóði er 200
  request.onload = function () {
    if (request.status == 200) {
      var data = JSON.parse(request.response);
      empty(bida);
      show(data,num);
    }
    else {
      empty(bida);
      bida.appendChild(document.createTextNode('Ekki tókst að sækja video.'));
      console.log('error');
    }
  }
  request.onerror = function() {
    empty(bida);
    bida.appendChild(document.createTextNode('Villa kom upp.'));
    console.error('Óþekkt villa');
  };

  request.send();
}

function show(data, num) {
  // Finn titil og set efst á síðu
  var nafn = document.querySelector('.titill');
  if (data.videos[num-1] == undefined) {
    empty(document.querySelector('.video'));
    empty(document.querySelector('.takkar'));
    nafn.appendChild(document.createTextNode('Video er ekki til.'));
  } else {
    nafn.appendChild(document.createTextNode(data.videos[num-1].title));


    // Finn hvaða video á að birta
    var videoSlod = data.videos[num-1].video;
    var slod = document.querySelector('video');
    slod.src = videoSlod;
    virkjaTakka();
  }

  function virkjaTakka() {
    // Finnum takkana
    var play = document.querySelector('.play');
    var fullscreen = document.querySelector('.fullscreen');
    var mute = document.querySelector('.mute');
    var back = document.querySelector('.reverse');
    var next = document.querySelector('.next');
    var overlay = document.querySelector('.overlay');
    var videoDiv = document.querySelector('.video');
    var video = document.querySelector('video');

    play.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        play.src = "./img/pause.svg";
        overlay.style.display = 'none';
      }  else {
        video.pause();
        play.src = "./img/play.svg";
        overlay.src = "./img/play.svg";
        overlay.style.display = 'block';
      }
    });

    fullscreen.addEventListener('click', function() {
      rfs = video.requestFullscreen
          || video.webkitRequestFullScreen
          || video.mozRequestFullScreen
          || video.msRequestFullscreen
      ;

      rfs.call(video);
    });

    mute.addEventListener('click', function() {
      if (video.muted) {
        video.muted = false;
        mute.src = "./img/mute.svg";
      } else {
        video.muted = true;
        mute.src = "./img/unmute.svg";
      }

    });

    back.addEventListener('click', function() {
      video.currentTime = video.currentTime - 3;
    });

    next.addEventListener('click', function() {
      video.currentTime = video.currentTime + 3;
    });

    videoDiv.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        play.src = "./img/pause.svg";
        overlay.style.display = 'none';
      }  else {
        video.pause();
        play.src = "./img/play.svg";
        overlay.src = "./img/play.svg";
        overlay.style.display = 'block';
      }
    });
  }
}

// Klassískt fall til að tæma element
function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
