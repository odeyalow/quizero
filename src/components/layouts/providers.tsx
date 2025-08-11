'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./authProvider";

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
                {children}
            </AuthProvider>
        </QueryClientProvider>
    );
}
 
export default Providers;