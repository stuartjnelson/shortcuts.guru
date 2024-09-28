import shortcuts from "../../data/vscode.json"; // JSON import for shortcut data

export const generateRandomQuestions = () => {
    return Array.from({ length: 2 }, () => {
        const randomIndex = Math.floor(Math.random() * shortcuts.length);
        return shortcuts[randomIndex];
    });
};

export const getKeyString = (e: KeyboardEvent): string => {
    const specialKeys: { [key: string]: string } = {
        Control: "Ctrl",
        Meta: "Cmd",
    };
    return specialKeys[e.key] ?? e.key.toUpperCase();
};
