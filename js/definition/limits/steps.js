const nextLimitStep = document.getElementById("nextLimitStep");
nextLimitStep.addEventListener("click", () => {
  // increment to next step
  currentLimitStep = currentLimitStep + 1;

  // handle special cases
  switch(currentLimitStep) {
    case 2:
      const limitChart = document.getElementById("limitChart");
      limitChart.classList.remove("hidden");
      break;

    case 4:
      const nextSection = document.getElementById("goToDef");
      nextSection.classList.remove("hidden");
      nextLimitStep.classList.add("hidden");
      break;

    default:
      break;
  }

  // show step
  const step = document.getElementById(`limitstep_${currentLimitStep}`);
  step.classList.remove("hidden");
})