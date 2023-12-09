let workButtons = document.querySelectorAll('.button[data-name]');
let workTexts = document.querySelectorAll('.text[data-name]');

function clearActive(elements, selector) {
    for (const element of elements) {
        element.classList.remove(selector);
    }
}


workButtons.forEach((element) => {
    element.addEventListener('click', () => {
        if (element.classList.contains('button--active')){
            return false;
        }
        let name = element.getAttribute('data-name');
        let text = Array.from(workTexts).find((text) => text.getAttribute('data-name') === name);
        if (text) {
            clearActive(workButtons, 'button--active');
            clearActive(workTexts, 'text--active');
            text.classList.add('text--active');
            element.classList.add(('button--active'));
        }
    });
});

let skillsBlock = document.querySelector('.js-skills');

skillsBlock.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-skill-delete')) {
        let skill = event.target.closest('.skill');
        if (skill) {
            skill.remove();
        }
    }

    const skillBar = event.target.closest('.skill_range');
    if (skillBar) {
        const containerWidth = skillBar.offsetWidth;
        const clickX = event.offsetX;
        const percentage = (clickX / containerWidth) * 100;
        skillBar.querySelector('.filled').style.width = `${percentage}%`;
    }
});

let skillForm = document.querySelector('.js-skill-add');

skillForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = skillForm.querySelector('#skill_name');
    const percentage = skillForm.querySelector('#skill_percentage');
    if (isNaN(percentage.value)) {
        alert('ERROR: Skill proficiency percentage is not a number!');
        return false;
    }
    if (percentage.value < 1 || percentage.value > 100) {
        alert('ERROR: Skill proficiency percentage should be in the range from 1 to 100!');
        return false;
    }
    // Create skill container
    const skillContainer = document.createElement('div');
    skillContainer.classList.add('skill');

    // Create skill title
    const skillTitle = document.createElement('div');
    skillTitle.classList.add('skill_title');
    skillTitle.textContent = name.value;

    // Create SVG element for skill delete
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.classList.add('js-skill-delete');
    svgElement.setAttribute("width", "16");
    svgElement.setAttribute("height", "16");
    svgElement.setAttribute("viewBox", "0 0 16 16");
    svgElement.setAttribute("fill", "none");

    // Create path element for SVG
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute("fill-rule", "evenodd");
    pathElement.setAttribute("clip-rule", "evenodd");
    pathElement.setAttribute("d", "M3.21967 3.21967C3.51256 2.92678 3.98744 2.92678 4.28033 3.21967L8 6.93934L11.7197 3.21967C12.0126 2.92678 12.4874 2.92678 12.7803 3.21967C13.0732 3.51256 13.0732 3.98744 12.7803 4.28033L9.06066 8L12.7803 11.7197C13.0732 12.0126 13.0732 12.4874 12.7803 12.7803C12.4874 13.0732 12.0126 13.0732 11.7197 12.7803L8 9.06066L4.28033 12.7803C3.98744 13.0732 3.51256 13.0732 3.21967 12.7803C2.92678 12.4874 2.92678 12.0126 3.21967 11.7197L6.93934 8L3.21967 4.28033C2.92678 3.98744 2.92678 3.51256 3.21967 3.21967Z");
    pathElement.setAttribute("fill", "#363E45");
    pathElement.setAttribute("fill-opacity", "0.32");

    // Append path element to SVG element
    svgElement.appendChild(pathElement);

    // Append SVG element to skill title
    skillTitle.appendChild(svgElement);

    // Create skill range container
    const skillRangeContainer = document.createElement('div');
    skillRangeContainer.classList.add('skill_range');

    // Create filled div inside skill range
    const filledDiv = document.createElement('div');
    filledDiv.classList.add('filled');
    filledDiv.style.width = `${percentage.value}%`;

    // Append filled div to skill range container
    skillRangeContainer.appendChild(filledDiv);

    // Append skill title and skill range container to skill container
    skillContainer.appendChild(skillTitle);
    skillContainer.appendChild(skillRangeContainer);
    skillsBlock.appendChild(skillContainer);
    name.value = '';
    percentage.value = '';
});


const nav = document.querySelector('nav');

const changeNav = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            nav.querySelector('.button--active').classList.remove('button--active');
            const id = entry.target.getAttribute('id');
            nav.querySelector(`[href="#${id}"]`).classList.add('button--active');
        }
    });
}

const options = {
    threshold: 0.55
}

const observer = new IntersectionObserver(changeNav, options);

const sections = document.querySelectorAll('section');
sections.forEach((section) => {
    observer.observe(section);
});