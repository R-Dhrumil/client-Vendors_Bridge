import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const [form, setForm] = useState({ email: '', password: '', deviceName: 'Web' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const autofill = (email, password) => {
    setForm({ email, password, deviceName: 'Web' });
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.payload?.errors && Array.isArray(err.payload.errors)) {
        setError(err.payload.errors.map((e) => e.message).join(', '));
      } else {
        setError(err.message || 'Unable to sign in');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ position: 'relative' }}>
        {/* Testing Info Click Button */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '16px', 
            right: '16px', 
            zIndex: 100
          }}
        >
          <div 
            onClick={() => setShowTooltip(!showTooltip)}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#0066cc',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              fontStyle: 'italic',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              userSelect: 'none'
            }}
          >
            i
          </div>

          {showTooltip && (
            <div style={{
              position: 'absolute',
              top: '30px',
              right: '0',
              width: '280px',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
              fontSize: '0.8rem',
              lineHeight: '1.4',
              zIndex: 9999
            }}>
              <div style={{ 
                fontWeight: 'bold', 
                marginBottom: '10px', 
                borderBottom: '1px solid #475569', 
                paddingBottom: '6px', 
                color: '#38bdf8',
                fontSize: '0.85rem'
              }}>
                Testing Credentials (Click to autofill)
              </div>
              
              {/* Admin Credential */}
              <div 
                onClick={() => {
                  autofill('kunj@gmail.com', '123456789');
                  setShowTooltip(false);
                }}
                style={{ 
                  marginBottom: '8px', 
                  cursor: 'pointer', 
                  padding: '8px', 
                  borderRadius: '4px', 
                  backgroundColor: '#334155',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#475569'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#334155'}
              >
                <div style={{ fontWeight: '600', color: '#7dd3fc' }}>Admin</div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Email: kunj@gmail.com</div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Pass: 123456789</div>
              </div>

              {/* Procurement Officer Credential */}
              <div 
                onClick={() => {
                  autofill('procuretator@gmail.com', 'Test@123');
                  setShowTooltip(false);
                }}
                style={{ 
                  marginBottom: '8px', 
                  cursor: 'pointer', 
                  padding: '8px', 
                  borderRadius: '4px', 
                  backgroundColor: '#334155',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#475569'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#334155'}
              >
                <div style={{ fontWeight: '600', color: '#7dd3fc' }}>Procurement Officer</div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Email: procuretator@gmail.com</div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Pass: Test@123</div>
              </div>

              {/* Vendor Credential */}
              <div 
                onClick={() => {
                  autofill('vendor@gmail.com', 'Test@123');
                  setShowTooltip(false);
                }}
                style={{ 
                  cursor: 'pointer', 
                  padding: '8px', 
                  borderRadius: '4px', 
                  backgroundColor: '#334155',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#475569'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#334155'}
              >
                <div style={{ fontWeight: '600', color: '#7dd3fc' }}>Vendor</div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Email: vendor@gmail.com</div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Pass: Test@123</div>
              </div>
            </div>
          )}
        </div>

        <div className="auth-header">
          <div className="auth-logo">VB</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to access VendorBridge ERP</p>
        </div>

        {error && (
          <div className="erp-alert erp-alert--danger" style={{ marginBottom: '16px' }}>
            <AlertCircle size={15} /> {error}
          </div>
        )}

        <form onSubmit={submit} className="auth-form">
          <div className="erp-form-group">
            <label className="erp-label" htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              className="erp-input"
              placeholder="name@company.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="erp-form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="erp-label" htmlFor="login-password">Password</label>
              <Link to="/forgot-password" className="auth-link" style={{ fontSize: '0.82rem' }}>
                Forgot password?
              </Link>
            </div>
            <input
              id="login-password"
              type="password"
              className="erp-input"
              placeholder="••••••••"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="erp-btn erp-btn--primary" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;