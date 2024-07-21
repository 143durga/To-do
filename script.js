// script.js
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
        } else if (e.target.classList.contains('edit-btn')) {
            editTask(e.target.parentElement);
        } 
    });

    taskList.addEventListener('change', function(e) {
        if (e.target.classList.contains('checkbox')) {
            e.target.parentElement.classList.toggle('completed');
        }
    });

    function addTask(task) {
        if (task.trim() === '') return;
        
        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task;
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';

        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    }

    function editTask(taskItem) {
        const taskSpan = taskItem.querySelector('span');
        const currentText = taskSpan.textContent;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = currentText;

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.className = 'save-btn';

        taskItem.innerHTML = '';
        taskItem.appendChild(editInput);
        taskItem.appendChild(saveBtn);

        saveBtn.addEventListener('click', function() {
            const newText = editInput.value;
            if (newText.trim() === '') return;

            taskSpan.textContent = newText;
            taskItem.innerHTML = '';
            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskSpan);
            taskItem.appendChild(createButton('Edit', 'edit-btn'));
            taskItem.appendChild(createButton('Delete', 'delete-btn'));
        });
    }

    function createButton(text, className) {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.className = className;
        return btn;
    }
});
