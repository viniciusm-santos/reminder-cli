import NotificationStrategy from "../interface/NotificationStrategy";

class BrowserNotificationStrategy extends NotificationStrategy {
  notify() {
    console.log("sending browser notification");
  }
}

export default BrowserNotificationStrategy;
