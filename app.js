var taskInput = document.getElementById('new-task');
var addButton = document.querySelector('.task__add-btn');
var incompleteTaskHolder = document.getElementById('incomplete-tasks');
var completedTasksHolder = document.getElementById('completed-tasks');

//New task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement('li');
  listItem.className = 'list__item';

  var checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'task__checkbox';

  var label = document.createElement('label');
  label.className = 'task__label';
  label.innerText = taskString;

  var editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task__input';

  var editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'button task__edit-btn';

  var deleteButton = document.createElement('button');
  deleteButton.className = 'button task__del-btn';

  var deleteButtonImg = document.createElement('img');
  deleteButtonImg.className = 'button__img';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'remove-btn';

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function() {
  console.log('Add Task...');

  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

//Edit an existing task.

var editTask = function() {
  console.log('Edit Task...');
  console.log('Change "edit" to "save"');


  var listItem = this.parentNode;

  var editInput = listItem.querySelector('.task__input');
  var label = listItem.querySelector('.task__label');
  var editBtn = listItem.querySelector('.task__edit-btn');
  var containsClass = listItem.classList.contains('edit-mode');
  //If class of the parent is .editmode
  if(containsClass){
        //switch to .editmode
      //label becomes the inputs value.
      label.innerText = editInput.value;
      editBtn.innerText = 'Edit';
  } else {
      editInput.value = label.innerText;
      editBtn.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('edit-mode');
};

//Delete task.
var deleteTask = function() {
  console.log('Delete Task...');

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

};

//Mark task completed
var taskCompleted = function() {
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

};

var taskIncomplete = function() {
  console.log('Incomplete Task...');

  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
};



var ajaxRequest = function() {
    console.log('AJAX Request');
};

addButton.onclick = addTask;
addButton.addEventListener('click',addTask);
addButton.addEventListener('click',ajaxRequest);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  console.log('bind list item events');

  var checkBox = taskListItem.querySelector('.task__checkbox');
  var editButton = taskListItem.querySelector('.task__edit-btn');
  var deleteButton = taskListItem.querySelector('.task__del-btn');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}