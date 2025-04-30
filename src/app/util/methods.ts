export function verificarSession() {
    let token = localStorage.getItem("token");
    return token && token != undefined;
}

export function getToken() {
    return localStorage.getItem("token");
}

export function updateSession(token: string) {
    localStorage.setItem("token", token);
}

export function deleteSession() {
    localStorage.removeItem("token");
}