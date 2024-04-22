export function formatDate(date) {
    const newData = new Date(date.split('T')[0]);
    const options = {
        year: 'numeric',
        day: '2-digit',
        month: 'short'
    };
    return newData.toLocaleDateString(undefined, options);
}