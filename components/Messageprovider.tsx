import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
interface AppContextValue {
    currentUser: string;
    setcurrentUser: (currentUser: string) => void;
    messages: string[];
    setMessages: (messages: string[]) => void;
    children: React.ReactNode; // Add the 'children' property
}

const AppContext = createContext<AppContextValue | undefined>(undefined);


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(
        () => {
            
        }
    )


    return children as React.ReactElement | null; 

};


export const useApp = (): AppContextValue => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }

    return context;
};