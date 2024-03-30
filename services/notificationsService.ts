import http from "./httpCommon";

const notificationsPath = "/Notification";

class NotificationsService {
  getNotificationsById = (id: string) => {
    return http.get(`${notificationsPath}/${id}`);
  };

  getNotificationsByUserId = (id: string) => {
    return http.get(`${notificationsPath}/user/${id}`);
  };

  getUnreadNotificationsByUserId = (id: string) => {
    return http.get(`${notificationsPath}/user/${id}/unread`);
  };

  getReadNotificationsByUserId = (id: string) => {
    return http.get(`${notificationsPath}/user/${id}/read`);
  };

  createNotifications = (data: any) => {
    return http.post(`${notificationsPath}`, data);
  };

  updateNotifications = (id: string, data: any) => {
    return http.put(`${notificationsPath}/${id}`, data);
  };
}

export default new NotificationsService();
