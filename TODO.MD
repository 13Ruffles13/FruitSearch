# Step 1: Plannings

- What HTML would you use for the search bar? How about the drop down, the search button, and the filler text which will appear on the page?
  - For the search bar I would use a simple form to select the search term and the filler text which will appear on the page
  - Drop down menu will be a div which will contain the search term once the user begins to type
    text
  - The filler text will appear on the page taking the value and searching through the DB of words
- What CSS would you use to create the color gradient on the page?
  - To create color gradient on the page I would use the CSS property RGB to create the color gradient
- What type of JavaScript event listeners would you need to add to refresh the drop-down as a user types?
  - On change event listeners, keystroke events, or focus events.
- How would you populate the search bar with an option from the drop down list? What event would trigger this action?
  - I could create an a div element that will fire once an event is triggered that is monitoring any change with text or keystroke events.
- How would you structure your functions?
  - I would want to have simple functions that perform a certain action. For ex: drop-down(), searchBar(), submitSearchBar()

# Step 2: Read the starter code

- Takes in one input from the user. From that result we fire a div element that will dropdown a search menu in the form of a un-order list of fruits.
  - Using events keyup and click events

# Step 3: Create a search bar on Screen

[x] Create a search bar using HTML which accepts user input on screen.

# Step 4: Add Placeholder text into the search bar

[x] Whenever there is no user input in the search bar, it should populate with the string “Search fruit 🍎”.

# Step 5: Add an event listener for key strokes

[x] Create an event listener in JavaScript that will trigger when a user types.

# Step 6: Filter the list based on user input

[x] search(), which will trigger based on the event listener you created in the last step
[x] function will return a list called results. This function will filter the fruit list based on whatever user input is in the search box
[x] If the string in the user input appears ANYWHERE in the fruit name, it should be added to results list.
[x] It also should not matter if a user types upper or lower case letters. That means that if a user types “ap” both “Apple” and “Grape” will appear in the results list.

# Step 7: Display the results list as a drop down menu

[x] Take the list created in the previous step in a drop down list below the search bar.

# Step 8: Highlight the suggestion below a user's cursor

[x] Add an event listener to trigger whenever a user hovers over one of the suggestions in the drop down list. Write a function which highlights the suggestion. Attach this function to the event listener.

# Step 9: Populate the search box with a user's selected suggestion

[x] When a user clicks on a suggestion, that string should fill the Search Bar. Add an event listener which triggers when a user clicks. Write a function useSuggestion() to populate the Search Bar with the suggestion. Add this function to the event listener.

# Step 10: Style the page

[x] Add a linear-gradient CSS styling to the page which matches the mockup. This should style both the background and the search bar.
