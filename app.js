import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));
app.use(express.urlencoded({ extended: true }));

let tasks = [];

// Serve tasks on the main page
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Add a new task
app.post('/add', (req, res) => {
    const task = {
        id: Date.now(),  // Unique task identifier based on timestamp
        title: req.body.title,
        description: req.body.description || '',
        completed: false,  // Initially set as not completed
    };
    tasks.push(task);
    res.redirect('/');  // Redirect to the home page to see the updated list
});

// Toggle completion status of a task
app.post('/complete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);  // Parse the task ID from the URL

    // Update the task's completed status
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;  // Toggle completion status
        }
        return task;
    });

    res.redirect('/');  // Redirect to the home page to reflect changes
});

// Delete a task
app.post('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);  // Parse the task ID from the URL
    tasks = tasks.filter(task => task.id !== taskId);  // Remove the task by ID
    res.redirect('/');  // Redirect to the home page after deletion
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
