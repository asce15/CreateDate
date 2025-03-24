// Steps array: note that step 2 now uses custom inputs (time and date)
const steps = [
    {title: "📍Where to go:", 
    choices: [
        { text: "SM", img: "sm.jpg" },
        { text: "Nuvali", img: "nuvali.jpg" },
        { text: "Alabang", img: "alabang.jpg" },
        { text: "Pasig Esplanade", img: "pasig.jpg" }
        ]
    },
    {title: "🎭Where type of date:", 
    choices: [
        { text: "Casual Dinner", img: "dinner.jpg" },
        { text: "Arcade Date", img: "arcade.jpg" },
        { text: "Cozy Coffee Date", img: "coffee.jpg" },
        { text: "Movie Date", img: "movie.jpg" }
        ]
    },
    {title: "🍔What food do you wanna eat:", 
    choices: [
        { text: "Pizza", img: "pizza.jpg" },
        { text: "Chicken", img: "chicken.jpg" },
        { text: "Burger", img: "burger.jpg" },
        { text: "Pasta", img: "pasta.jpg" }
        ]
    },
    { title: "📅Pick a date and time:", choices: [] } // Custom inputs for date/time in step 4
  ];

  let currentStep = 0; // Track the current step
  let selections = {}; // Store user choices    
  let otherSelected = false; // Track if 'Other' option is selected

  function loadStep() {
    // Update header
    document.getElementById("header-title").textContent = steps[currentStep].title;
  
    // Get the choices container
    const container = document.getElementById("choices-container");
    container.innerHTML = ""; // Clear previous choices
  
    // If we're on step 3, override display so inputs stack vertically
    if (currentStep === 3) {
        // Set container display to block so items stack vertically.
        container.style.display = "block";
        
        // Hide the "Other" input container or button if it exists.
        const otherInput = document.getElementById("otherInput");
        if (otherInput) {
          otherInput.style.display = "none";
        }
        const otherOptionBox = document.querySelector('.other-option-box');
        if (otherOptionBox) {
          otherOptionBox.style.display = "none";
        }
        
        // Create a wrapper box for time and date inputs.
        const dateTimeBox = document.createElement("div");
        dateTimeBox.classList.add("datetime-box");
        
        // Create container for time input.
        const timeContainer = document.createElement("div");
        timeContainer.classList.add("time-container");
        
        const timeLabel = document.createElement("label");
        timeLabel.textContent = "Select Time:";
        timeLabel.setAttribute("for", "timeInput");
        
        const timeInput = document.createElement("input");
        timeInput.type = "time";
        timeInput.id = "timeInput";
        
        timeContainer.appendChild(timeLabel);
        timeContainer.appendChild(timeInput);
        
        // Create container for date input.
        const dateContainer = document.createElement("div");
        dateContainer.classList.add("date-container");
        
        const dateLabel = document.createElement("label");
        dateLabel.textContent = "Select Date:";
        dateLabel.setAttribute("for", "dateInput");
        
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.id = "dateInput";
        
        dateContainer.appendChild(dateLabel);
        dateContainer.appendChild(dateInput);
        
        // Append time and date containers into the box.
        dateTimeBox.appendChild(timeContainer);
        dateTimeBox.appendChild(dateContainer);
        
        // Append the box to the main container.
        container.appendChild(dateTimeBox);
      } else {
        container.style.display = "flex";
        steps[currentStep].choices.forEach(choice => {
            const choiceBox = document.createElement("div");
            choiceBox.classList.add("choice-box");

            // Create an image element
            const img = document.createElement("img");
            img.src = choice.img;
            img.alt = choice.text;
            img.classList.add("choice-img");

            // Create text label
            const label = document.createElement("div");
            label.textContent = choice.text;
            label.classList.add("choice-text");

            // Append image and text inside choice box
            choiceBox.appendChild(img);
            choiceBox.appendChild(label);
            
            choiceBox.onclick = () => selectChoice(choiceBox, choice.text);

            // Highlight selected choice
            if (selections[currentStep] === choice.text) {
                choiceBox.classList.add('selected');
            }

            container.appendChild(choiceBox);
        });
    }

    // Update button text for last step
    document.getElementById("nextButton").textContent = currentStep === steps.length - 1 ? "Submit" : "Next >>";

    // Show "Back" button only after the first step
    document.getElementById("backButton").style.display = currentStep === 0 ? "none" : "inline-block";
}

  // Function to select or deselect a choice
  function selectChoice(element, choice) {
    if (selections[currentStep] === choice) {
      element.classList.remove('selected');
      delete selections[currentStep];
    } else {
      document.querySelectorAll('.choice-box').forEach(box => box.classList.remove('selected'));
      element.classList.add('selected');
      selections[currentStep] = choice;
    }
    // Hide the "Other" input field if visible
    document.getElementById("otherInput").style.display = "none";
    document.getElementById("otherPlace").value = "";
    otherSelected = false;
  }

  // Toggle "Other" input field (if used)
  function toggleOtherInput() {
    const otherInput = document.getElementById("otherInput");
    const otherOptionBox = document.querySelector('.other-option-box');
    if (otherSelected) {
      otherInput.style.display = "none";
      document.getElementById("otherPlace").value = "";
      delete selections[currentStep];
      otherOptionBox.classList.remove('selected');
      otherSelected = false;
    } else {
      document.querySelectorAll('.choice-box').forEach(box => box.classList.remove('selected'));
      otherInput.style.display = "block";
      otherOptionBox.classList.add('selected');
      document.getElementById("otherPlace").focus();
      otherSelected = true;
    }
  }

  // Handle input in "Other" field (if used)
  function selectOtherChoice() {
    const otherValue = document.getElementById("otherPlace").value.trim();
    if (otherValue !== "") {
      selections[currentStep] = otherValue;
    } else {
      delete selections[currentStep];
    }
    console.log("Other input selected:", selections[currentStep]);
  }

  function convertToAmPm(timeStr) {
    // Create a dummy date using the input time string (format "HH:MM")
    const dateObj = new Date('1970-01-01T' + timeStr + ':00');
    // Use toLocaleTimeString with options to enforce 12-hour time
    return dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  function nextStep() {
       // Save the "Other" input value before moving to the next step
       if (otherSelected) {
        selectOtherChoice(); // Save the value first
    }

    // For step 3 ("Pick a date and time"), get time and date inputs
    if (currentStep === 3) {
        const timeValue = document.getElementById("timeInput").value;
        const dateValue = document.getElementById("dateInput").value;
        if (!timeValue || !dateValue) {
            alert("Please select both a time and a date.");
            return;
        }
        selections[currentStep] = { time: convertToAmPm(timeValue), date: dateValue };
    } else {
        if (!selections[currentStep]) {
            alert("Please select an option or enter one in 'Other'.");
            return;
        }
    }

    // Hide the "Other" input box and reset its value
    document.getElementById("otherInput").style.display = "none"; // Hide the input box
    document.getElementById("otherPlace").value = ""; // Clear the input field
    otherSelected = false;

    if (currentStep < steps.length - 1) {
      currentStep++;
      loadStep();
    } else {
        let entry = {
            where: selections[0],
            activity: selections[1],
            food: selections[2],
            time: selections[3].time,
            date: selections[3].date
        };
    
        fetch("https://script.google.com/macros/s/AKfycbw7rAsrKsVeci6uOuz8U4YnarxPxGUjdAqmjx53QR0RNoIrMAUI2MfRYTQx-67pMeUy0A/exec", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(entry),
        })
        .then(response => response.text())
        .then(data => {
            console.log("Server Response:", data);  
            alert("Your date plan has been recorded!");
            window.location.reload();
        })
        .catch(error => console.error("Error:", error));
    

        currentStep = 0;
        selections = {};
        loadStep();
    }
  }

  function goBack() {
    if (currentStep > 0) {
      currentStep--;
      loadStep();
    }
  }

  // Initialize the first step on page load
  window.onload = loadStep;
  document.addEventListener("DOMContentLoaded", loadStep);




document.addEventListener("DOMContentLoaded", loadStep);
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
      
