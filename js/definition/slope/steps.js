// ---- NEXT STEP ---- //
function nextStep() {
  // increment to next step
  currentSlopeStep = currentSlopeStep + 1;

  // handle special cases
  const formula = document.getElementById("slopeFormula");  
  switch(currentSlopeStep) {
    case 2:
      formula.classList.remove("hidden");
      nextSlopeStep.classList.remove("hidden");
      break;

    case 4:
      // hide formula
      formula.classList.add("hidden");
      
      // reset line and endpoints
      resetChart();
      
      // draw curve
      const curveElem = document.getElementById("slopeCurve");
      curveElem.classList.remove("hidden");
      const totalLength = curve.node().getTotalLength();
      curve
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(5000)
          .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

      break;
    
    case 5:
      nextSlopeStep.classList.add("hidden");
      break;
    
    case 6:
      formula.innerHTML = "$$m = \\frac{9.0-1.0}{5.0-1.0} = 2.0$$"
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);      
      formula.classList.remove("hidden");
      nextSlopeStep.classList.remove("hidden");
      break;

    case 9:
      nextSlopeStep.classList.add("hidden");
      const limitsLink = document.getElementById("goToLimits");
      limitsLink.classList.remove("hidden");
      break;
    
    default:
      break;
  }
  
  // show step
  const step = document.getElementById(`slopestep_${currentSlopeStep}`);
  step.classList.remove("hidden");
}

const nextSlopeStep = document.getElementById("nextSlopeStep");
nextSlopeStep.addEventListener("click", nextStep)


// ---- CHECK ANSWER ---- //
const check1 = document.getElementById("check_1");
check1.addEventListener("click", () => {
  const answer1 = document.getElementById("answer_1");
  const feedback2 = document.getElementById("feedback_2");
  if(answer1.value == 2) {
    feedback2.innerHTML = "Yes!"
  } else {
    feedback2.innerHTML = "Not quite!"
  }
  check1.classList.add("hidden");
  nextStep();
})

const check5 = document.getElementById("check_5");
check5.addEventListener("click", () => {
  const answer5 = document.getElementById("answer_5");
  const feedback6 = document.getElementById("feedback_6");
  if(answer5.value == 2) {
    feedback6.innerHTML = "Right!"
  } else {
    feedback6.innerHTML = "Trick question!"
  }
  check5.classList.add("hidden");
  nextStep();
})


// ---- RESET ---- //
function resetChart() {
  // reset endpoints
  d3.selectAll(".start")
    .transition()
    .duration(1000)
    .ease(d3.easeCircle)
      .attr("cx", xScale(1))
      .attr("cy", yScale(1))

  d3.selectAll(".end")
    .transition()
    .duration(1000)
    .ease(d3.easeCircle)
      .attr("cx", xScale(5))
      .attr("cy", yScale(9))

  // reset line
  d3.selectAll("#line")
    .transition()
    .duration(1000)
    .ease(d3.easeCircle)
      .attr("x1", xScale(1))
      .attr("y1", yScale(1))
      .attr("x2", xScale(5))
      .attr("y2", yScale(9))
}