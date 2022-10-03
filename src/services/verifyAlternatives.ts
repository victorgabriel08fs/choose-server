export function verifyAlternatives({ a1, a2 }: { a1: string, a2: string }) {
    if (a1 === a2) {
        return false;
    }
    else {
        return true;
    }
}