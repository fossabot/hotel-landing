/* eslint-disable no-param-reassign */
const rating = document.querySelector('.rate-button');
rating.addEventListener('click', (event) => {
  const clicked = event.target.dataset.id;
  rating.childNodes.forEach((item, index) => {
    if (index < clicked) {
      item.innerHTML = 'star';
    } else {
      item.innerHTML = 'star_border';
    }
  });
});
