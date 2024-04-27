
if(window.matchMedia("(min-width: 640px)").matches == true)
{
    var allElements = document.querySelectorAll('*');

// Iterate through each element and set pointer-events to "none"
allElements.forEach(function(element) {
    element.style.pointerEvents = 'none';
    element.style.filter = 'blur(5px)';
});



} 
