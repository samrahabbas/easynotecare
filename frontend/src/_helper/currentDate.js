export const CurrentDate = () => {
    return new Date().toISOString().slice(0, 10)
}