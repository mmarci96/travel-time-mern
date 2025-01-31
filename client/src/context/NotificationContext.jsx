import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notificationCounter, setNotificationCounter] = useState(0);

    const updateNotificationCounter = (count) => {
        setNotificationCounter(count);
    };

    return (
        <NotificationContext.Provider
            value={{ notificationCounter, updateNotificationCounter }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
