const tooltip = document.querySelector('.js-tooltip');
const tooltipText = tooltip.querySelector('.tooltip__text');

document.querySelectorAll('.js-tooltip-show').forEach((element)  => {
  element.addEventListener('mouseover', function() {
    tooltipText.innerText = element.getAttribute('data-tooltip-text');
    let {left:x, top:y} = element.getBoundingClientRect();
    if (x < 310) {
      tooltip.classList.add('tooltip--right');
      tooltip.style.left = `${x + element.offsetWidth + 10 + 50}px`;
    } else {
      tooltip.classList.add('tooltip--left');
      tooltip.style.left = `${x - tooltip.offsetWidth - 10 - 50}px`;
    }
    tooltip.style.top = `${y - (tooltip.offsetHeight - element.offsetHeight)/2}px`;
    tooltip.classList.add('tooltip--active');
  });
  
  element.addEventListener('mouseout', function() {
    tooltip.classList.remove('tooltip--active');
    if (tooltip.classList.contains('tooltip--right')) {
      tooltip.classList.remove('tooltip--right');
    }
    if (tooltip.classList.contains('tooltip--left')) {
      tooltip.classList.remove('tooltip--left');
    }
    tooltip.style.left = '-999999px';
    tooltip.style.top = '-999999px';
    tooltipText.innerText = '';
  });
});