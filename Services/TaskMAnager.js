import { Task } from "../model/Task.js";
import fs from "fs";
export class TaskManager {
  constructor() {
    this.tasks = [];
    this.loadFromFile();
  }

  //   file loading method
  loadFromFile() {
    try {
      const data = fs.readFileSync("./utils/tasks.json", "utf-8");
      this.tasks = JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  }
  saveFile() {
    try {
      fs.writeFileSync(
        "./utils/tasks.json",
        JSON.stringify(this.tasks),
        "utf-8"
      );
    } catch (error) {
      console.error(error);
    }
  }
  // Add the TAsk method
  addTask(Title, Description, Priority, DueDate) {
    const Id = this.tasks.length + 1;
    const addTask = new Task(Id, Title, Description, Priority, DueDate);
    this.tasks.push(addTask);
    this.saveFile();
  }
  // View all tasks
  viewTasks() {
    return this.tasks;
  }

  //   Delete the task method
  deleteTask(Id) {
    this.tasks = this.tasks.filter((task) => task.Id !== Id);
    this.saveFile();
    console.log(`Task with Id ${Id} has been deleted.`);
  }

  //   Edit task method
  editTask(Id, updatedFields) {
    const task = this.tasks.find((task) => task.Id === Id);
    if (task) {
      Object.assign(task, updatedFields);
      this.saveFile();
      console.log(`Task with Id ${Id} has been updated.`);
    } else {
      console.log(`Task with Id ${Id} not found.`);
    }
  }

  //   task completion method
  markComplete(Id) {
    const task = this.tasks.find((task) => task.Id === Id);

    if (task) {
      task.complitionStatus = true;
      this.saveFile();
      console.log(`Task with Id ${Id} has been marked as complete.`);
    } else {
      console.log(`Task with Id ${Id} not found.`);
    }
  }
  //   sort tasks by priority
  sortByPriority() {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return this.tasks.sort(
      (a, b) => priorityOrder[a.Priority] - priorityOrder[b.Priority]
    );
  }
}

// const taskManager = new TaskManager();
// taskManager.addTask(
//   "Task One",
//   "Description for Task One",
//   "High",

//   "2024-12-31"
// );
// taskManager.addTask(
//   "Task Two",
//   "Description for Task Two",
//   "Medium",

//   "2024-11-30"
// );

// console.log(taskManager.viewTasks());
