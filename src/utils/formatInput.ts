export function formatInput(userInput: string): string {
    return userInput.toLowerCase().trim().split(" ").join("+");
};
