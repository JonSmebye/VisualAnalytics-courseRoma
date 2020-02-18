//var fileName = "./data/dataAllYears.json";
var fileName = "./data/dataAllYears.json";
var fields  = ["LOCATION","TIME","PC_HEALTHXP","PC_GDP","USD_CAP","TOTAL_SPEND","Y1","Y2"];
var years = [];
var yearMap = {};
d3.json(fileName, function(error, data){
    data.forEach(function(d){
        if(!years.includes(d.TIME)){
            years.push(d.TIME);
        }
    });
    years.forEach(function(d){
        yearMap[d] = [];
    });
    data.forEach(function(d) {
        let country = d.LOCATION;
        let time = d.TIME;
        let USD_CAP = d.USD_CAP;
        let list = {};
        list['LOCATION'] = country;
        list['value'] = USD_CAP;
        yearMap[time].push(list);
    });
    makeVis(yearMap[years[0]]);
});

var makeVis = function(data){
    var drawPlot = function(dataUpdate){
        d3.select('#vis-container').selectAll("svg").remove();
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
        var svg = d3.select("#vis-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 
        "translate(" + margin.left + "," + margin.top + ")");
        
    
        // Scale the range of the data in the domains
        x.domain(dataUpdate.map(function(d) { return d.LOCATION; }));
        y.domain([0, d3.max(dataUpdate, function(d) { return d.value; })]);
        
        // append the rectangles for the bar chart
        svg.selectAll("body")
            .data(dataUpdate)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.LOCATION); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });
        
        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        
        // add the y Axis
        svg.append("g")
        .call(d3.axisLeft(y));
    }
    
    var dropdownChange = function() {
        var newRow = d3.select(this).property('value'),
            newData = yearMap[newRow];
        console.log(newData);
        drawPlot(newData);
    }
    var type = Object.keys(yearMap).sort();

    var dropdown = d3.select("#vis-container")
        .insert("select", "svg")
        .on("change", dropdownChange);

    dropdown.selectAll("option")
        .data(years)
        .enter().append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) {
            return d;
        })
        var initialData = yearMap[years[0]];
        drawPlot(initialData);
}