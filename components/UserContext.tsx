// UserContextProvider.tsx
import React, { useState, createContext, ReactNode } from 'react';

type UserContextType = {
    currentUser: string | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
