import React, { useState, useEffect } from 'react';
import AlertModal from './AlertModal.jsx';
import VideoInfoModal from './VideoInfoModal.jsx';
import CaptchaModal from './CaptchaModal.jsx';
import { validateLink, downloadFile } from '../utils/LinkUtils.js';
import axios from 'axios';

function LinkForm() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModal, setModal] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [link, setLink] = useState('');
    const [uri, setUri] = useState('');
    const [uri2, setUri2] = useState('');
    const [data, setData] = useState(null);
    const [progress, setProgress] = useState(0);
    const [showCaptcha, setShowCaptcha] = useState(true);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleShow = () => {
        setModal(!isModal);
        setLink('');
    };

    useEffect(() => {
        const fetchTikTokData = async () => {
            if (!validateLink(link)) {
                return;
            }

            setLoading(true);

            try {
                const response = await axios.get(`https://tk-down-app.vercel.app/api/tiktok`, {
                    params: { url: encodeURIComponent(link) }
                });
                const { code, msg, data } = response.data;

                if (code !== 0) {
                    setMessageError(msg);
                    setShowModal(true);
                } else {
                    setData(data);
                    setUri(data.play);
                    setUri2(data.wmplay);
                    setModal(true);
                }
            } catch (error) {
                console.error('Error fetching TikTok data:', error);
                setMessageError('Failed to fetch TikTok data: ' + error.message);
                setShowModal(true);
            } finally {
                setLoading(false);
            }
        };

        const tiktokRegex = /(?:https:?\/{2})?(?:www|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/;
        if (tiktokRegex.test(link)) {
            fetchTikTokData();
        }
    }, [link]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setMessageError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateLink(link)) {
            setMessageError('Please enter a valid TikTok link.');
            handleShowModal();
        } else {
            setLink(link);
        }
    };

    const handleCaptchaSuccess = () => {
        setShowCaptcha(false);
    };

    return (
        <div className={`flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}>
            <div className="absolute top-4 right-4">
                <button
                    onClick={toggleDarkMode}
                    className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} shadow-md`}
                >
                    {isDarkMode ? (
                        <img src='logo/sun2.svg' alt="Sun Icon" className="w-6 h-6" />
                    ) : (
                        <img src='logo/moon.svg' alt="Moon Icon" className="w-6 h-6" />
                    )}
                </button>
            </div>
            {showCaptcha ? (
                <CaptchaModal onClose={() => setShowCaptcha(false)} onCaptchaSuccess={handleCaptchaSuccess} />
            ) : (
                <div className='flex justify-center items-center h-svh'>
                    <form onSubmit={handleSubmit} className={`lg:w-96 mx-auto mt-10 p-4 shadow-md rounded ${isDarkMode ? 'bg-gray-800 text-gray-50' : 'bg-gray-100 shadow-lg border-2 border-gray-300 text-gray-800'}`}>
                        <AlertModal show={showModal} onClose={handleCloseModal} message={messageError} darkmode={isDarkMode} />
                        <div className='flex justify-center items-center mb-4'>
                            <img src={isDarkMode ? 'icons2/icons8-tiktok-ink-120.png' : 'icons/icons8-tiktok-ink-120.png'} className='h-16 w-16' alt='logo' />
                            <h1 className='font-bold my-3 text-lg'>TIKTOK<br />DOWNLOADER</h1>
                        </div>
                        <div className="mb-4">
                            <input
                                type="url"
                                id="link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${isDarkMode ? 'bg-gray-700 focus:bg-gray-700' : 'bg-gray-200'}`}
                                placeholder="Enter TikTok link here"
                                required
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 rounded focus:outline-none focus:shadow-outline mb-4"
                            >
                                Submit
                            </button>
                        </div>
                        <div className='text-center'>
                            <a className='mt-6 text-gray-500 underline' href='https://instagram.com/abcdefuceek' target='_blank' rel='noopener noreferrer'>@abcdefuceek</a>
                        </div>
                    </form>

                    {isLoading && (
                        <div className={`fixed top-9 right-0 transform -translate-x-1/2 -translate-y-1/2 w-auto px-4 py-2 rounded-md shadow-md z-50 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div className="flex justify-center items-center gap-2">
                                <img src={isDarkMode ? 'logo/download2.svg' : 'logo/download.svg'} alt='logo download' className='w-6 h-6' />
                                <span>Downloading... {progress}%</span>
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className={`text-center fixed inset-0 flex justify-center items-center backdrop-blur-sm`}>
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <p className={`${isDarkMode ? 'text-gray-50' : 'text-gray-900'}`}>Loading...</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {data && data.cover && isModal && (
                <VideoInfoModal data={data} toggleShow={toggleShow} isDarkMode={isDarkMode} uri={uri} uri2={uri2} downloadFile={downloadFile} setProgress={setProgress} setIsLoading={setIsLoading} />
            )}
        </div>
    );
}

export default LinkForm;
