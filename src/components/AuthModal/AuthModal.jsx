import React, { useState } from 'react';
import styles from './AuthModal.module.css';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login/register logic
    alert(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className={styles.header}>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to your account to continue' : 'Sign up to get started'}</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <div className={styles.iconWrapper}>
                <UserIcon size={18} />
              </div>
              <input type="text" placeholder="Full Name" required />
            </div>
          )}

          <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
              <Mail size={18} />
            </div>
            <input type="email" placeholder="Email Address" required />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
              <Lock size={18} />
            </div>
            <input type="password" placeholder="Password" required />
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <div className={styles.iconWrapper}>
                <Lock size={18} />
              </div>
              <input type="password" placeholder="Confirm Password" required />
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
              onClick={() => setIsLogin(!isLogin)}
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
