import { AppProvider } from "@/components/Messageprovider";
import { ReactNode } from "react";

interface ProviderProps {
    children: ReactNode;
}

export function Provider({ children }: ProviderProps) {

    return (
        <AppProvider>
            {children}
        </AppProvider>
    )
}
