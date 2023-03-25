function resizeContent() {
  var contentDiv = document.getElementById("content");
  var headerDiv = document.getElementById("header");
  // This may need to be done differently on IE than FF, but you get the idea.
  var viewPortHeight = window.innerHeight - headerDiv.clientHeight;
  contentDiv.style.height =
    Math.max(viewportHeight, contentDiv.clientHeight) + "px";
}
