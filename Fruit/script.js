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

  if (!str || str.length === 0) return (arrSearch = []); // empty string

  if (str.charAt(0) === str.charAt(0).toUpperCase()) {
    arrSearch = fruit.filter((containsFruit) => containsFruit.includes(str));
  } else {
    //FORCE CHECK UPPER CASE FRUITS
    let upperCaseSearch = [];
    let convertStr = str.charAt(0).toUpperCase() + str.slice(1);
    upperCaseSearch = fruit.filter((containsFruit) => {
      return containsFruit.includes(convertStr);
    });

    let lowerCaseSearch = [];
    lowerCaseSearch = fruit.filter((containsFruit) => {
      return containsFruit.includes(str);
    });

    arrSearch = upperCaseSearch.concat(lowerCaseSearch); // concat upper and lower case arrays together

    let index = 0;
    for (let i = 0; i < arrSearch.length - 1; i++) {
      for (let j = i + 1; j < arrSearch.length; j++) {
        if (arrSearch[i] === arrSearch[j]) {
          arrSearch.splice(i, 1);
          index++;
        }
      }
    }
  }
  return arrSearch;
}

function searchHandler(e) {
  // TODO
  if (e.key === "Shift") return false;
  showSuggestions(search(this.value), this.value);
}

function showSuggestions(results, inputVal) {
  // TODO
  // LOCATION TO ADD LI'S
  const getUl = document.querySelector(".suggestions ul");
  // If input is empty delete all li's present
  if (results.length === 0) {
    while (getUl.firstChild) {
      getUl.removeChild(getUl.firstChild);
    }
    getUl.classList.remove("has-suggestions"); // toggle off CSS

    return false;
  } else {
    // if toggle is enabled leave CSS turned on
    if (getUl.classList.contains("has-suggestions")) {
      if (getUl.childNodes.length < results.length) {
        broadSearch(results, getUl, inputVal);
      } else {
        narrowSearch(results, getUl, inputVal);
      }
    } else {
      toggleSuggestions(results, getUl, inputVal);
    }
  }
}

function useSuggestion(e) {
  // TODO
  input.value = e.target.innerText;
  while (suggestions.firstChild) {
    suggestions.removeChild(suggestions.firstChild);
  }
  suggestions.classList.remove("has-suggestions"); // toggle off CSS

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
      let replaceChar = element;
      replaceChar = replaceChar.replace(strVal, strVal.bold());
      createNewLi.className = "has-suggestions";
      createNewLi.innerHTML = replaceChar;
      ulNodes.appendChild(createNewLi);
    }
  }); // nested else
}

function narrowSearch(arr, ulNodes, strVal) {
  for (let i = 0; i < ulNodes.childNodes.length; i++) {
    if (!arr.includes(ulNodes.childNodes[i].innerText)) {
      ulNodes.childNodes[i].remove();
      i--;
    } else {
      // LOWER CASE STR
      if (
        strVal.charAt(0).toUpperCase() ===
        ulNodes.childNodes[i].innerText.charAt(0)
      ) {
        let newStr = ulNodes.childNodes[i].innerText.slice(strVal.length);
        let capFirstChar = strVal.charAt(0).toUpperCase() + strVal.slice(1);
        ulNodes.childNodes[i].innerHTML = capFirstChar.bold() + newStr;
      } else {
        // FIND THE OCCURRENCE OF THE STRING
        if (strVal.charAt(0) === strVal.charAt(0).toLowerCase()) {
          let findLocation = ulNodes.childNodes[i].innerText.indexOf(strVal);
          let newStr = ulNodes.childNodes[i].innerText.slice(0, findLocation);
          let endStr = ulNodes.childNodes[i].innerText.slice(findLocation);
          let replaceStr = endStr;
          replaceStr = replaceStr.replace(strVal, strVal.bold());
          ulNodes.childNodes[i].innerHTML = newStr + replaceStr;
        } else {
          let newStr = ulNodes.childNodes[i].innerText.slice(strVal.length);
          ulNodes.childNodes[i].innerHTML = strVal.bold() + newStr;
        }
      }
    }
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
        let replaceChar = element;
        replaceChar = replaceChar.replace(strVal, `<b>${strVal}</b>`);
        createNewLi.className = "has-suggestions";
        createNewLi.innerHTML = replaceChar;
        ulNodes.appendChild(createNewLi);
      }
    } else {
      if (!strVal.toUpperCase()) {
        let convertChar = strVal.toUpperCase();
        let findUpper = element.indexOf(convertChar);
        newStr = element.slice(findUpper + 1);
        ulNodes.childNodes[index].innerHTML = convertChar.bold() + newStr;
      } else {
        let replaceChar = element;
        replaceChar = replaceChar.replace(strVal, `<b>${strVal}</b>`);
        ulNodes.childNodes[index].innerHTML = replaceChar;
      }
    }
  });
}

input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);
