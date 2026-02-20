import React, { useState, createContext, useContext } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts([...toasts, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                zIndex: 1000
            }}>
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="glass-card"
                        style={{
                            padding: '1rem 1.5rem',
                            minWidth: '250px',
                            borderLeft: `4px solid ${toast.type === 'success' ? 'var(--success)' : 'var(--error)'}`,
                            animation: 'slideIn 0.3s ease-out forwards'
                        }}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
