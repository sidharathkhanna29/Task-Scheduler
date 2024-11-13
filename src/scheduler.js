const cron = require('node-cron');
const Task = require('./models/taskModel');
const { sendNotification } = require('./services/notificationService');

const scheduleNotification = (task) => {
    const taskTime = new Date(task.scheduledTime);
    const now = new Date();

    if (taskTime > now) {
        const delay = taskTime.getTime() - now.getTime();
        setTimeout(() => {
            sendNotification(task);
            task.notified = true;
            task.save();
        }, delay);
    }
};

// Schedule a cron job to check for tasks every minute
cron.schedule('* * * * *', async () => {
    const tasks = await Task.find({ notified: false });
    const now = new Date();

    tasks.forEach(task => {
        const taskTime = new Date(task.scheduledTime);
        if (taskTime <= now) {
            sendNotification(task);
            task.notified = true;
            task.save();
        }
    });
});

module.exports = { scheduleNotification };