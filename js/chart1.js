window.onload = function () {
    updateBarChart('Aces');
};

function updateBarChart(group, colorChosen) {
    var data = [
        {
            "Country": "GER",
            "Wins": 71,
            "Loses": 104
        },
        {
            "Country": "ARG",
            "Wins": 80,
            "Loses": 88
        },
        {
            "Country": "AUS",
            "Wins": 55,
            "Loses": 83
        },
        {
            "Country": "AUT",
            "Wins": 19,
            "Loses": 21
        },
        {
            "Country": "CAN",
            "Wins": 15,
            "Loses": 13
        },
        {
            "Country": "CHI",
            "Wins": 19,
            "Loses": 15
        },
        {
            "Country": "CRO",
            "Wins": 54,
            "Loses": 42
        },
        {
            "Country": "CYP",
            "Wins": 22,
            "Loses": 10
        },
        {
            "Country": "CZE",
            "Wins": 54,
            "Loses": 53
        },
        {
            "Country": "ESP",
            "Wins": 186,
            "Loses": 152
        },
        {
            "Country": "FRA",
            "Wins": 165,
            "Loses": 157
        },
        {
            "Country": "GBR",
            "Wins": 38,
            "Loses": 18
        },
        {
            "Country": "ISR",
            "Wins": 5,
            "Loses": 11
        },
        {
            "Country": "ITA",
            "Wins": 19,
            "Loses": 55
        },
        {
            "Country": "JPN",
            "Wins": 16,
            "Loses": 11
        },
        {
            "Country": "LAT",
            "Wins": 2,
            "Loses": 6
        }
    ];
    var barChart = d3.select("#barChart");
    barChart.selectAll("*").remove();

    var svg = d3.select("#barChart"),
        margin = {top: 50, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#e15759", '#76b7b2']);



    var name = group;

    var keys =['Country', 'Wins', 'Loses'];

    x0.domain(data.map(function (d) {
        return d.Country;
    }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function (d) {
        return d3.max([d.Wins, d.Loses]);
    })]).nice();


    g.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) {
            return "translate(" + x0(d.Country) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
            return keys.map(function (key) {
                return {key: key, value: d[key]};
            });
        })
        .enter().append("rect")

        .attr("x", function (d) {
            return x1(d.key);
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("width", x1.bandwidth())
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .attr("fill", function (d) {
            return z(d.key);
        })
        .append('title') // Tooltip
        .text(function (d) {
            return 'No of ' + d.key + ' is ' + d.value
        });


    g.append("g")
        .attr("class", "axis")
        .text("No. of Games")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("No. of Games");

    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 15)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.splice(1,2))
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });
    console.log(name);
    svg.append("text")
        .attr("x", (width + margin.left + margin.right) / 2)
        .attr("y", 42)
        .attr('font-weight', 'bold')
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("Comparison of number of wins and loses between countries")
    ;

}
