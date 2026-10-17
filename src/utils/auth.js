const AUTH_KEY = "AdminFlow";

export const setAuth = (user) => {
    const authData = {
        name: user.name ?? "",
        email: user.email ?? "",
        profilePicture: user.profilePicture ?? "",
        role: user.role ?? "user",
        isAuthenticated: user.isAuthenticated ?? true,
        isActive: user.isActive ?? true,
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
};

export const getAuth = () => {
    try {
        const data = localStorage.getItem(AUTH_KEY);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
};

export const removeAuth = () => {
    localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
    return getAuth()?.isAuthenticated === true;
};