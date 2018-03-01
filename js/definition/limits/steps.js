const nextLimitStep = document.getElementById("nextLimitStep");
nextLimitStep.addEventListener("click", () => {
  // increment to next step
  currentLimitStep = currentLimitStep + 1;

  // handle special cases
  switch(currentLimitStep) {
    case 3:
      const nextSection = document.getElementById("goToDef");
      nextLimitStep.classList.add("hidden");
      nextSection.classList.remove("hidden");

    default:
      break;
  }

  // show step
  const step = document.getElementById(`limitstep_${currentLimitStep}`);
  step.classList.remove("hidden");
})