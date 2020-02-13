margin_scatter = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 40
    },
    width_scatter = 800 - margin_scatter.left - margin_scatter.right,
    height_scatter = 631,92 - margin_scatter.top - margin_scatter.bottom,
  
    x_scatter = d3.scaleLinear().range([0, width_scatter]),
    y_scatter = d3.scaleLinear().range([height_scatter, 0]),
  
    xAxis_scatter = d3.axisBottom(x_scatter),
    yAxis_scatter = d3.axisLeft(y_scatter);
  
svg = d3.select("#scatterArea").append("svg")
    .attr("width", width_scatter + margin_scatter.left + margin_scatter.right)
    .attr("height", height_scatter + margin_scatter.top + margin_scatter.bottom)
    .attr("transform", "translate(" + 20 + "," + 0 + ")")
    
focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin_scatter.left + "," + margin_scatter.top + ")");
  
xAxis = focus.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height_scatter + ")")
    .call(xAxis_scatter);
  
yAxis = focus.append("g")
    .attr("class", "axis axis--y")
    .call(yAxis_scatter);
  
focus.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin_scatter.left)
    .attr("x", 0 - (height_scatter / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Y1");
  
svg.append("text")
    .attr("transform",
        "translate(" + ((width_scatter + margin_scatter.right + margin_scatter.left) / 2) + " ," +
        (height_scatter + margin_scatter.top + margin_scatter.bottom) + ")")
    .style("text-anchor", "middle")
    .text("Y2");
  
  
function drawScatter(data) {
    cValue = function (d) {
      return d.Continent;
    }
  
    color = d3.scaleOrdinal(d3.schemeCategory10);
        //Update the scale
    var maxHeight = d3.max(data, function (d) {
        return Math.abs(d.Y2)
    });
    var minHeight = d3.min(data, function (d) {
        return Math.abs(d.Y2)
    })

    y_scatter.domain([maxHeight + 0.5, -maxHeight - 0.5]); //show negative
    var maxWidth = d3.max(data, function (d) {
        return Math.abs(d.Y1)
    });
    var minWidth = d3.min(data, function (d) {
        return Math.abs(d.Y1)
    })

    x_scatter.domain([maxWidth + 0.5, -maxWidth - 4]); //show negative
    xAxis_scatter.scale(x_scatter);
    xAxis.transition().call(xAxis_scatter);
    yAxis_scatter.scale(y_scatter);
    yAxis.transition().call(yAxis_scatter);
    
    focus.selectAll("circle").remove();
    
    dots = focus.selectAll("circle").data(data);
  
    dots.enter().append("circle")
        .attr("r", 3)
        .attr("class", "knncircle")
        .style("fill", function (d) {
            return color(cValue(d));
        })
        .attr("cx", function (d) {
            return x_scatter(d.Y1);
        })
        .attr("cy", function (d) {
            return y_scatter(d.Y2)
        })
        
    var legend = focus.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
           return "translate(0," + i * 17 + ")";
        });
  
    legend.append("rect")
        .attr("x", width_scatter - 5)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", color)
        
    legend.append("text")
        .attr("x", width_scatter - 15)
        .attr("y", 6)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("font-size", "0.8em")
        .text(function (d) {
            return d;
        })
        .on('click', function(d){
        var currentContinent = d
        update(currentContinent, fullDataSet)
        })
}

function update(currentContinent, dataset) {
    // Create new filtered dataset
    var dataFilter = dataset.filter(function(d){
        return d.Continent==currentContinent})
    // Give these new data to update line
    updateTableData(dataFilter)
    drawScatter(dataFilter)
  }
  
  ////////////////////////// Adding Brush to ScatterPlot \\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
  brushTot = d3.brush()
    .extent([
        [0, 0],
        [width_scatter, height_scatter]
    ])
    .on("end", selected)
  
  focus.append("g")
    .attr("class", "brushT")
    .call(brushTot);
  
  //////////////////////// Handling selected plots \\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
  function selected() {
    dataSelection = []
    var selection = d3.event.selection;
    if (selection != null) {
        focus.selectAll("circle")
            .style("fill", function (d) {
                if (x_scatter(d.Y1) > selection[0][0] && x_scatter(d.Y1) < selection[1][0] &&
                    y_scatter(d.Y2) > selection[0][1] && y_scatter(d.Y2) < selection[1][1]) {
  
                    dataSelection.push(d);
                    return "green";
  
                } else {
                    return "red";
                }
            })
      focus.selectAll(".legend").remove();
      updateTableData(dataSelection);
    }else {
      //No data selected
      dataSelection = [];
  
      focus.selectAll("circle")
          .style("fill", function (d) {
              return color(cValue(d));
          })
  
          updateTableData(fullDataSet)
          drawScatter(fullDataSet)
          // put back the legend
  
      var legend = focus.selectAll(".legend")
          .data(color.domain())
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function (d, i) {
              return "translate(0," + i * 17 + ")";
          });
  
      // draw legend colored rectangles
      legend.append("rect")
          .attr("x", width_scatter - 5)
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", color)
  
  
      // draw legend text
      legend.append("text")
          .attr("x", width_scatter - 15)
          .attr("y", 6)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .style("font-size", "0.8em")
          .text(function (d) {
              return d;
          })
          .on('click', function(d){
                var currentContinent = d
              update(currentContinent, fullDataSet)
              
          })
      }
  }

d3.json("./data/csvjson2.json", function(data){
    fullDataSet = data
    console.log(fullDataSet)
    drawScatter(fullDataSet)
})  