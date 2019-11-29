/* eslint-disable import/prefer-default-export */
export const sortTasks = (tasks) => {
  const sortedTasks = {};
  tasks.forEach((task) => {
    const taskStatus = task.status;
    if (sortedTasks[taskStatus]) {
      sortedTasks[taskStatus].push(task);
    } else {
      sortedTasks[taskStatus] = [task];
    }
  });
  return sortedTasks;
};
