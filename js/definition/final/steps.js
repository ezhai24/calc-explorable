const nextDefStep = document.getElementById("nextDefStep");
nextDefStep.addEventListener("click", () => {
  // increment to next step
  currentDefStep = currentDefStep + 1;

  // handle special cases
  switch(currentDefStep) {
    case 6:
      // const nextSection = document.getElementById("");
      // nextSection.classList.remove("hidden");
      nextDefStep.classList.add("hidden");
      break; 

    default:
      break;
  }

  // show step
  const step = document.getElementById(`defstep_${currentDefStep}`);
  step.classList.remove("hidden");
})