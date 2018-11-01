'use strict';
const $todoListSection = document.getElementById('todo-list-section');
const $todoInput = document.getElementById('todo-input');
const $todoList = document.getElementById('todo-list');

const todoArr = [];


const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

const listSectionClassToggle = (element, className) => {
  const classList = Array.from($todoListSection.classList);

  if (classList.includes('main-section-focus')) {
    element.classList.add(className);
  } else {
    if (!($todoList.childNodes.length > 1)) {
      element.classList.remove(className);
    }
  }
};

const createTodoElement = content => {
  const $li = document.createElement('li');

  $li.className = 'section-ul-li';
  $li.innerHTML = `
    <label class="list-item-label">
        <input type="checkbox" class="list-item-checkbox" />
        <span class="list-item-text">${content}</span>
        <span class="list-item-checkmark"></span>
    </label>
    <i class="fas fa-times list-item-remove-icon"></i>`;
  return $li;
};

const createTag = ({ key, target }) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTodoElement(target.value);
    todoArr.push(target.value);
    const height = 45 * todoArr.length;
    $todoList.style.height = `${height}px`;
    $todoList.appendChild($el);
    $el.classList.add('opacity-to-one');
    $todoInput.value = '';
    $todoInput.blur();
  }
};

const removeTag = event => {
  const { target } = event;
  const isRemove = target.classList.contains('list-item-remove-icon');
  const $todo = target.parentElement;
  const text = $todo.getElementsByClassName('list-item-text')[0].innerHTML;

  if (isRemove) {
    $todoList.removeChild($todo);
    const index = todoArr.indexOf(text);
    todoArr.splice(index, 1);
    const height = 45 * todoArr.length;
    $todoList.style.height = `${height}px`;
    listSectionClassToggle($todoListSection, 'main-section-active');
  }
};

$todoInput.addEventListener('focus',
  () => addClass($todoListSection, 'main-section-focus'));
$todoInput.addEventListener('blur',
  () => removeClass($todoListSection, 'main-section-focus'));
$todoInput.addEventListener('keyup',
  () => createTag(event));
$todoListSection.addEventListener('transitionend',
  () => listSectionClassToggle($todoListSection, 'main-section-active'));
$todoList.addEventListener('click',
  () => removeTag(event));


