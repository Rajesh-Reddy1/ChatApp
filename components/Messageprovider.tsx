'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextValue {
    currentUser: string;
    setcurrentUser: (currentUser: string) => void;
    messages: string[];
    setMessages: (messages: string[]) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);

    return (
        <AppContext.Provider value={{ currentUser, setcurrentUser: setCurrentUser, messages, setMessages }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextValue => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }

    return context;
};
