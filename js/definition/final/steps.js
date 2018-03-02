const nextDefStep = document.getElementById("nextDefStep");
nextDefStep.addEventListener("click", () => {
  // increment to next step
  currentDefStep = currentDefStep + 1;

  // handle special cases
  switch(currentDefStep) {
    case 2:
      defSvg.selectAll(".vertLine")
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
          .style("opacity", 1)
      break;

    case 6:
      const goHome = document.getElementById("goHome");
      const nextModule = document.getElementById("goToAppl");
      goHome.classList.remove("hidden");
      nextModule.classList.remove("hidden");
      nextDefStep.classList.add("hidden");
      break; 

    default:
      break;
  }

  // show step
  const step = document.getElementById(`defstep_${currentDefStep}`);
  step.classList.remove("hidden");
})