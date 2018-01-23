export default class TaskStatus{
  constructor(data) {
    this.data = data;
    this.subscriptions = []
  }

  updateTaskStatus(data) {
    this.data = data
    this.subscriptions.forEach(f => f())
  }

  subscribe(f) {
    this.subscriptions.push(f)
  }
}
