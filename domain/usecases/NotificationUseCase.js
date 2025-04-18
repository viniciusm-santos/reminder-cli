class NotificationUseCase {
  constructor(strategy) {
    this.strategy = strategy;
  }

  execute() {
    return this.strategy.notify();
  }
}

export default NotificationUseCase;
