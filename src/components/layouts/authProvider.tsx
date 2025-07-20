'use client';

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "@/lib/firebase";

import { useState, createContext, useContext, useEffect } from "react";

interface AuthContextType {
    user: User | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
})

export const useAuthData = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => setUser(user));
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}
 
export default AuthProvider;