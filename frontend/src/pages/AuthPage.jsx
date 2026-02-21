import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ type }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (type === 'signup') {
                await signup(name, email, password);
            } else {
                await login(email, password);
            }
            navigate('/');
        } catch (err) {
            const errorMsg = err.response?.data?.detail || err.response?.data?.message || err.message || 'Network Error';
            setError(`${errorMsg} (Check: ${import.meta.env.VITE_API_BASE_URL || 'https://godisgood-backend.onrender.com/api'})`);
            console.error('Auth Error:', err);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 150px)' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    {type === 'signup' ? 'Create Account' : 'Welcome Back'}
                </h2>

                {error && <p className="error-msg">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {type === 'signup' && (
                        <input
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        {type === 'signup' ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <Link to={type === 'signup' ? '/login' : '/signup'}>
                        {type === 'signup' ? 'Login' : 'Sign Up'}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
