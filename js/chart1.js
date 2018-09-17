window.onload = function () {
    updateBarChart();
    updateLine('GER')
  /*  compute()*/
};

function updateBarChart() {

    var svg = d3.select("#barChart"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.2);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#ff8c00", "#76b7b2"]);

    d3.csv("data/main.csv", function(d, i, columns) {
        for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
        d.total = t;
        return d;
    }, function(error, data) {
        if (error) throw error;

        var keys = ['Country', 'Wins', 'Loses'];

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
            .text("No. of Games")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("No. of games");

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.splice(1,2))
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });
        svg.append("text")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", 15)
            .attr('font-weight', 'bold')
            .attr("class", "title")
            .attr("text-anchor", "middle")
            .text("Comparison of " + name + " point between winners and losers over the years")
        ;

        svg.selectAll("rect")
            .on("click",function (d) {
                updateLine(d.data.Country);
            })
    });
}

function compute() {
    var s = ["ESP","SUI","USA","FRA","ARG","SRB","CHI","GBR","CRO","CYP","CZE","AUT","RUS","ISR","GER","BIH","TPE","LUX","ROU","LAT","UZB","ITA","AUS","POL","COL","KAZ","UKR","BRA","TUR","FIN","IRL","SVK","CAN","SWE","LTU","JPN","NED","BEL","SLO","BUL","POR","RSA","IND","MAR","THA","MON","ARM","PER","BLR","ECU","KOR"];
    var y = [2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014
    ];
    let o = {};
    let result = {
        "ESP": {
            "c": 0,
            "c1": 0
        },
        "SUI": {
            "c": 0,
            "c1": 0
        },
        "USA": {
            "c": 0,
            "c1": 0
        },
        "FRA": {
            "c": 0,
            "c1": 0
        },
        "ARG": {
            "c": 0,
            "c1": 0
        },
        "SRB": {
            "c": 0,
            "c1": 0
        },
        "CHI": {
            "c": 0,
            "c1": 0
        },
        "GBR": {
            "c": 0,
            "c1": 0
        },
        "CRO": {
            "c": 0,
            "c1": 0
        },
        "CYP": {
            "c": 0,
            "c1": 0
        },
        "CZE": {
            "c": 0,
            "c1": 0
        },
        "AUT": {
            "c": 0,
            "c1": 0
        },
        "RUS": {
            "c": 0,
            "c1": 0
        },
        "ISR": {
            "c": 0,
            "c1": 0
        },
        "GER": {
            "c": 0,
            "c1": 0
        },
        "BIH": {
            "c": 0,
            "c1": 0
        },
        "TPE": {
            "c": 0,
            "c1": 0
        },
        "LUX": {
            "c": 0,
            "c1": 0
        },
        "ROU": {
            "c": 0,
            "c1": 0
        },
        "LAT": {
            "c": 0,
            "c1": 0
        },
        "UZB": {
            "c": 0,
            "c1": 0
        },
        "ITA": {
            "c": 0,
            "c1": 0
        },
        "AUS": {
            "c": 0,
            "c1": 0
        },
        "POL": {
            "c": 0,
            "c1": 0
        },
        "COL": {
            "c": 0,
            "c1": 0
        },
        "KAZ": {
            "c": 0,
            "c1": 0
        },
        "UKR": {
            "c": 0,
            "c1": 0
        },
        "BRA": {
            "c": 0,
            "c1": 0
        },
        "TUR": {
            "c": 0,
            "c1": 0
        },
        "FIN": {
            "c": 0,
            "c1": 0
        },
        "IRL": {
            "c": 0,
            "c1": 0
        },
        "SVK": {
            "c": 0,
            "c1": 0
        },
        "CAN": {
            "c": 0,
            "c1": 0
        },
        "SWE": {
            "c": 0,
            "c1": 0
        },
        "LTU": {
            "c": 0,
            "c1": 0
        },
        "JPN": {
            "c": 0,
            "c1": 0
        },
        "NED": {
            "c": 0,
            "c1": 0
        },
        "BEL": {
            "c": 0,
            "c1": 0
        },
        "SLO": {
            "c": 0,
            "c1": 0
        },
        "BUL": {
            "c": 0,
            "c1": 0
        },
        "POR": {
            "c": 0,
            "c1": 0
        },
        "RSA": {
            "c": 0,
            "c1": 0
        },
        "IND": {
            "c": 0,
            "c1": 0
        },
        "MAR": {
            "c": 0,
            "c1": 0
        },
        "THA": {
            "c": 0,
            "c1": 0
        },
        "MON": {
            "c": 0,
            "c1": 0
        },
        "ARM": {
            "c": 0,
            "c1": 0
        },
        "PER": {
            "c": 0,
            "c1": 0
        },
        "BLR": {
            "c": 0,
            "c1": 0
        },
        "ECU": {
            "c": 0,
            "c1": 0
        },
        "KOR": {
            "c": 0,
            "c1": 0
        }
    };
    debugger;
    _.forEach(s, function (d) {
        o[d]
    });
    console.log(result);
}
