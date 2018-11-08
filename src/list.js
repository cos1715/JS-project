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
    this.$dialog = document.getElementById('dialog-window');
    this.todoArr = [];

    this.setEventListeners();
    this.storegeEnabled = this.checkLocalStorage();
  }

  setEventListeners () {
    this.$todoInput.addEventListener('keyup',
      () => this.createTodo(event));

    this.$todoList.addEventListener('click',
      () => this.removeTodo(event));

    this.$todoInput.addEventListener('focus',
      () => this.addClass(
        this.$todoListSection,
        'main-section-focus',
        'main-section-active'
      ));

    this.$todoInput.addEventListener('blur',
      () => {
        this.removeClass(
          this.$todoListSection,
          this.$todoList,
          'main-section-focus'
        );
        this.removeClass(
          this.$todoListSection,
          this.$todoList,
          'main-section-active'
        );
      });
  }

  checkLocalStorage () {
    if (typeof (Storage) !== 'undefined') {
      const storage = localStorage.getItem('todoArr');
      if (storage === null) {
        localStorage.setItem('todoArr', '');
      } else {
        if (!(storage === ''))
          this.restoreSession(storage);
      }
      return true;
    }
    return false;
  }

  restoreSession (storage) {
    this.addClass(this.$todoListSection, 'main-section-active');
    this.todoArr = this.todoArr.concat(storage.split(','));
    this.todoArr = this.todoArr.filter((item, index) => this.todoArr.indexOf(item) === index);
    this.todoArr.forEach(item => {
      this.appendTodo(item);
    });
  }

  appendTodo (value) {
    const $el = this.createTodoElement(value);

    this.calculateHeight(this.$todoList);
    this.$todoInput.value = '';
    this.$todoList.appendChild($el);
    $el.classList.add('opacity-to-one');
    $el.addEventListener('animationend', () => {
      this.$todoInput.blur();
    });
  }

  createTodoElement (content) {
    const $li = document.createElement('li');

    $li.className = 'section-ul-li';
    $li.innerHTML = `
      <label class='list-item-label'>
          <input type='checkbox' class='list-item-checkbox' />
          <span class='list-item-text'>${content}</span>
          <span class='list-item-checkmark'></span>
      </label>
      <i class='fas fa-times list-item-remove-icon'></i>`;
    return $li;
  }

  createTodo ({ key, target }) {
    if (key === 'Enter' && target.value.trim()) {
      this.todoArr.push(target.value);
      this.appendTodo(target.value);
      if (this.storegeEnabled) {
        localStorage.setItem('todoArr', this.todoArr);
      }
    }
  }

  removeTodo ({ target }) {
    const isRemove = target.classList.contains('list-item-remove-icon');
    const $todo = target.parentElement;
    const text = $todo.getElementsByClassName('list-item-text')[0].innerHTML;

    if (isRemove) {
      const index = this.todoArr.indexOf(text);

      this.todoArr.splice(index, 1);
      this.calculateHeight(this.$todoList);
      this.$todoList.removeChild($todo);
      this.removeClass(
        this.$todoListSection,
        this.$todoList,
        'main-section-focus'
      );
      this.removeClass(
        this.$todoListSection,
        this.$todoList,
        'main-section-active'
      );

      if (this.storegeEnabled) {
        localStorage.setItem('todoArr', this.todoArr);
      }
    }
  }

  calculateHeight ($el) {
    const liHeight = 45;
    const height = liHeight * this.todoArr.length;
    $el.style.height = `${height}px`;
  }

  addClass ($el, ...className) {
    $el.classList.add(...className);
  }

  removeClass ($el, $list, className) {
    const childNodesLength = 1;
    if ($list.childNodes.length === childNodesLength) {
      $el.classList.remove(className);
    } else {
      if (!(className === 'main-section-active'))
        $el.classList.remove(className);
    }
  }
}

new TodoList(listIds);
