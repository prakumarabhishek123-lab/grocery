import React, { useState } from 'react';
import styles from './AuthModal.module.css';
import { Mail, Lock, User as UserIcon, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AuthModal = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Feedback messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, signup, setAuthModalOpen } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLogin) {
      // Login logic
      try {
        await login(email, password);
        if (onSuccess) onSuccess();
        setAuthModalOpen(false);
      } catch (err) {
        setError(err);
      }
    } else {
      // Registration logic
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      
      try {
        await signup(name, email, password);
        // Auto-switch to login mode and show success message
        setSuccess('Account created successfully! Please log in.');
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        setError(err);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={styles.gatewayWrapper}>
      <div className={styles.modalContent}>

        <div className={styles.header} style={{ position: 'relative' }}>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to your account to continue' : 'Sign up to get started'}</p>
          <button 
            type="button" 
            onClick={() => setAuthModalOpen(false)} 
            style={{ position: 'absolute', top: 0, right: 0, background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'inherit' }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {error && <div className={styles.errorMsg}>{error}</div>}
        {success && <div className={styles.successMsg}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <div className={styles.iconWrapper}>
                <UserIcon size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
              <Lock size={18} />
            </div>
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <div className={styles.iconWrapper}>
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                placeholder="Confirm Password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          {isLogin && (
            <div className={styles.forgotPassword}>
              <a href="#reset">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={toggleMode}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
