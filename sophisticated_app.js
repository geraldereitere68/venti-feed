/**
 * Filename: sophisticated_app.js
 * 
 * Description:
 * This code demonstrates a sophisticated, elaborate, and complex JavaScript application.
 * It is a task management tool that allows users to create, update, prioritize, and delete tasks.
 * The application uses a custom implementation of a binary heap data structure for task prioritization.
 * It also includes validation and error handling to ensure proper task inputs.
 *
 * Author: Your Name
 * Date: Today's Date
 */

// Task class represents an individual task
class Task {
  constructor(id, title, priority) {
    this.id = id;
    this.title = title;
    this.priority = priority;
  }
}

// TaskManager class manages the tasks
class TaskManager {
  constructor() {
    this.tasks = [];
    this.taskId = 0;
  }

  // Add a new task
  addTask(title, priority) {
    const task = new Task(this.taskId++, title, priority);
    this.tasks.push(task);
  }

  // Update a task by id
  updateTask(taskId, title, priority) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.title = title;
      task.priority = priority;
    } else {
      throw new Error("Task not found");
    }
  }

  // Delete a task by id
  deleteTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index >= 0) {
      this.tasks.splice(index, 1);
    } else {
      throw new Error("Task not found");
    }
  }

  // Get all tasks
  getAllTasks() {
    return this.tasks;
  }

  // Get sorted tasks by priority using binary heap
  getSortedTasks() {
    const heap = new BinaryHeap((task) => task.priority);
    for (const task of this.tasks) {
      heap.insert(task);
    }
    const sortedTasks = [];
    while (!heap.isEmpty()) {
      sortedTasks.push(heap.deleteMinimum());
    }
    return sortedTasks;
  }
}

// BinaryHeap class represents a binary heap data structure
class BinaryHeap {
  constructor(scoreFn) {
    this.content = [];
    this.scoreFn = scoreFn;
  }

  // Insert an element into the heap
  insert(element) {
    this.content.push(element);
    this.bubbleUp(this.content.length - 1);
  }

  // Remove and return the minimum element from the heap
  deleteMinimum() {
    const result = this.content[0];
    const end = this.content.pop();
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  }

  // Check if the heap is empty
  isEmpty() {
    return this.content.length === 0;
  }
  
  // Restore heap property by moving the element up
  bubbleUp(index) {
    const element = this.content[index];
    const score = this.scoreFn(element);
    while (index > 0) {
      const parentIndex = Math.floor((index + 1) / 2) - 1;
      const parent = this.content[parentIndex];
      if (score >= this.scoreFn(parent)) {
        break;
      }
      this.content[parentIndex] = element;
      this.content[index] = parent;
      index = parentIndex;
    }
  }

  // Restore heap property by moving the element down
  sinkDown(index) {
    const element = this.content[index];
    const elementScore = this.scoreFn(element);
    while (true) {
      const leftChildIndex = 2 * (index + 1) - 1;
      const rightChildIndex = 2 * (index + 1);
      let swapIndex = null;
      if (leftChildIndex < this.content.length) {
        const leftChild = this.content[leftChildIndex];
        const leftChildScore = this.scoreFn(leftChild);
        if (leftChildScore < elementScore) {
          swapIndex = leftChildIndex;
        }
      }
      if (rightChildIndex < this.content.length) {
        const rightChild = this.content[rightChildIndex];
        const rightChildScore = this.scoreFn(rightChild);
        if (
          (swapIndex === null && rightChildScore < elementScore) ||
          (swapIndex !== null && rightChildScore < this.scoreFn(this.content[swapIndex]))
        ) {
          swapIndex = rightChildIndex;
        }
      }
      if (swapIndex === null) {
        break;
      }
      this.content[index] = this.content[swapIndex];
      this.content[swapIndex] = element;
      index = swapIndex;
    }
  }
}

// Example usage
const taskManager = new TaskManager();
taskManager.addTask("Task 1", 5);
taskManager.addTask("Task 2", 2);
taskManager.addTask("Task 3", 8);
taskManager.updateTask(1, "Updated Task 2", 6);
taskManager.deleteTask(3);

console.log(taskManager.getAllTasks());
console.log(taskManager.getSortedTasks());
