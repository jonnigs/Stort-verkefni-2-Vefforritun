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
  request.onload = function () {
    if (request.status == 200) {
      var data = JSON.parse(request.response);
      show(data,num);
    }
    else {
      console.log('error');
    }
  }
  request.onerror = function() {
    console.error('Óþekkt villa');
  };

  request.send();
}

function show(data, num) {
  // Finn titil og set efst á síðu
  var nafn = document.querySelector('.nafn');
  nafn.appendChild(document.createTextNode(data.videos[num-1].title));
  // Finn hvaða video á að birta
  var videoSlod = data.videos[num-1].video;
  var slod = document.querySelector('video');
  slod.src = videoSlod;

}
