var soundicon = document.getElementById("soundicon");
var music = document.getElementById("audio");

soundicon.addEventListener('mousedown', function(e) {
  if (soundicon.classList.contains("fa-volume-off")) {
    soundicon.className = "fa fa-volume-up";
    music.play();
  } else {
    soundicon.className = "fa fa-volume-off";
    music.pause();
  }
});
