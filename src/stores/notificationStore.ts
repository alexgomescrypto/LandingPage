import { create } from 'zustand';

interface NotificationSettings {
  soundEnabled: boolean;
  browserNotificationsEnabled: boolean;
}

interface NotificationState {
  settings: NotificationSettings;
  updateSettings: (settings: NotificationSettings) => void;
}

export const useNotificationStore = create<NotificationState>((set) => {
  // Load settings from localStorage
  const storedSettings = localStorage.getItem('notificationSettings');
  const initialSettings: NotificationSettings = storedSettings
    ? JSON.parse(storedSettings)
    : {
        soundEnabled: true,
        browserNotificationsEnabled: true,
      };
  
  return {
    settings: initialSettings,
    
    updateSettings: (newSettings) => {
      localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
      set({ settings: newSettings });
    },
  };
});
