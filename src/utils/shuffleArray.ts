export function shuffleArray(array: string[]): string[] {
    const shuffledArray = [...array]; // Create a copy of the array to avoid mutating the original

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1)); // Pick a random index
        // Swap the current element with the randomly chosen one
        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }

    return shuffledArray;
}
