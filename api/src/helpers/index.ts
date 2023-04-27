export function isISOString(dateString: string) {
    const dateObj = new Date(dateString)

    return dateObj.toISOString() === dateString
}
