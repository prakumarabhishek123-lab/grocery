import React, { useState } from 'react';
import styles from './AuthModal.module.css';
import { Mail, Lock, User as UserIcon } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Load existing users from local storage to act as our "database"
    const storedUsers = JSON.parse(localStorage.getItem('store_users') || '[]');

    if (isLogin) {
      // Login logic
      const user = storedUsers.find(u => u.email === email && u.password === password);
      if (user) {
        onSuccess();
      } else {
        setError('Invalid email or password. Please try again or create an account.');
      }
    } else {
      // Registration logic
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      
      const userExists = storedUsers.some(u => u.email === email);
      if (userExists) {
        setError('An account with this email already exists.');
        return;
      }

      // Create and save new user
      const newUser = { name, email, password };
      storedUsers.push(newUser);
      localStorage.setItem('store_users', JSON.stringify(storedUsers));
      
      // Auto-switch to login mode and show success message
      setSuccess('Account created successfully! Please log in.');
      setIsLogin(true);
      setPassword('');
      setConfirmPassword('');
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

        <div className={styles.header}>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to your account to continue' : 'Sign up to get started'}</p>
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
