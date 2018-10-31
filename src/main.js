'use strict';

function showTime() {
    const date = new Date();
    const optioons = { hour: 'numeric', minute: 'numeric' };
    document.getElementById('clock-display').textContent = date.toLocaleString('uk-UA', optioons);
}

function date() {
    const date = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    document.getElementById('date-display').textContent = date.toLocaleString('uk-UA', options);
}
const initClock = () => {
    showTime();
    date();
    setInterval(showTime, 1000);
}

initClock();

const $todoListSection = document.getElementById('todo-list-section');
const $todoInput = document.getElementById('todo-input');

function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}

function listSectionClassToggle(element, className) {
    const classList = Array.from($todoListSection.classList);

    if (classList.includes('main-section-focus')) {
        element.classList.add(className);
    }
    else {
        element.classList.remove(className);
    }
}

$todoInput.addEventListener('focus',
    () => addClass($todoListSection, 'main-section-focus'));

$todoInput.addEventListener('blur',
    () => removeClass($todoListSection, 'main-section-focus'));

$todoListSection.addEventListener('transitionend',
    () => listSectionClassToggle($todoListSection, 'main-section-active'));




//fdsgfdgfdgdfgdfg


// const $simpleTagsInput = document.getElementById('simple-tags-input');
// const $simpleTagsList = document.getElementById('simple-tags-list');
// const $defaultTagsInput = document.getElementById('default-tags-input');
// const $defaultTagsList = document.getElementById('default-tags-list');
// const defaultTagsArr = ['1', 'super tag'];
// const tagsArr = [];

// function createTag({ key, target }, arr, tagList) {
//     if (key === 'Enter' && target.value.trim()) {
//         const $el = createTagElement(target.value);

//         tagList.appendChild($el);
//         arr.push(target.value);
//         target.value = '';
//     }
// }

// function removeTag(event, arr) {
//     const { target } = event;
//     const isRemoveBtn = target.classList.contains('remove-btn');
//     const $foo = target.parentElement.parentElement;
//     const $tag = target.parentElement;
//     const text = $tag.getElementsByClassName('tag-name')[0].innerHTML;

//     if (isRemoveBtn) {
//         $foo.removeChild($tag);
//         const index = arr.indexOf(text);
//         arr.splice(index, 1);
//     }
// }

// $defaultTagsInput.addEventListener('keyup',
//     () => createTag(event, defaultTagsArr, $defaultTagsList));

// $defaultTagsList.addEventListener('click',
//     () => removeTag(event, defaultTagsArr));




// $simpleTagsInput.addEventListener('keyup',
//     () => createTag(event, tagsArr, $simpleTagsList));

// $simpleTagsList.addEventListener('click',
//     () => removeTag(event, tagsArr));




// const createTagElement = content => {
//     const $li = document.createElement('li');

//     $li.className = 'tags-list-item';
//     $li.innerHTML = `
//     <span class='tag-name'>${content}</span>
//     <span class='remove-btn'>x</span>
//   `;

//     return $li;
// };
