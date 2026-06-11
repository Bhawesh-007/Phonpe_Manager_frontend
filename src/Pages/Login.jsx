import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { loginUser } from '../api/authService'
import './Login.css'
import loginIllustration from '../assets/login_illustration.png'

export default function Login() {
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)
    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')
    const [error , setError] = useState(null)
    const [loading , setLoading]  = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the page from reloading
        setError('');
        setLoading(true);

        try {
            // Send credentials to Spring Boot
            const data = await loginUser(email, password);
            
            // Save the JWT token to our Context and LocalStorage
            login(data.token);
            
            alert("Login Successful! Check your browser console.");
            console.log("Your JWT is:", data.token);

        } catch (err) {
            // Display any errors from Spring Boot (like wrong password)
            setError(err.message); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            {/* Background glowing blobs */}
            <div className="login-bg-blob blob-1"></div>
            <div className="login-bg-blob blob-2"></div>
            
            <div className="login-card">
                {/* Left side brand panel */}
                <div className="login-brand-panel">
                    <div className="brand-header">
                        <div className="brand-logo-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <span className="brand-name">ExpenseFlow</span>
                    </div>
                    
                    <div className="brand-illustration-container">
                        <img 
                            src={loginIllustration} 
                            alt="Expense Flow Illustration" 
                            className="brand-illustration"
                        />
                    </div>
                    
                    <div className="brand-footer">
                        <h3 className="brand-title">Smart Wealth Management</h3>
                        <p className="brand-subtitle">
                            Take control of your expenses, monitor trends in real-time, and streamline your team's financial workflows.
                        </p>
                    </div>
                </div>

                {/* Right side form panel */}
                <div className="login-form-panel">
                    <div className="form-header">
                        <h2 className="form-title">Welcome Back</h2>
                        <p className="form-subtitle">Enter your credentials to access your dashboard</p>
                    </div>

                    {error && (
                        <div className="login-error-banner">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </span>
                                <input 
                                    type="email" 
                                    className="form-input"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </span>
                                <input 
                                    type="password" 
                                    className="form-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="login-submit-btn"
                        >
                            {loading ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Authenticating...</span>
                                </>
                            ) : (
                                <span>Sign In</span>
                            )}
                        </button>
                    </form>
                    <div className="register-container">
                        <button type="button" className="register-link-btn" onClick={() => navigate('/register')}>
                            First time? Register here
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



