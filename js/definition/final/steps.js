const nextDefStep = document.getElementById("nextDefStep");
nextDefStep.addEventListener("click", () => {
  // increment to next step
  currentDefStep = currentDefStep + 1;

  // handle special cases
  switch(currentDefStep) {
    case 2:
      // show vertical lines
      defSvg.selectAll(".vertLine")
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
          .style("opacity", 1)

      // darken endpoints
      defSvg.selectAll(".endpoint")
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
          .style("fill", "black")

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


// ---- RESET ---- //
const defReset = document.getElementById("defReset");
defReset.addEventListener("click", resetFinalChart)

function resetFinalChart() {
  // reset endpoints
  defSvg.selectAll(".start")
    .transition()
    .duration(1000)
    .ease(d3.easeCircle)
      .attr("cx", xScale(1))
      .attr("cy", yScale(1))

  defSvg.selectAll(".end")
    .transition()
    .duration(1000)
    .ease(d3.easeCircle)
      .attr("cx", xScale(5))
      .attr("cy", yScale(9))

  // reset slope line
  defSvg.selectAll("#defLine")
    .transition()
    .duration(1000)
    .ease(d3.easeCircle)
      .attr("x1", xScale(1))
      .attr("y1", yScale(1))
      .attr("x2", xScale(5))
      .attr("y2", yScale(9))

  // reset vertical lines
  defSvg.selectAll("#vert1")
    .transition()
    .duration(1000)
    .ease(d3.easeCircle)
      .attr("x1", xScale(1))
      .attr("y1", yScale(11))
      .attr("x2", xScale(1))
      .attr("y2", yScale(-5))

  defSvg.selectAll("#vert2")
    .transition()
    .duration(1000)
    .ease(d3.easeCircle)
      .attr("x1", xScale(5))
      .attr("y1", yScale(11))
      .attr("x2", xScale(5))
      .attr("y2", yScale(-5))
}