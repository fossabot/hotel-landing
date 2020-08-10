const rating = document.querySelector('.rate-button');
rating.addEventListener('click', function(event) {
    const clicked = event.target.dataset.id;
    rating.childNodes.forEach(function (item, index) {
        if (index < clicked) {
            item.innerHTML = "star";
        } else {
            item.innerHTML = "star_border";
        }
    })
})
