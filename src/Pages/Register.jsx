import React, { useState, useContext } from 'react'
import { registerUser, loginUser } from '../api/authService'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './Login.css' // Reusing the same premium glassmorphism styles
import loginIllustration from '../assets/login_illustration.png'

export default function Register() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('USER')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            await registerUser(username, email, password, role);
            
            // Auto-login upon successful signup
            try {
                const loginRes = await loginUser(email, password);
                if (loginRes && loginRes.token) {
                    login(loginRes.token);
                }
            } catch (autoLoginErr) {
                console.error("Auto-login during signup failed:", autoLoginErr);
            }

            setSuccess(true);
            alert("Registration successful! Redirecting to overview...");
            setTimeout(() => {
                navigate('/overview');
            }, 1500);
        } catch (err) {
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
                        <h2 className="form-title">Create Account</h2>
                        <p className="form-subtitle">Enter your details to register</p>
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

                    {success && (
                        <div className="login-error-banner" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)', color: '#a7f3d0' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span>Registration successful! Redirecting...</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-input"
                                    placeholder="your_username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

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

                        <div className="form-group">
                            <label className="form-label">Role</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </span>
                                <select 
                                    className="form-input form-select"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                                <span className="select-chevron-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </span>
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
                                    <span>Registering...</span>
                                </>
                            ) : (
                                <span>Sign Up</span>
                            )}
                        </button>
                    </form>

                    <div className="register-container">
                        <button type="button" className="register-link-btn" onClick={() => navigate('/login')}>
                            Already have an account? Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
