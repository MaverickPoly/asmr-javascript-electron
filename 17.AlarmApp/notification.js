import {Notification} from "electron";

export const showNotification = (title, content) => {
    const notification = new Notification({title, body: content});
    notification.show();
}
