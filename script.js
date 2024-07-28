document.addEventListener("DOMContentLoaded", () => {
  const setButton = document.getElementById("set");
  const startButton = document.getElementById("start");
  const pauseButton = document.getElementById("pause");
  const resetButton = document.getElementById("reset");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  let storedMinutes = 25;
  let storedHours = 0;
  setButton.addEventListener("click", () => {
    storedMinutes = document.getElementById("minutesInput").value;

    if (storedMinutes > 59) {
      storedHours = Math.floor(storedMinutes / 60);
      storedMinutes = storedMinutes % 60;
      hours.innerText = storedHours;
      minutes.innerText = storedMinutes;
    }else{
      hours.innerText = 00;
      minutes.innerText = storedMinutes;
    }
    // storedMinutes = document.getElementById("minutesInput");
    // minutes.innerText = storedMinutes.value;
  });

  let interval = null;
  startButton.addEventListener("click", () => {
    // I need hours applied to formula

    if (!startButton.classList.contains("active")) {
      startButton.classList.toggle("active");
      startButton.innerText = "Pause";
      startButton.style.backgroundColor = "red";
      interval = setInterval(() => {
        let hr = parseInt(hours.innerText);
        let min = parseInt(minutes.innerText);
        let sec = parseInt(seconds.innerText);
        if (sec === 0) {
          if (min === 0) {
            if (hr === 0) {
              clearInterval(interval);
              alert("Time is up!");
            } else {
              hr--;
              min = 59;
              sec = 59;
            }
          } else {
            min--;
            sec = 59;
          }
        } else {
          sec--;
        }

        hours.innerText = hr;
        minutes.innerText = min;
        seconds.innerText = sec;
      }, 1000);
    } else if (startButton.classList.contains("active")) {
      clearInterval(interval);
      startButton.classList.toggle("active");
      startButton.innerText = "Resume";
      startButton.style.backgroundColor = "yellow";
    }
  });

  resetButton.addEventListener("click", () => {
    minutes.innerText = storedMinutes.value || 25;
    seconds.innerText = "00";
    if (interval) clearInterval(interval);
    startButton.innerText = "Start";
    startButton.style.backgroundColor = "lime";
    if (startButton.classList.contains("active")) {
      startButton.classList.toggle("active");
    }
  });
});
