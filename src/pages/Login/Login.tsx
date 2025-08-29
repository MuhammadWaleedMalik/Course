import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Login.scss';
import { useAuth } from '../../contexts/AuthContext';
import { websiteInfo } from '../../data/website/info';
import Btn1 from '../../components/Buttons/BTN1/Btn1';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      email.trim() !== '' &&
      password.trim() !== '' &&
      password.length >= 6;
    setIsFormValid(isValid);
  }, [email, password]);

  const handleSubmit = async () => {
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Failed to log in');
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="login-form-wrapper"
      >
        <div className="login-header">
          <img
            className="login-logo"
            src={websiteInfo.logo}
            alt={websiteInfo.name}
          />
          <h2 className="login-title">Sign in to your account</h2>
          <p className="login-subtitle">
            Or{' '}
            <Link to="/signup" className="login-signup-link">
              create a new account
            </Link>
          </p>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}

          <Btn1
            defaultText={isLoading ? 'Signing in...' : 'Sign in'}
            successText="Signed In"
            primaryColor="var(--accent)"
            primaryDark="var(--primary-color-1)"
            primaryDarkest="var(--primary-color-3)"
            successColor="var(--secondary-color-2)"
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
          />
        </form>
      </motion.div>
    </div>
  );
};

export default Login;