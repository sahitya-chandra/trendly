const stopwords = new Set([
  'the', 'is', 'at', 'on', 'of', 'and', 'a', 'to', 'in', 'that', 'with', 'as', 'for', 'it'
]);

export const tokenizeText = (text: string): string[] => {
    return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // remove punctua
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopwords.has(word))
}