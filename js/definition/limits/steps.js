const nextLimitStep = document.getElementById("nextLimitStep");
nextLimitStep.addEventListener("click", () => {
  // increment to next step
  currentLimitStep = currentLimitStep + 1;

  // handle special cases
  switch(currentLimitStep) {
    case 2:
      limitSvg.selectAll("circle")
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
          .style("fill", "#F05961");

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