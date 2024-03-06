export const formatAndDivideNumber = (num: number): string => {
    if (num >= 1000000) {
        const formattedNum = (num / 1000000).toFixed(1);
        return `${formattedNum}M`;
    } else if (num >= 1000) {
        const formattedNum = (num / 1000).toFixed(1);
        return `${formattedNum}K`;
    } else {
        return num.toString();
    }
};