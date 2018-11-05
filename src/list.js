'use strict';

const listIds = {
  todoListSection: 'todo-list-section',
  todoInput: 'todo-input',
  todoList: 'todo-list'
};

class TodoList {
  constructor (id) {

    this.$todoListSection = document.getElementById(id.todoListSection);
    this.$todoInput = document.getElementById(id.todoInput);
    this.$todoList = document.getElementById(id.todoList);
    this.todoArr = [];

    this.$todoInput.addEventListener('keyup',
      () => this.createTodo(event));

    this.$todoList.addEventListener('click',
      () => this.removeTodo(event));

    this.$todoInput.addEventListener('focus',
      () => this.addClass(
        this.$todoListSection,
        'main-section-active',
        'main-section-focus'
      ));

    this.$todoInput.addEventListener('blur',
      () => this.removeClass(
        this.$todoListSection,
        this.$todoList,
        'main-section-active',
        'main-section-focus'
      ));
  }

  createTodoElement (content) {
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
  }

  createTodo ({ key, target }) {
    if (key === 'Enter' && target.value.trim()) {
      const $el = this.createTodoElement(target.value);

      this.todoArr.push(target.value);
      const height = 45 * this.todoArr.length;
      this.$todoList.style.height = `${height}px`;

      this.$todoList.appendChild($el);
      $el.classList.add('opacity-to-one');
      $el.addEventListener('animationend', () => {
        this.$todoInput.value = '';
        this.$todoInput.blur();
      });
    }
  }

  removeTodo ({ target }) {
    const isRemove = target.classList.contains('list-item-remove-icon');
    const $todo = target.parentElement;
    const text = $todo.getElementsByClassName('list-item-text')[0].innerHTML;

    if (isRemove) {
      const index = this.todoArr.indexOf(text);
      const height = 45 * this.todoArr.length;

      this.todoArr.splice(index, 1);
      this.$todoList.style.height = `${height}px`;
      this.$todoList.removeChild($todo);
      this.removeClass(
        this.$todoListSection,
        this.$todoList,
        'main-section-active',
        'main-section-focus'
      );
    }
  }

  addClass ($el, ...className) {
    $el.classList.add(...className);
  }

  removeClass ($el, $list, ...className) {
    const childNodesLength = 1;

    if ($list.childNodes.length === childNodesLength) {
      $el.classList.remove(...className);
    } else {
      $el.classList.remove(className[1]);
    }
  }
}

new TodoList(listIds);
