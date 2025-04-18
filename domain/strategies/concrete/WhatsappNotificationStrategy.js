import NotificationStrategy from "../interface/NotificationStrategy.js";

class WhatsappNotificationStrategy extends NotificationStrategy {
  notify() {
    console.log("sending WhatsApp notification");
  }
}

export default WhatsappNotificationStrategy;
