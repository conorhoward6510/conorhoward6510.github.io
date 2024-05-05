function convert() {
  const value = document.getElementById("inputField").value;
  const conversion = document.getElementById("conversionSelection").value;

  const resultValue =
    conversion === "MtK" ? value * 1.609 + " Km" : value / 1.609 + " mi";
  document.getElementById("resultSpan").innerHTML = resultValue;
}

function clearSpan() {
  document.getElementById("resultSpan").innerHTML = "";
}
