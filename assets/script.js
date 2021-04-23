//Function to display the current date and time using moment also we are going to use this to make the timeblocks change of color

var localTime = document.getElementById("localTime");

function displayTime() {
    var time = moment().format('dddd, MMMM Do hh:mm:ss a');
    localTime.textContent = time;
}

setInterval(displayTime, 1000);


//Function to get the API polygon for the charts
//Real time API link
var currentDate = moment(displayTime()).format('YYYY-MM-DD');
console.log(currentDate);

var liveCharts = 'https://api.polygon.io/v2/aggs/ticker/C:MXNUSD/range/1/day/2020-10-14/' + currentDate + '?unadjusted=true&sort=asc&limit=400&apiKey=H7QtCsKuVD7PIPFbgUJjIXjtWhwPj6kS'
console.log(liveCharts);

function searchApi() {
    fetch(liveCharts)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    var table = document.getElementById("mxnusd");

                    // Loop through the data for the lenght of result
                    for (var i = 0; i < data.results.length; i++) {
                        var ROW = document.createElement("tr");
                        table.appendChild(ROW);
                        var date = document.createElement("td");
                        date.textContent = moment.unix(data.results[i].t / 1000).format('YYYY-MM-DD');
                        ROW.appendChild(date);
                        var openPrice = document.createElement("td");
                        openPrice.textContent = data.results[i].o
                        ROW.appendChild(openPrice);
                        var closePrice = document.createElement("td");
                        closePrice.textContent = data.results[i].c
                        ROW.appendChild(closePrice);
                        var highestPrice = document.createElement("td");
                        highestPrice.textContent = data.results[i].h
                        ROW.appendChild(highestPrice); 
                        var lowestPrice = document.createElement("td");
                        lowestPrice.textContent = data.results[i].l
                        ROW.appendChild(lowestPrice);

                    };
                    // Print an appended table rows

                    console.log(moment.unix(data.results[1].t / 1000).format('YYYY-MM-DD'));
                })
            }
        })
};


//Call the function
searchApi();




