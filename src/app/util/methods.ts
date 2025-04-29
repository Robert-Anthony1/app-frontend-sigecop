export function verificarSession() {
    return localStorage.getItem("token");
}

export function updateSession(token: string) {
    localStorage.setItem("token", token);
}

export function deleteSession(token: string) {
    localStorage.removeItem("token");
}