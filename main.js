/*
Element.addEventListener(
  'event-type' (string),
  <callback> (function),
  useCapture (boolean) OR options (object) << optional arguments
)
Documentation:
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
*/

let divFour = document.getElementById('child-four')

divFour.addEventListener('click', (e) => {
  console.log("Target >> Clicked div 'Four'")
  console.log("e >>", e) // the Event object
  console.log("e.target >>", e.target) // the target element
  console.log("this >> ", this) // the "this" context
  // e.stopPropagation() // prevents other "click" handlers from running upstream in the bubbling phase
})

let mainEl = document.getElementById('main')

mainEl.addEventListener('click', (e) => {
  console.log("Capture Phase >> 'click' handler running on 'main' div")
}, true) // the "true" to the left sets the optional `addEventListener` third argument, `useCapture`, to `true` so that this handler is run during the Capture Phase

mainEl.addEventListener('click', (e) => {
  console.log("Bubbling Phase >> 'click' handler running on 'main' div")
}) // when "true" isn't passed as third argument to `addEventListener`, by default, it sets `useCapture` to "false", thus the handler is run during the Bubbling Phase


// Event Delegation

// *Without* Event Delegation
// let songs = document.getElementsByClassName('song')

// songs[0].addEventListener('click', (e) => {
//   songs[0].setAttribute('hidden', true)
// })
// songs[1].addEventListener('click', (e) => {
//   songs[1].setAttribute('hidden', true)
// })
// songs[2].addEventListener('click', (e) => {
//   songs[2].setAttribute('hidden', true)
// })
// songs[3].addEventListener('click', (e) => {
//   songs[3].setAttribute('hidden', true)
// })

// Array.from(songs)
//   .forEach(song => {
//     song.addEventListener('click', (e) => {
//       song.setAttribute('hidden', true)
//     })
//   })

// *With* Event Delegation
let songList = document.getElementById('song-list')

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
