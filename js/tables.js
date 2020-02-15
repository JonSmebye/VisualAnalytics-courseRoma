function drawTable(data){
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1160 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    // set the ranges
    var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
    var y = d3.scaleLinear()
    .range([height, 0]);
    
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#table").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
    "translate(" + margin.left + "," + margin.top + ")");
    
    data.forEach(function(d) {
        d.USD_CAP = +d.USD_CAP;
    });
    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.LOCATION; }));
    y.domain([0, d3.max(data, function(d) { return d.USD_CAP; })]);
    
    // append the rectangles for the bar chart
    svg.selectAll("body")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.LOCATION); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.USD_CAP); })
    .attr("height", function(d) { return height - y(d.USD_CAP); });
    
    // add the x Axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    
    // add the y Axis
    svg.append("g")
    .call(d3.axisLeft(y));
}

function drawTable2(data){
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1160 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    // set the ranges
    var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
    var y = d3.scaleLinear()
    .range([height, 0]);
    
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#tables").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
    "translate(" + margin.left + "," + margin.top + ")");
    
    data.forEach(function(d) {
        d.TOTAL_SPEND = +d.TOTAL_SPEND;
    });
    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.LOCATION; }));
    y.domain([0, d3.max(data, function(d) { return d.TOTAL_SPEND; })]);
    
    // append the rectangles for the bar chart
    svg.selectAll("body")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.LOCATION); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.TOTAL_SPEND); })
    .attr("height", function(d) { return height - y(d.TOTAL_SPEND); });
    
    // add the x Axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    
    // add the y Axis
    svg.append("g")
    .call(d3.axisLeft(y));
}

d3.json("./data/fullDataSet.json", function(error, data){
    if (error) throw error;
    // format the data
    drawTable(data);
    drawTable2(data);
})


