import AuthProvider from "./authProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
 
export default Providers;