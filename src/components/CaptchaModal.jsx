import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

const CaptchaModal = ({ onClose, onCaptchaSuccess }) => {
    const [captchaCode, setCaptchaCode] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const canvasRef = useRef(null);

    const generateCaptcha = () => {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars[Math.floor(Math.random() * chars.length)];
        }
        setCaptchaCode(captcha);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '24px Arial';
        ctx.fillText(captchaCode, 10, 30);
    }, [captchaCode]);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
        setIsInputEmpty(e.target.value === '');
    };

    const handleRefreshCaptcha = () => {
        generateCaptcha();
        setUserInput('');
        setIsInputEmpty(true);
    };

    const handleCaptchaValidation = () => {
        if (userInput === captchaCode) {
            onCaptchaSuccess();
            onClose();
        } else {
            Swal.fire('Captcha Salah', 'Silakan coba lagi.', 'error');
            generateCaptcha();
            setUserInput('');
            setIsInputEmpty(true);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Captcha Verification</h2>
                <div className="flex items-center mb-4">
                    <canvas ref={canvasRef} width="150" height="50" className="border mr-4" />
                    <button
                        onClick={handleRefreshCaptcha}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded"
                    >
                        <img src='logo/refresh-cw.svg' alt='logo refresh' className='h-6 w-6' />
                    </button>
                </div>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="Enter Captcha"
                    required
                />
                <button
                    onClick={handleCaptchaValidation}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded ${isInputEmpty ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={isInputEmpty}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CaptchaModal;
