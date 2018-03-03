var currentDefStep = 1;

// ---- THE CHART ---- //
// create chart
const defSvg = d3.select("#defGraph")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// append axes
defSvg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

defSvg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

// append slope line to chart
defSvg.selectAll("lines")
  .data(line)
  .enter().append("line")
    .attr("id", "defLine")
    .attr("x1", d => xScale(d.x1))
    .attr("x2", d => xScale(d.x2))
    .attr("y1", d => yScale(d.y1))
    .attr("y2", d => yScale(d.y2))
    .attr("stroke-width", 1)
    .style("stroke", "black")
    .style("stroke-dasharray", ("5, 3"))

// append curve
const defCurve = defSvg.append("path")
  .attr("class", "curve")
  .attr("d", curveScale(curvePoints))

// append vertical lines
const vertLines = [
  { x1: line[0].x1, y1: 11, x2: line[0].x1, y2: -5, label: "vert1" },
  { x1: line[0].x2, y1: 11, x2: line[0].x2, y2: -5, label: "vert2" }
]
defSvg.selectAll("vertLines")
  .data(vertLines)
  .enter().append("line")
    .attr("id", d => d.label)
    .attr("class", "vertLine")
    .attr("x1", d => xScale(d.x1))
    .attr("x2", d => xScale(d.x2))
    .attr("y1", d => yScale(d.y1))
    .attr("y2", d => yScale(d.y2))
    .attr("stroke-width", 1)
    .style("stroke", "black")
    .style("stroke-dasharray", ("5, 3"))
    .style("opacity", 0)

// append endpoints
defSvg.selectAll("circles")
.data(endpoints)
.enter().append("circle")
  .attr("class", d => "endpoint " + d.marker)
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .attr("r", 5)
  .style("fill", "gray")
  .call(d3.drag()
    .on("drag", defDrag));
    

// ---- DRAGGABLE INTERACTION ---- //
function defDrag(d) {
  var defM = d3.mouse(defSvg.node()),
    defP = closestPoint(defCurve.node(), defM);

  // update endpoints
  d3.select(this)
    .attr("cx", d.x = defP[0])
    .attr("cy", d.y = defP[1]);
  
  // check which point is moving
  if(d.marker == "start") {
    // update slope line
    d3.select("#defLine")
      .attr("x1", lineData => lineData.x1 + defP[0])
      .attr("y1", lineData => lineData.y1 + defP[1])

    // update vertical line
    d3.select("#vert1")
      .attr("x1", lineData => lineData.x1 + defP[0])
      .attr("x2", lineData => lineData.x1 + defP[0])
  } else {
    // update slope line
    d3.select("#defLine")
      .attr("x2", lineData => lineData.x2 = defP[0])
      .attr("y2", lineData => lineData.y2 = defP[1])

    // update vertical line
    d3.select("#vert2")
      .attr("x1", lineData => lineData.x2 = defP[0])
      .attr("x2", lineData => lineData.x2 = defP[0])
  }
}