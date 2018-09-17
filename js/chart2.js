function updateLine(country) {
    d3.select("#lineChart").selectAll("*").remove();
    var svg = d3.select("#lineChart");
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(parseInt(d.Year)); })
        .y(function(d) { return y(parseInt(d.Count)); });
    var line2 = d3.line()
        .x(function(d) { return x(parseInt(d.Year)); })
        .y(function(d) { return y(parseInt(d.Count1)); });

    data = dataObj[country];

    x.domain(data.map(function (d) {
        return d.Year;
    }));
    y.domain([0, d3.max(data, function(d) { return d3.max([parseInt(d.Count), parseInt(d.Count1)]); })]).nice();

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("No. of games");

    g.append("path")
        .datum(data)
        .attr("transform", "translate(15,0)")
        .attr("fill", "none")
        .attr("stroke", "#76B7B2")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d", line)
        .append('title') // Tooltip
        .text(function (d) {
            return 'No of games won'
        });

    g.append("path")
        .datum(data)
        .attr("transform", "translate(15,0)")
        .attr("fill", "none")
        .attr("stroke", "#FF8C00")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d", line2)
        .append('title') // Tooltip
        .text(function (d) {
            return 'No of games lost'
        });
}