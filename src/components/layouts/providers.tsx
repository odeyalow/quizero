'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import AuthProvider from "./authProvider";

import { store } from "@/store/store";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * (60 * 1000),
        }
    }
});

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Provider store={store}>
                    {children}
                </Provider>
            </AuthProvider>
        </QueryClientProvider>
    );
}
 
export default Providers;