window.onload = function () {
    updateBarChart('Europe');
};

function updateBarChart(continent) {
    let continentMap = {
        "Europe": ["BLR", "ARM", "MON", "POR", "BUL", "SLO", "BEL", "NED", "LTU", "SWE", "SVK", "IRL", "FIN", "TUR", "UKR", "KAZ", "POL", "ITA", "LAT", "ROU", "LUX", "ESP", "SUI", "FRA", "SRB", "GBR", "CRO", "CYP", "CZE", "AUT", "RUS", "ISR", "GER", "BIH"],
        "Asia": ["CHI", "TPE", "UZB", "JPN", "IND", "THA", "KOR"],
        "Africa":["RSA", "MAR"],
        "N America": ["USA", "CAN"],
        "S America": ["ARG", "COL", "BRA", "PER", "ECU"],
        "Oceania": ["AUS"],
        "Antarctica":[]
    };
    d3.select("#barChart").selectAll('*').remove();
    let svg = d3.select("#barChart"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right - 30,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    let y = d3.scaleLinear()
        .rangeRound([height, 0]);

    let z = d3.scaleOrdinal()
        .range(["#76b7b2", "#ff8c00"]);

    d3.csv("data/main.csv", function(d, i, columns) {
        for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
        d.total = t;
        return d;
    }, function(error, data) {
        if (error) throw error;
        data = _.filter(data, function (d) {
            return _.includes(continentMap[continent], d.Country);
        });
        if(data.length > 16) {
            data = data.splice(0,16);
        }
        let keys = ['Wins', 'Loses'];

        x.domain(data.map(function(d) { return d.Country; }));
        y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
        z.domain(keys);

        g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
            .attr("fill", function(d) { return z(d.key); })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("x", function(d) { return x(d.data.Country); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth())
            .append('title') // Tooltip
            .text(function (d) {
                return 'No of games won(' + d.data.Wins + ') vs lost (' + d.data.Loses + ') by ' + d.data.Country
            });

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
            .text("Countries");

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

        let legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width + 30)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width +25)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });

        svg.append("text")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", 12)
            .attr('font-weight', 'bold')
            .attr("class", "title")
            .attr("text-anchor", "middle")
            .text("Comparison of games won vs lost over the countries");

        svg.selectAll("rect")
            .on("click",function (d) {
                updateLine(d.data.Country);
            });
        updateLine(data[0].Country);
    });
}
