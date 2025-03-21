$(document).ready(function(){
    $(".container").mouseenter(function(){
        $(".card").stop().animate({ top: "-90px" }, "slow");
        $(".envelope").addClass("glow"); // Add glowing effect
    }).mouseleave(function(){
        $(".card").stop().animate({ top: "0" }, "slow");
        $(".envelope").removeClass("glow");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const popSound = new Audio('pop.wav');
    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heartmany");
        document.querySelector(".floating-hearts").appendChild(heart);
        
        heart.style.left = Math.random() * 100 + "vw"; 


        let duration = Math.random() * 4 + 6; // 4s - 6s
        heart.style.animationDuration = duration + "s";

        
        // Add click event listener for the pop effect
        heart.addEventListener("click", function () {
            const rect = heart.getBoundingClientRect();
    
            // "Freeze" the heart at its current position by setting top and removing bottom
            heart.style.top = rect.top + "px";
            heart.style.bottom = "auto";

            popSound.currentTime = 0;  // Restart the sound if it was already played
            popSound.play();
            // Apply the pop animation by overriding any existing animations
            heart.style.animation = "pop 0.4s forwards";
            // Remove the heart after the pop animation completes (200ms)
            setTimeout(() => { heart.remove(); }, 400);
        });

       setTimeout(() => {
            if(document.body.contains(heart)) {
                heart.remove();
            }
        }, duration * 1000);
    }

    setInterval(createHeart, 500); // Create hearts every 500ms
});

const audio = document.getElementById('bg-music');
const muteButton = document.getElementById('mute-btn');

// Toggle mute state when the button is clicked
muteButton.addEventListener('click', function() {
  audio.muted = !audio.muted;

  if (!audio.muted && audio.paused) {
    audio.play().catch(err => console.log("Playback failed: ", err));
  }
  
  if (audio.muted) {
    muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  };

   // Add the animate class to trigger the pulse animation.
   muteButton.classList.add('animate');
   // Remove the class after the animation completes.
   setTimeout(() => {
     muteButton.classList.remove('animate');
   }, 300);
});