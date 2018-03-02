var currentSlopeStep = 1;

// ---- THE CHART ---- //
// define chart dimensions
const margin = {top: 10, right: 20, bottom: 20, left: 40},
  width = 760 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// create chart
const svg = d3.select("#slopeGraph")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// define scales
const xScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, width]);
const yScale = d3.scaleLinear()
  .domain([0, 10])
  .range([height, 0]);

// define (re)conversion scales
const toXCoord = d3.scaleLinear()
  .domain([0, width])
  .range([0, 10]);
const toYCoord = d3.scaleLinear()
  .domain([height, 0])
  .range([0, 10]);

// append axes
const xAxis = d3.axisBottom(xScale);
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

const yAxis = d3.axisLeft(yScale);  
svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

// append line to chart
const line = [{x1:1, y1:1, x2:5, y2:9}]
svg.selectAll("lines")
  .data(line)
  .enter().append("line")
    .attr("id", "line")
    .attr("x1", d => xScale(d.x1))
    .attr("x2", d => xScale(d.x2))
    .attr("y1", d => yScale(d.y1))
    .attr("y2", d => yScale(d.y2))
    .attr("stroke-width", 1)
    .style("stroke", "black")
    .style("stroke-dasharray", ("5, 3"))

// append endpoints
const endpoints = [
  {
    x: xScale(line[0].x1),
    y: yScale(line[0].y1),
    "marker": "start"
  },
  {
    x: xScale(line[0].x2),
    y: yScale(line[0].y2),
    "marker": "end"
  }
]
svg.selectAll("circles")
  .data(endpoints)
  .enter().append("circle")
    .attr("class", d => "endpoint " + d.marker)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 5)
    .call(d3.drag()
      .on("drag", slopeDrag)
      .on("end", slopeDragEnd));

      
// ---- DRAGGABLE INTERACTION ---- //
function slopeDrag(d) {
  if(currentSlopeStep == 3 || currentSlopeStep >= 7) {
    // snap to curve for all steps after 4
    if(currentSlopeStep > 4) {
      var m = d3.mouse(svg.node()),
        p = closestPoint(curve.node(), m);

      d3.event.x = p[0];
      d3.event.y = p[1];
    }

    // update endpoints
    d3.select(this)
      .attr("cx", d.x = d3.event.x)
      .attr("cy", d.y = d3.event.y);
    
    // update line
    if(d.marker == "start") {
      d3.select("#line")
        .attr("x1", lineData => lineData.x1 + d3.event.x)
        .attr("y1", lineData => lineData.y1 + d3.event.y)
    } else {
      d3.select("#line")
        .attr("x2", lineData => lineData.x2 = d3.event.x)
        .attr("y2", lineData => lineData.y2 = d3.event.y)
    }
  }
}

function slopeDragEnd() {
  // get coordinates
  const newY1 = toYCoord(d3.select("#line").attr("y1")).toFixed(1)
  const newY2 = toYCoord(d3.select("#line").attr("y2")).toFixed(1)
  const newX1 = toXCoord(d3.select("#line").attr("x1")).toFixed(1)
  const newX2 = toXCoord(d3.select("#line").attr("x2")).toFixed(1)
  
  // calculate slope
  var slope = ((newY2 - newY1) / (newX2 - newX1)).toFixed(1)
  if(isNaN(slope)) {
    slope = "Error"
  }

  // update formula
  const newFormula = "m = \\frac{" + newY2 + "-" + newY1 + "}{" + newX2 + "-" + newX1 + "} = " + slope
  var math = MathJax.Hub.getAllJax("slopeFormula")[0];
  MathJax.Hub.Queue(["Text",math,newFormula]);
}


// ---- THE CURVE ---- //
// generate points on curve
var curvePoints = [];
for (var i = 0.5; i < 9.5; i += 0.1) {
  curvePoints.push({x: i, y: 0.5 * Math.pow((i - 3), 3) + 5});
}

// define scale for curve points
const curveScale = d3.line()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y));

// define curve
var curve = svg.append("path")
  .attr("id", "slopeCurve")
  .attr("class", "curve hidden")
  .attr("d", curveScale(curvePoints))

// find point on curve closest to current drag position
function closestPoint(pathNode, point) {
  var pathLength = pathNode.getTotalLength(),
      precision = 8,
      best,
      bestLength,
      bestDistance = Infinity;

  // linear scan for coarse approximation
  for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
    if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
      best = scan, bestLength = scanLength, bestDistance = scanDistance;
    }
  }

  // binary search for precise estimate
  precision /= 2;
  while (precision > 0.5) {
    var before,
        after,
        beforeLength,
        afterLength,
        beforeDistance,
        afterDistance;
    if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
      best = before, bestLength = beforeLength, bestDistance = beforeDistance;
    } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
      best = after, bestLength = afterLength, bestDistance = afterDistance;
    } else {
      precision /= 2;
    }
  }

  best = [best.x, best.y];
  best.distance = Math.sqrt(bestDistance);
  return best;

  function distance2(p) {
    var dx = p.x - point[0],
        dy = p.y - point[1];
    return dx * dx + dy * dy;
  }
}