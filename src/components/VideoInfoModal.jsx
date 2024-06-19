import React from 'react';
import { convertBytesToMB, formatTimestamp } from '../utils/Utils';

function VideoInfoModal({ data, toggleShow, isDarkMode, uri, uri2, downloadFile, setProgress, setIsLoading }) {
    return (
        <div>
            <div className={`fixed inset-0 backdrop-blur-sm overflow-y-auto`}>
                <div className={`lg:fixed lg:top-1/2 lg:left-1/2 transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-auto xs:w-4/6 p-4 rounded-lg shadow-lg z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-bold mb-2 text-center">Informasi Video</h2>
                    <button onClick={toggleShow}>
                        <img src='logo/x2.svg' className='h-8 w-8 p-2 bg-red-600 rounded-md absolute lg:right-4 right-3 top-4' alt='logox' />
                    </button>
                    <div className='lg:flex lg:gap-3'>
                        <div className='flex justify-center'>
                            <img src={data.cover} alt={`Cover for ${data.title}`} className="mb-2 rounded-lg w-50" />
                        </div>
                        <div className={`${isDarkMode ? 'text-gray-50' : 'text-gray-950'} lg:px-0 px-4`}>
                            <p className='flex gap-2'><img src={isDarkMode ? 'logo/user2.svg' : 'logo/user.svg'} alt='logo user' />{data.author.nickname}</p>
                            <p className='flex gap-2'><img src={isDarkMode ? 'logo/edit-32.svg' : 'logo/edit-3.svg'} alt='logo edit' />{data.title}</p>
                            <p className='flex gap-2'><img src={isDarkMode ? 'logo/calendar2.svg' : 'logo/calendar.svg'} alt='logo pembuatan' />{formatTimestamp(data.create_time)}</p>
                            <p className='flex gap-2'><img src={isDarkMode ? 'logo/eye2.svg' : 'logo/eye.svg'} alt='logo eye' />{data.play_count.toLocaleString()}</p>
                            <p className='flex gap-2'><img src={isDarkMode ? 'logo/thumbs-up2.svg' : 'logo/thumbs-up.svg'} alt='logo like' />{data.digg_count.toLocaleString()}</p>
                            <p className='flex gap-2'><img src={isDarkMode ? 'logo/message-circle2.svg' : 'logo/message-circle.svg'} alt='logo msg' />{data.comment_count.toLocaleString()}</p>
                            <p className='flex gap-2'><img src={isDarkMode ? 'logo/clock2.svg' : 'logo/clock.svg'} alt='logo durasi' />{data.duration}</p>
                            <button
                                className="flex w-full gap-1 justify-center mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => downloadFile(uri, data.title + '.mp4', setProgress, setIsLoading)}
                            >
                                <img src='logo/download2.svg' className='w-6 h-6' alt='logo download 2' />
                                <p>NO WM ({convertBytesToMB(data.size)})</p>
                            </button>
                            <br />
                            <button
                                className="flex gap-1 justify-center mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => downloadFile(uri2, data.title + '.mp4', setProgress, setIsLoading)}
                            >
                                <img src='logo/download2.svg' className='w-6 h-6' alt='logo download 3' />
                                <p>WM ({convertBytesToMB(data.wm_size)})</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoInfoModal;
