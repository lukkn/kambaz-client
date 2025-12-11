export function calculateTimeDifference(dateString: string) {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - postDate.getTime();

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    if (diffInMinutes < 60) {
        const minutes = Math.max(diffInMinutes, 0);
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
};