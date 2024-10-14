export const sanitize = <T,>(input: T): T => JSON.parse(JSON.stringify(input));
