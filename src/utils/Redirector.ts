export function redirect(url: string): void {
    document.location.href = url;
}

export function goBack(): void {
    window.history.back();
}