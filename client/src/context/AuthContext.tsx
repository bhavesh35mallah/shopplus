import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
    type LoginData,
    type RegisterData,
    type User,
} from "../api/authApi";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;

    register: (data: RegisterData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>;
    setDemoRole: (role: "customer" | "admin" | "vendor") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
    children,
}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await getCurrentUser();

                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const register = async (data: RegisterData) => {
        const response = await registerUser(data);

        setUser(response.user);
    };

    const login = async (data: LoginData) => {
        const response = await loginUser(data);

        setUser(response.user);
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch {
            // ignore network/auth errors on logout
        }
        setUser(null);
    };

    const setDemoRole = (role: "customer" | "admin" | "vendor") => {
        if (user) {
            setUser({ ...user, role });
        } else {
            setUser({
                id: "demo-user-101",
                firstName: role === "admin" ? "Super" : role === "vendor" ? "Apex" : "Alex",
                lastName: role === "admin" ? "Admin" : role === "vendor" ? "Merchant" : "Morgan",
                email: `${role}@shoppulse.com`,
                phone: "+1 (555) 492-9102",
                role: role,
            });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                register,
                login,
                logout,
                setDemoRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};