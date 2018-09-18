function updateLine(country) {
    d3.select("#lineChart").selectAll("*").remove();
    let svg = d3.select("#lineChart");
        margin = {top: 25, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right - 30,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let keys = ['Wins', 'Loses'];
    let x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    let y = d3.scaleLinear()
        .rangeRound([height, 0]);

    let z = d3.scaleOrdinal()
        .range(["#76b7b2", "#ff8c00"]);
    let line = d3.line()
        .x(function(d) { return x(parseInt(d.Year)); })
        .y(function(d) { return y(parseInt(d.Count)); });
    let line2 = d3.line()
        .x(function(d) { return x(parseInt(d.Year)); })
        .y(function(d) { return y(parseInt(d.Count1)); });

    data = dataObj[country];

    x.domain(data.map(function (d) {
        return d.Year;
    }));
    y.domain([0, d3.max(data, function(d) { return d3.max([parseInt(d.Count), parseInt(d.Count1)]); })]).nice();

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("x", width/2)
        .attr("y", 25)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Years");

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text("No. of games");

    g.append("path")
        .datum(data)
        .attr("transform", "translate(15,0)")
        .attr("fill", "none")
        .attr("stroke", "#76B7B2")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 3)
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
        .attr("stroke-width", 3)
        .attr("d", line2)
        .append('title') // Tooltip
        .text(function (d) {
            return 'No of games lost'
        });
    svg.append("text")
        .attr("x", (width + margin.left + 40 + margin.right) / 2)
        .attr("y", 12)
        .attr('font-weight', 'bold')
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("Comparison of " + country + "'s games won vs lost over the years");

    let legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width + 30 )
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width + 25)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
}