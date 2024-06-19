import React from 'react';

function AlertModal({ show, onClose, message, darkmode }) {
    if (!show) {
        return null;
    }

    return (
        <div className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center`}>
            <div className={`${darkmode ? 'bg-gray-700 text-gray-50' : 'bg-gray-100 text-gray-900'} p-6 rounded-lg shadow-lg max-w-sm w-full`}>
                <div className="mb-4">
                    <h2 className="text-xl font-bold">Alert</h2>
                    <p>{message}</p>
                </div>
                <div className="text-right">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlertModal;
