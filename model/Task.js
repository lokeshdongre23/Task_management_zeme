class Task {
  constructor(Id, Title, Description, Priority, DueDate) {
    this.Id = Id;
    this.Title = Title;
    this.Description = Description;
    this.Priority = Priority;
    this.DueDate = DueDate;
    this.complitionStatus = false;
    this.cretedAt = new Date().toDateString();
  }
}

export { Task };
