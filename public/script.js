document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const scheduledTime = document.getElementById('scheduledTime').value;

    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, scheduledTime }),
    });

    if (response.ok) {
        alert('Task created successfully!');
        document.getElementById('taskForm').reset();
        loadTasks();
    } else {
        alert('Error creating task');
    }
});

async function loadTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.textContent = `${task.title} - ${task.scheduledTime}`;
        taskList.appendChild(taskItem);
    });
}

// Load tasks on page load
loadTasks();