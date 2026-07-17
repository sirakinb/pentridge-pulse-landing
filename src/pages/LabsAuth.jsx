import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import MetaTags from '../components/MetaTags';
import { labsInsforge } from '../lib/labsInsforge';
import { useLabsAuth } from '../contexts/LabsAuthContext';

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder-white/30 outline-none focus:border-purple-500/50 transition-colors';

const primaryBtn =
  'w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-3 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2';

const LabsAuth = ({ initialMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, refresh } = useLabsAuth();

  // signin | signup | verify | reset-request | reset-confirm
  const [mode, setMode] = useState(initialMode || 'signup');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const search = location.search || '';
  const workspaceUrl = `/labs/workspace${search}`;

  useEffect(() => {
    setMode(initialMode || 'signup');
    setShowEmailForm(false);
    setError('');
    setNotice('');
  }, [initialMode]);

  useEffect(() => {
    if (!loading && user) {
      navigate(workspaceUrl, { replace: true });
    }
  }, [loading, user, navigate, workspaceUrl]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { data, error: err } = await labsInsforge.auth.signUp({
      email: email.trim(),
      password,
      name: name.trim() || undefined,
    });
    setBusy(false);
    if (err) {
      setError(err.message || 'Sign up failed. Please try again.');
      return;
    }
    if (data?.requireEmailVerification) {
      setMode('verify');
      setNotice(`We sent a 6-digit code to ${email.trim()}.`);
    } else if (data?.accessToken) {
      await refresh();
      navigate(workspaceUrl, { replace: true });
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error: err } = await labsInsforge.auth.verifyEmail({
      email: email.trim(),
      otp: code.trim(),
    });
    setBusy(false);
    if (err) {
      setError(err.statusCode === 400 ? 'Invalid or expired code. Try again or resend.' : err.message || 'Verification failed.');
      return;
    }
    await refresh();
    navigate(workspaceUrl, { replace: true });
  };

  const handleResend = async () => {
    setError('');
    try {
      await labsInsforge.auth.resendVerificationEmail({ email: email.trim() });
      setNotice(`A new code is on its way to ${email.trim()}.`);
    } catch {
      setError('Could not resend the code. Please try again in a moment.');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error: err } = await labsInsforge.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (err) {
      if (err.statusCode === 403) {
        try {
          await labsInsforge.auth.resendVerificationEmail({ email: email.trim() });
        } catch { /* code entry still works if a prior code is valid */ }
        setMode('verify');
        setNotice(`Your email isn't verified yet. We sent a 6-digit code to ${email.trim()}.`);
        return;
      }
      setError(err.message || 'Sign in failed. Check your email and password.');
      return;
    }
    await refresh();
    navigate(workspaceUrl, { replace: true });
  };

  const handleOAuth = async (provider) => {
    setError('');
    try {
      await labsInsforge.auth.signInWithOAuth(provider, {
        redirectTo: `${window.location.origin}/labs/workspace${search}`,
      });
    } catch (err) {
      setError(err?.message || `Could not start ${provider} sign in.`);
    }
  };

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await labsInsforge.auth.sendResetPasswordEmail({ email: email.trim() });
      setMode('reset-confirm');
      setNotice(`We sent a reset code to ${email.trim()}.`);
    } catch (err) {
      setError(err?.message || 'Could not send reset email.');
    }
    setBusy(false);
  };

  const handleResetConfirm = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { data, error: exErr } = await labsInsforge.auth.exchangeResetPasswordToken({
        email: email.trim(),
        code: code.trim(),
      });
      if (exErr) throw exErr;
      const { error: rpErr } = await labsInsforge.auth.resetPassword({
        newPassword,
        otp: data.token,
      });
      if (rpErr) throw rpErr;
      setMode('signin');
      setPassword('');
      setCode('');
      setNotice('Password updated. Sign in with your new password.');
    } catch (err) {
      setError(err?.message || 'Reset failed. Check the code and try again.');
    }
    setBusy(false);
  };

  const titles = {
    signup: ['Create your Pentridge account', 'One account. Every Labs tool.'],
    signin: ['Welcome back', 'Sign in to your Pentridge workspace.'],
    verify: ['Check your email', 'Enter the 6-digit code to verify your account.'],
    'reset-request': ['Reset your password', "We'll email you a reset code."],
    'reset-confirm': ['Enter your reset code', 'Then choose a new password.'],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white min-h-screen"
    >
      <MetaTags
        title={mode === 'signin' ? 'Sign In | Pentridge Labs' : 'Create Account | Pentridge Labs'}
        description="Sign up for Pentridge Labs — one subscription for AlignoPM, AlignoCRM, Voiyce, and DropCard."
        canonicalUrl={`https://www.pentridgemedia.com/labs/${mode === 'signin' ? 'signin' : 'signup'}`}
      />
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden min-h-screen">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-pink-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-md mx-auto px-6">
          <Link
            to="/labs"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8 font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> Pentridge Labs
          </Link>

          <div
            className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8"
            style={{ boxShadow: '0 0 60px rgba(139, 92, 246, 0.1)' }}
          >
            <h1 className="font-display text-2xl md:text-3xl text-[#fafafa] mb-2">{titles[mode][0]}</h1>
            <p className="text-white/40 text-sm mb-8">{titles[mode][1]}</p>

            {notice && (
              <div className="mb-6 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm text-purple-200">
                {notice}
              </div>
            )}
            {error && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {(mode === 'signup' || mode === 'signin') && !showEmailForm && (
              <>
                <div className="space-y-3">
                  <button
                    onClick={() => { setShowEmailForm(true); setError(''); }}
                    className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-3 text-white font-medium transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white flex-shrink-0">
                      <img src="/pentridge-p.png" alt="" className="h-3.5 w-auto" />
                    </span>
                    Continue with Pentridge
                  </button>
                  <button
                    onClick={() => handleOAuth('google')}
                    className="w-full rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] px-6 py-3 text-white/80 font-medium transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    Continue with Google
                  </button>
                </div>

                <p className="mt-8 text-center text-sm text-white/40">
                  {mode === 'signup' ? (
                    <>
                      Already have an account?{' '}
                      <Link to={`/labs/signin${search}`} className="text-purple-400 hover:text-purple-300">
                        Sign in
                      </Link>
                    </>
                  ) : (
                    <>
                      New to Pentridge Labs?{' '}
                      <Link to={`/labs/signup${search}`} className="text-purple-400 hover:text-purple-300">
                        Create an account
                      </Link>
                    </>
                  )}
                </p>
              </>
            )}

            {(mode === 'signup' || mode === 'signin') && showEmailForm && (
              <>
                <button
                  onClick={() => { setShowEmailForm(false); setError(''); }}
                  className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-5 font-mono"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex items-center gap-3 mb-6">
                  <img src="/pentridge-p.png" alt="Pentridge" className="h-6 w-auto" />
                  <p className="text-white font-medium">
                    {mode === 'signup' ? 'Sign up with Pentridge' : 'Sign in with Pentridge'}
                  </p>
                </div>
                <form onSubmit={mode === 'signup' ? handleSignUp : handleSignIn} className="space-y-4">
                  {mode === 'signup' && (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      className={inputClass}
                    />
                  )}
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    autoComplete="email"
                    className={inputClass}
                  />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? 'Password (6+ characters)' : 'Password'}
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    className={inputClass}
                  />
                  <button type="submit" disabled={busy} className={primaryBtn}>
                    {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                    {mode === 'signup' ? 'Create account' : 'Sign in'}
                  </button>
                </form>

                {mode === 'signin' && (
                  <p className="mt-3 text-center text-sm">
                    <button
                      onClick={() => { setMode('reset-request'); setError(''); setNotice(''); }}
                      className="text-white/30 hover:text-white/60 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </p>
                )}
              </>
            )}

            {mode === 'verify' && (
              <form onSubmit={handleVerify} className="space-y-4">
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="6-digit code"
                  className={`${inputClass} text-center tracking-[0.5em] font-mono text-lg`}
                />
                <button type="submit" disabled={busy || code.length !== 6} className={primaryBtn}>
                  {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                  Verify & continue
                </button>
                <p className="text-center text-sm text-white/40">
                  Didn't get it?{' '}
                  <button type="button" onClick={handleResend} className="text-purple-400 hover:text-purple-300">
                    Resend code
                  </button>
                </p>
              </form>
            )}

            {mode === 'reset-request' && (
              <form onSubmit={handleResetRequest} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  className={inputClass}
                />
                <button type="submit" disabled={busy} className={primaryBtn}>
                  {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                  Send reset code
                </button>
                <p className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => { setMode('signin'); setError(''); setNotice(''); }}
                    className="text-white/30 hover:text-white/60 transition-colors"
                  >
                    Back to sign in
                  </button>
                </p>
              </form>
            )}

            {mode === 'reset-confirm' && (
              <form onSubmit={handleResetConfirm} className="space-y-4">
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="6-digit reset code"
                  className={`${inputClass} text-center tracking-[0.5em] font-mono text-lg`}
                />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password (6+ characters)"
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button type="submit" disabled={busy} className={primaryBtn}>
                  {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                  Update password
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default LabsAuth;
