import axios from 'axios';

export const validateLink = (url) => {
    const validPatterns = [
        /(?:https:?\/{2})?(?:www|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/,
        // /^https?:\/\/(www\.)?instagram\.com\//,
        // /^https?:\/\/(www\.)?twitter\.com\//,
        // /^https?:\/\/(www\.)?threads\.net\//
    ];
    return validPatterns.some((pattern) => pattern.test(url));
};

export const downloadFile = async (url, name, setProgress, setIsLoading) => {
    setIsLoading(true);
    try {
        await axios({
            url: url,
            method: 'GET',
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
                const total = progressEvent.total;
                const current = progressEvent.loaded;
                const percentCompleted = Math.round((current / total) * 100);
                setProgress(percentCompleted);
            },
        }).then((response) => {
            const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = urlBlob;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setIsLoading(false);
            setProgress(0);
        });
    } catch (error) {
        setIsLoading(false);
        throw error;
    }
};
