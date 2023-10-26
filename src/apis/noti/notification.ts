import { authInstance } from "../utils";

const NOTIFICATION_PATH = "/notification-service/notifications";

export const getRecentNotifications = async () => {
  const { data } = await authInstance.get(NOTIFICATION_PATH);

  return data;
};

export const getAllNotifications = async () => {
  const { data } = await authInstance.get(`${NOTIFICATION_PATH}/all`);

  return data;
};

export const getUnreadNotificationsCount = async () => {
  const { data } = await authInstance.get(`${NOTIFICATION_PATH}/count`);

  return data;
};

export const deleteAllNotifications = async () => {
  const { data } = await authInstance.delete(NOTIFICATION_PATH);

  return data;
};

export const deleteNotification = async (notificationId: string) => {
  const { data } = await authInstance.delete(
    `${NOTIFICATION_PATH}/${notificationId}`
  );

  return data;
};

export const readAllNotifications = async () => {
  const { data } = await authInstance.put(NOTIFICATION_PATH);

  return data;
};

export const readNotification = async (notificationId: string) => {
  const { data } = await authInstance.put(`
        ${NOTIFICATION_PATH}/${notificationId}
    `);

  return data;
};
