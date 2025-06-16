export function formatInput(userInput: string): string {
    return encodeURIComponent(userInput.trim().toLowerCase());
};
