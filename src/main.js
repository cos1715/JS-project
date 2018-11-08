import  DateClass  from './date';
import  TodoList  from './list';

const dateIds = {
  clock: 'clock-display',
  date: 'date-display',
  weather: 'weather-display'
};

const listIds = {
  todoListSection: 'todo-list-section',
  todoInput: 'todo-input',
  todoList: 'todo-list'
};

const dateClass = new DateClass(dateIds);

dateClass.runClock();

new TodoList(listIds);