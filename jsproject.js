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
const volumeSlider = document.getElementById('volume-slider');

function updateSliderFill() {
  const value = volumeSlider.value * 100; // Convert 0-1 to percentage
  volumeSlider.style.background = `linear-gradient(to top, #f8ad9d ${value}%, white ${value}%)`;
  audio.volume = volumeSlider.value;
}

// Update fill when moving the slider
volumeSlider.addEventListener("input", updateSliderFill);

// Initialize on load
updateSliderFill();

// Adjust volume based on slider
volumeSlider.addEventListener('input', function() {
    audio.volume = this.value;
    muteButton.innerHTML = audio.volume == 0 ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
});

// Toggle mute when clicking the button
muteButton.addEventListener('click', function() {
    audio.muted = !audio.muted;
    
    if (!audio.muted && audio.paused) {
        audio.play().catch(err => console.log("Playback failed: ", err));
    }
    
    muteButton.innerHTML = audio.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
    
    // Add animation
    muteButton.classList.add('animate');
    setTimeout(() => {
        muteButton.classList.remove('animate');
    }, 300);
});

volumeSlider.addEventListener('input', function() {
    // Unmute and play the audio automatically
    audio.muted = false;
    if (audio.paused) {
      audio.play().catch(err => console.log("Playback failed: ", err));
    }
    
    // Update the volume and slider fill
    audio.volume = this.value;
    updateSliderFill();
    
    // Update the mute button icon
    muteButton.innerHTML = this.value == 0 ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
  });
  