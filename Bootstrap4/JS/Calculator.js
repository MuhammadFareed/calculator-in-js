function getHistory() {
  return document.getElementById("history-value").innerText;
}

function printHistory(get_num) {
  document.getElementById("history-value").innerText = get_num;
}

function getOutput() {
  return document.getElementById("output-value").innerText;
}

function printOutput(get_num) {
  if (get_num === "") {
    document.getElementById("output-value").innerText = get_num;
  } else {
    document.getElementById("output-value").innerText = getFormattedNumber(
      get_num
    );
  }
}

function getFormattedNumber(get_num) {
  if (get_num === "-") {
    return "";
  }
  var n = Number(get_num);
  var value = n.toLocaleString("en");
  return value;
}

function reverseNumberFormat(get_num) {
  return Number(get_num.replace(/,/g, ""));
}

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id === "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id === "backspace") {
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        output = output.slice(0, output.length - 1);
        printOutput(output);
      }
    } else {
      var output = getOutput();
      var history = getHistory();
      if (output === "" && history !== "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output === "" ? output : reverseNumberFormat(output);
        history += output;
        if (this.id === "=") {
          var result = eval(history);
          printHistory(result);
          printOutput("");
        } else {
          history += this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}
var number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      output += this.id;
      printOutput(output);
    }
  });
}