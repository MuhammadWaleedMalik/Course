import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import './Signup.scss';
import { useAuth } from '../../contexts/AuthContext';
import { websiteInfo } from '../../data/website/info';
import Btn1 from '../../components/Buttons/BTN1/Btn1';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      name.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword &&
      password.length >= 6;
    setIsFormValid(isValid);
  }, [name, email, password, confirmPassword]);

  const handleSubmit = async () => {
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const success = await signup(name, email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Failed to create account');
    }
  };

  return (
    <div className="signup-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="signup-form-wrapper"
      >
        <div className="signup-header">
          <img
            className="signup-logo"
            src={websiteInfo.logo}
            alt={websiteInfo.name}
          />
          <h2 className="signup-title">Create your account</h2>
          <p className="signup-subtitle">
            Or{' '}
            <Link to="/login" className="signup-login-link">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full name
            </label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="input-field"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

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
                autoComplete="new-password"
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

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="input-field"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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
            defaultText={isLoading ? 'Creating account...' : 'Create account'}
            successText="Account Created"
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

export default Signup;