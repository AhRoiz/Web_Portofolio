import React, { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

const UnavailablePopup = ({ isOpen, onClose, message = "Oops, fitur belum ada." }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 animate-fade-in pointer-events-none">
            <div
                className="relative bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-6 shadow-2xl backdrop-blur-xl pointer-events-auto max-w-sm animate-bounce-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1.5 bg-white/10 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all"
                >
                    <X size={16} />
                </button>

                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
                        <AlertCircle size={28} className="text-yellow-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg mb-1">Mohon Maaf!</h3>
                        <p className="text-gray-300 text-sm">{message}</p>
                    </div>
                </div>

                <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 animate-shrink-width"></div>
                </div>
            </div>
        </div>
    );
};

export default UnavailablePopup;
