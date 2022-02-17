import * as d3 from 'd3';

const barChart = function(data, {
    x = (d, i) => i, 
    y = d => d,
    title, 
    marginTop = 20,
    marginRight = 0, 
    marginBottom = 30, 
    marginLeft = 40,
    width = 640,
    height = 400,
    xDomain, 
    xRange = [marginLeft, width - marginRight], 
    yType = d3.scaleLinear, 
    yDomain,
    yRange = [height - marginBottom, marginTop],
    xPadding = 0.1,
    yFormat, 
    yLabel, 
    color = "currentColor" 
  } = {}) {
    const margin = { top: 13, right: 30, bottom: 55, left: 70 };
   
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
  
    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    xDomain = new d3.InternSet(xDomain);
  
    const I = d3.range(X.length).filter(i => xDomain.has(X[i]));
  
    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);
  
    if (title === undefined) {
      const formatValue = yScale.tickFormat(100, yFormat);
      title = i => `${X[i]}\n${formatValue(Y[i])}`;
    } 
  
    const svg = d3.select("#d3_barChart")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));
  
    svg.append("g")
        .attr("fill", color)
      .selectAll("rect")
      .data(I)
      .join("rect")
        .attr("x", i => xScale(X[i]))
        .attr("y", i => yScale(Y[i]))
        .attr("height", i => yScale(0) - yScale(Y[i]))
        .attr("width", xScale.bandwidth())

    svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.top + 2)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text(title); 

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);
  
    return svg.node();
  }

  export default barChart;