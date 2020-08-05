# Event Listeners Demo

## Step-by-Step Guide to Live Code

### **Step 1** - Walkthrough
- Walk the students through the existing files:
  - `index.html`
  - `style.css` (briefly as this isn't important to the lecture)

- **Prompt students: _Let's keep our code modular. What can we create in order to incorporate JavaScript into our application?_**
  - Hint: Point out line 5 in the `index.html` file.

- Let's create that `main.js` file since our `index.html` is already expecting it.
  - `touch main.js`

### **Step 2** - Adding our first event listener
- Let's add an event listener to the `div` with the inner text "Four".
  - **Prompt students: _How can I access that `div`?_**
    - Feel free to show the students the MDN documentation to get them familiar and comfortable with it: [Document.getElementById()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById).
    ```js
    let divFour = document.getElementById('child-four')
    ```
  - **Prompt students: _Now that I have the `div` assigned to my `divFour` variable, how can I attach a listener?_**
    - Again, show the students the MDN documentation: [EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
    ```js
    /*
    Element.addEventListener(
      'event-type' (string),
      <callback> (function),
      useCapture (boolean) OR options (object) << optional arguments
    )
    Documentation:
    https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    */

    divFour.addEventListener('click', (e) => {
      console.log("Target >> Clicked div 'Four'")
      console.log("e >>", e) // the Event object
      console.log("e.target >>", e.target) // the target element
      console.log("e.target.innerText >>", e.target.innerText) // Other Element properties: https://developer.mozilla.org/en-US/docs/Web/API/Element
      console.log("this >> ", this) // the "this" context
      // e.stopPropagation() // prevents other "click" handlers from running upstream in the bubbling phase
    })
    ```

### **Step 3** - Demonstrate event bubbling

- Let's say we want to demonstrate event **bubbling**.
  - **Prompt students:**
    - _First, which phase does "bubbling" occur in the event life cycle?_
      - The third and final phase with the "capture" phase being the first and the "target" phase being the second.
    - _With that being said, what do we need to do in order to show an event listener being triggered during the bubbling phase?_
      - Add an event listener to an element that is an ascendant of `div` "Four".
      ```js
      let mainEl = document.getElementById('main')

      mainEl.addEventListener('click', (e) => {
        console.log("Bubbling Phase >> 'click' handler running on 'main' div")
      }) // when "true" isn't passed as third argument to `addEventListener`, by default, it sets `useCapture` to "false", thus the handler is run during the Bubbling Phase
      ```
    - _What if we wanted to trigger an event listener during the capture phase?_
      - Create another event listener where we pass a boolean as the third argument to `addEventListener` so that `useCapture` is set to `true.`
      ```js
      mainEl.addEventListener('click', (e) => {
        console.log("Capture Phase >> 'click' handler running on 'main' div")
      }, true) // the "true" to the left sets the optional `addEventListener` third argument, `useCapture`, to `true` so that this handler is run during the Capture Phase
      ```

- Reference: [MDN: Bubbling and capturing explained](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Bubbling_and_capturing_explained)

### **Step 4** - Demonstrate event delegation

**Note:** If there's no time, save the following for morning review.

- Let's take this another step further and talk about "event delegation."
  - **Prompt students:** _Can someone remind me what event delegation is, please?_
    - Event delegation is a concept that relies on the fact that if you want some code to run when you click (for example) on any one of a large number of child elements, you can set the event listener on their parent and have events that happen on them bubble up to their parent rather than having to set the event listener on ***every child individually***.
      - Reference: [MDN: Event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_delegation)

- A good example is a series of list items so let's add a list to our HTML file.
  - Ask students for their favorite songs as you create the list.
    ```html
    <h1>Favorite Songs:</h1>
    <ul id="song-list">
      <li class="song">Student Song 1</li>
      <li class="song">Student Song 2</li>
      <li class="song">Student Song 3</li>
      <li class="song">Student Song 4</li>
    </ul>
    ```

- **Prompt students:** _Now that we have our list (refresh the page in the browser), let's talk about what we would have to do if event delegation didn't exist in our toolbox._
  - We'd have to attach an event listener on each of our songs individually. No, thank you! That's a lot of work!
    - If time allows, feel free to show how tedious this would be:
    ```js
    // *Without* Event Delegation
    let songs = document.getElementsByClassName('song')

    songs[0].addEventListener('click', (e) => {
      songs[0].setAttribute('hidden', true)
    })
    songs[1].addEventListener('click', (e) => {
      songs[1].setAttribute('hidden', true)
    })
    songs[2].addEventListener('click', (e) => {
      songs[2].setAttribute('hidden', true)
    })
    songs[3].addEventListener('click', (e) => {
      songs[3].setAttribute('hidden', true)
    })

    Array.from(songs)
      .forEach(song => {
        song.addEventListener('click', (e) => {
          song.setAttribute('hidden', true)
        })
      })
    ```

- **Prompt students:**
  - _To see event delegation in action, to which element should we attach an event listener?_
    - Any parent, but in this case, let's stick close to home and select the `ul` element.
    ```js
    let songList = document.getElementById('song-list')
    ```
    - Now let's add that event listener.
    ```js
    songList.addEventListener('click', (e) => {
      // The target will *always* be the exact element in which the user triggered the event (hence "event.target")

      // You can always add some logic here to isolate code from running depending on what the target is
      // For example, if the <ul> is the target, and we set the <ul>'s "hidden" attribute to `true`, the entire list would disappear (the target element and whatever may be nested within that element).
      // Since we don't want the entire list to be hidden so let's only run our code when the child <li>s are clicked.
      if (e.target.tagName == 'LI') {
        e.target.setAttribute('hidden', true)
      }

      // Otherwise, do nothing :)
    })
    ```
