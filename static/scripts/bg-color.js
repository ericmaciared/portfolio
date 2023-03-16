

window.addEventListener('scroll', function() {
    // Get the current vertical position of the screen
    const scrollTop = window.scrollY || window.pageYOffset;

    // Get the height of the viewport
    const viewportHeight = window.innerHeight;

    // Calculate the percentage of the page that has been scrolled
    const scrollPercent = (scrollTop / (document.body.scrollHeight - viewportHeight)) * 100;

    console.log(scrollPercent);

    // Set the background color based on the scroll percentage
    if (scrollPercent <= 50) {
        document.body.style.setProperty("background-color", "lightblue", "important");
    } else if (scrollPercent <= 75) {
        document.body.style.setProperty("background-color", "lightgreen", "important");
    } else {
        document.body.style.setProperty("background-color", "yellow ", "important");
    }
});