module.exports = function sortTasks(tasks) {
  const sortedTasks = {};
  tasks.forEach((task) => {
    const taskStatus = task.get("status");
    if (sortedTasks[taskStatus]) {
      sortedTasks[taskStatus].push(task);
    } else {
      sortedTasks[taskStatus] = [task];
    }
  });
  return sortedTasks;
};
