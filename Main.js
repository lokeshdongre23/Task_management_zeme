import readline from "readline";
import { TaskManager } from "./Services/TaskMAnager.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const taskManager = new TaskManager();

function showMenu() {
  console.log(`
===== TASK MANAGER CLI =====
1. Add Task
2. View Tasks
3. Edit Task
4. Delete Task
5. Mark Task as Complete
6. Exit
`);
}

function promptMenu() {
  showMenu();
  rl.question("Choose an option: ", (choice) => {
    switch (choice) {
      case "1":
        addTaskCLI();
        break;
      case "2":
        const tasks = taskManager.viewTasks();
        // console.table(tasks);
        viewTasksCLI();
        // console.table(tasks);
        // promptMenu();
        break;
      case "3":
        editTaskCLI();
        break;
      case "4":
        deleteTaskCLI();
        break;
      case "5":
        markCompleteCLI();
        break;
      case "6":
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid option. Try again.");
        promptMenu();
    }
  });
}

// ===== CLI FUNCTIONS =====

function addTaskCLI() {
  rl.question("Title: ", (title) => {
    rl.question("Description: ", (description) => {
      rl.question("Priority (Low/Medium/High): ", (priority) => {
        rl.question("Due Date (YYYY-MM-DD): ", (dueDate) => {
          taskManager.addTask(title, description, priority, dueDate);
          console.log("Task added successfully!");
          promptMenu();
        });
      });
    });
  });
}

function viewTasksCLI() {
  const tasks = taskManager.viewTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
  } else {
    console.table(tasks);
  }
  promptMenu();
}
// implement iff condition
function editTaskCLI() {
  rl.question("Enter Task Id to edit: ", (id) => {
    rl.question("New Title (leave blank to skip): ", (title) => {
      rl.question("New Description (leave blank to skip): ", (description) => {
        rl.question("New Priority (leave blank to skip): ", (priority) => {
          rl.question("New Due Date (leave blank to skip): ", (dueDate) => {
            const updatedFields = {};
            if (title) updatedFields.Title = title;
            if (description) updatedFields.Description = description;
            if (priority) updatedFields.Priority = priority;
            if (dueDate) updatedFields.DueDate = dueDate;

            taskManager.editTask(Number(id), updatedFields);
            promptMenu();
          });
        });
      });
    });
  });
}

function deleteTaskCLI() {
  rl.question("Enter Task Id to delete: ", (id) => {
    taskManager.deleteTask(Number(id));
    promptMenu();
  });
}

function markCompleteCLI() {
  rl.question("Enter Task Id to mark complete: ", (id) => {
    taskManager.markComplete(Number(id));
    promptMenu();
  });
}
// function updatetest(obj) {
//   if (obj.id) {
//     DataTransfer.id = id;
//   }
//   if (obj.name) {
//     DataTransfer.name = name;
//   }
// }
// updatetest({ id: 1 });

promptMenu();
