var currentLimitStep = 1;

// ---- THE CHART ---- //
// create chart
const limitSvg = d3.select("#limitChart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

// add line for dot to follow
const trackPoints = [{x1:3, y1:5, x2:8, y2:5}]
const track = limitSvg.selectAll("track")
  .data(trackPoints)
  .enter().append("line")
    .attr("x1", d => xScale(d.x1))
    .attr("x2", d => xScale(d.x2))
    .attr("y1", d => yScale(d.y1))
    .attr("y2", d => yScale(d.y2))
    .attr("stroke-width", 1)
    .style("stroke", "black")
    .style("stroke-dasharray", ("5, 3"))

// add dot
const blue = [{x: xScale(trackPoints[0].x1), y: yScale(trackPoints[0].y1)}]
limitSvg.selectAll("blue")
  .data(blue)
  .enter().append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 10)
    .style("fill", "blue")
    .style("opacity", 0.1)
    .call(d3.drag()
      .on("drag", limitDrag));

// add cross
const lineSize = 0.125;
const crossPoints = [
  {
    x1: trackPoints[0].x2 - lineSize,
    y1: trackPoints[0].y2 + lineSize * 1.5,
    x2: trackPoints[0].x2 + lineSize,
    y2: trackPoints[0].y2 - lineSize * 1.5
  },
  {
    x1: trackPoints[0].x2 + lineSize,
    y1: trackPoints[0].y2 + lineSize  * 1.5,
    x2: trackPoints[0].x2 - lineSize,
    y2: trackPoints[0].y2 - lineSize  * 1.5
  }
]
const cross = limitSvg.selectAll("cross")
  .data(crossPoints)
  .enter().append("line")
    .attr("x1", d => xScale(d.x1))
    .attr("x2", d => xScale(d.x2))
    .attr("y1", d => yScale(d.y1))
    .attr("y2", d => yScale(d.y2))
    .attr("stroke-width", 1)
    .style("stroke", "black")


// ---- DRAGGABLE INTERACTION ---- //
// define opacity scale
const toOpacity = d3.scaleLinear()
  .domain([xScale(trackPoints[0].x1), xScale(trackPoints[0].x2)])
  .range([0.1, 1])

// on drag
function limitDrag(d) {
  // restrict drag path to track
  var limM = d3.mouse(limitSvg.node()),
    limP = closestPoint(track.node(), limM);

  // update circle
  d3.select(this)
    .attr("cx", d.x = limP[0])
    .attr("cy", d.y = limP[1])
    .style("opacity", toOpacity(limP[0]));
}