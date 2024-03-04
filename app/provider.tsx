import { AppProvider } from "@/components/Messageprovider";


export function Provider({children}){

    return (
        <AppProvider>
            {children}
        </AppProvider>
    )
}