//Function to display the current date and time using moment also we are going to use this to make the timeblocks change of color
var localTime = document.getElementById("localTime");

function displayTime() {
    var time = moment().format('dddd, MMMM Do hh:mm:ss a');
    localTime.textContent = time;
}

setInterval(displayTime, 1000);


//Function to get the API polygon for the historical exchange rates of the usdmxn
//Real time API link
var currentDate = moment(displayTime()).format('YYYY-MM-DD');
console.log(currentDate);

var initialDate;
if (localStorage.getItem("userDates")==""){
    initialDate = moment(displayTime()).format('YYYY-MM-DD')
} else {
    initialDate = localStorage.getItem("userDates")
};

var liveCharts = 'https://api.polygon.io/v2/aggs/ticker/C:MXNUSD/range/1/day/'+ initialDate +'/' + currentDate + '?unadjusted=true&sort=asc&limit=400&apiKey=H7QtCsKuVD7PIPFbgUJjIXjtWhwPj6kS'
console.log(liveCharts);

function searchApi() {
    fetch(liveCharts)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    var table = document.getElementById("mxnusd");
                    table.innerHTML = "";

                    var ROW = document.createElement("tr");
                    table.appendChild(ROW);
                    var date = document.createElement("th");
                    date.textContent = "Date";
                    ROW.appendChild(date);
                    var openPrice = document.createElement("th");
                    openPrice.textContent = "Opening price";
                    ROW.appendChild(openPrice);
                    var closePrice = document.createElement("th");
                    closePrice.textContent = "Closing price";
                    ROW.appendChild(closePrice);
                    var highestPrice = document.createElement("th");
                    highestPrice.textContent = "Highest price";
                    ROW.appendChild(highestPrice);
                    var lowestPrice = document.createElement("th");
                    lowestPrice.textContent = "Lowest price";
                    ROW.appendChild(lowestPrice);

                    // Loop through the data for the lenght of result
                    for (var i = 0; i < data.results.length; i++) {
                        var ROW = document.createElement("tr");
                        table.appendChild(ROW);
                        var date = document.createElement("td");
                        date.textContent = moment.unix(data.results[i].t / 1000).format('YY-MM-DD');
                        ROW.appendChild(date);
                        var openPrice = document.createElement("td");
                        openPrice.textContent = data.results[i].o.toFixed(5)
                        ROW.appendChild(openPrice);
                        var closePrice = document.createElement("td");
                        closePrice.textContent = data.results[i].c.toFixed(5)
                        ROW.appendChild(closePrice);
                        var highestPrice = document.createElement("td");
                        highestPrice.textContent = data.results[i].h.toFixed(5)
                        ROW.appendChild(highestPrice);
                        var lowestPrice = document.createElement("td");
                        lowestPrice.textContent = data.results[i].l.toFixed(5)
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

//Actual exchange rate
var exchangeApi = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=MXN&apikey=NUMLSX6XBZRICN82.";
function exchangeAPI() {
    fetch(exchangeApi)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    //Convert string to float and then round.
                    console.log(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
                    console.log(data["Realtime Currency Exchange Rate"]["8. Bid Price"]);
                    console.log(data["Realtime Currency Exchange Rate"]["9. Ask Price"]);
                    table2.textContent = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
                    table3.textContent = data["Realtime Currency Exchange Rate"]["8. Bid Price"];
                    table4.textContent = data["Realtime Currency Exchange Rate"]["9. Ask Price"];
                    return data;


                });
            }
        })
};
var tableExhange = document.getElementById('tableExhange');
var table1 = document.getElementById('table1');
var table2 = document.getElementById('table2');
var table3 = document.getElementById('table3');
var table4 = document.getElementById('table4');



exchangeAPI();
setInterval(exchangeAPI, 180000);

//We want to write a function that allows the user to search an specific exchange rate of a given day

var SubmitDate = document.getElementById("submit-date");
var InputDate =document.getElementById("date-input");
SubmitDate.addEventListener("click", submitDateFx)
function submitDateFx(event){
    event.preventDefault
    initialDate = InputDate.value.trim().toUpperCase();
    localStorage.setItem("userDates", initialDate);
    
    liveCharts = 'https://api.polygon.io/v2/aggs/ticker/C:MXNUSD/range/1/day/'+ initialDate +'/' + currentDate + '?unadjusted=true&sort=asc&limit=400&apiKey=H7QtCsKuVD7PIPFbgUJjIXjtWhwPj6kS'
    console.log(liveCharts)
    searchApi();
}

//Local storage



