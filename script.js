const input = document.querySelector("#fruit");
const suggestions = document.querySelector(".suggestions ul");

const fruit = [
  "Apple",
  "Apricot",
  "Avocado 🥑",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Currant",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Cucumber",
  "Custard apple",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Guava",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Juniper berry",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Longan",
  "Lychee",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Honeydew",
  "Watermelon",
  "Miracle fruit",
  "Mulberry",
  "Nectarine",
  "Nance",
  "Olive",
  "Orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Pineapple",
  "Pomegranate",
  "Pomelo",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Salak",
  "Satsuma",
  "Soursop",
  "Star fruit",
  "Strawberry",
  "Tamarillo",
  "Tamarind",
  "Yuzu",
];

function search(str) {
  let arrSearch = [];

  if (!str || str.length === 0) return (arrSearch = []); // Empty string
  // Filter the fruit array based on input
  arrSearch = fruit.filter((containsFruit) => containsFruit.includes(str));
  return arrSearch;
}

function searchHandler(e) {
  // TODO
  if (e.key === "Shift") return; // Ignore Shift key
  showSuggestions(search(this.value), this.value);
}

function showSuggestions(results, inputVal) {
  // TODO
  if (results.length === 0) {
    // If there are no results, clear suggestions and remove CSS class
    suggestions.innerHTML = "";
    suggestions.classList.remove("has-suggestions");
  } //if
  else {
    if (suggestions.classList.contains("has-suggestions")) {
      if (suggestions.childNodes.length < results.length) {
        // Broaden the suggestions
        broadSearch(results, suggestions, inputVal);
      } else {
        // Narrow down the suggestions
        narrowSearch(results, suggestions, inputVal);
      }
    } else {
      // Toggle suggestions
      toggleSuggestions(results, suggestions, inputVal);
    }
  } //else
}

function useSuggestion(e) {
  // TODO
  input.value = e.target.innerText;
  suggestions.innerHTML = "";
  suggestions.classList.remove("has-suggestions"); // Toggle off CSS
  return false;
}

function toggleSuggestions(arr, ulNodes, strVal) {
  ulNodes.classList.toggle("has-suggestions");
  arr.forEach((element) => {
    let createNewLi = document.createElement("li");
    let newStr = "";

    if (element.indexOf(strVal.toUpperCase()) != -1) {
      let convertChar = strVal.toUpperCase();
      let findUpper = element.indexOf(convertChar);
      newStr = element.slice(findUpper + 1);
      createNewLi.className = "has-suggestions";
      createNewLi.innerHTML = convertChar.bold() + newStr;
      ulNodes.appendChild(createNewLi);
    } else {
      createNewLi.className = "has-suggestions";
      createNewLi.innerHTML = element.replace(strVal, strVal.bold());
      ulNodes.appendChild(createNewLi);
    }
  }); // nested else
}

function narrowSearch(arr, ulNodes, strVal) {
  for (let i = 0; i < ulNodes.childNodes.length; i++) {
    if (!arr.includes(ulNodes.childNodes[i].innerText)) {
      ulNodes.childNodes[i].remove();
      i--;
    } //if
    else {
      // Lowercase string
      if (
        strVal.charAt(0).toUpperCase() ===
        ulNodes.childNodes[i].innerText.charAt(0)
      ) {
        let newStr = ulNodes.childNodes[i].innerText.slice(strVal.length);
        let capFirstChar = strVal.charAt(0).toUpperCase() + strVal.slice(1);
        ulNodes.childNodes[i].innerHTML = capFirstChar.bold() + newStr;
      } else {
        // Find the occurrence of the string
        if (strVal.charAt(0) === strVal.charAt(0).toLowerCase()) {
          let findLocation = ulNodes.childNodes[i].innerText.indexOf(strVal);
          let newStr = ulNodes.childNodes[i].innerText.slice(0, findLocation);
          let endStr = ulNodes.childNodes[i].innerText.slice(findLocation);
          ulNodes.childNodes[i].innerHTML =
            newStr + endStr.replace(strVal, strVal.bold());
        } else {
          let newStr = ulNodes.childNodes[i].innerText.slice(strVal.length);
          ulNodes.childNodes[i].innerHTML = strVal.bold() + newStr;
        }
      }
    } // else
  }
}

function broadSearch(arr, ulNodes, strVal) {
  arr.forEach((element, index) => {
    let createNewLi = document.createElement("li");
    let newStr = "";
    if (ulNodes.childNodes[index] === undefined) {
      if (element.indexOf(strVal.toUpperCase()) != -1) {
        let convertChar = strVal.toUpperCase();
        let findUpper = element.indexOf(convertChar);
        newStr = element.slice(findUpper + 1);
        createNewLi.className = "has-suggestions";
        createNewLi.innerHTML = convertChar.bold() + newStr;
        ulNodes.appendChild(createNewLi);
      } else {
        createNewLi.className = "has-suggestions";
        createNewLi.innerHTML = element.replace(strVal, `<b>${strVal}</b>`);
        ulNodes.appendChild(createNewLi);
      }
    } //if
    else {
      if (!strVal.toUpperCase()) {
        let convertChar = strVal.toUpperCase();
        let findUpper = element.indexOf(convertChar);
        newStr = element.slice(findUpper + 1);
        ulNodes.childNodes[index].innerHTML = convertChar.bold() + newStr;
      } else {
        ulNodes.childNodes[index].innerHTML = element.replace(
          strVal,
          `<b>${strVal}</b>`
        );
      }
    } //else
  }); //foreach element
}
input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);
