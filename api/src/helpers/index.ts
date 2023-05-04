export function isISOString(dateString: string) {
    const dateObj = new Date(dateString)

    return dateObj.toISOString() === dateString
}

export function normalizeTag(str: string) {
    const normalizedTag = str[0].toUpperCase() + str.slice(1).toLowerCase()

    return normalizedTag
}
