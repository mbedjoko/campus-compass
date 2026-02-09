import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GraduationCap, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 sidebar-gradient flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">USMS</h1>
            <p className="text-sm text-primary-foreground/60">University Student Management</p>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-primary-foreground font-serif leading-tight">
            Empowering Academic<br />Excellence
          </h2>
          <p className="text-primary-foreground/70 mt-4 text-lg max-w-md">
            A comprehensive platform for managing students, courses, departments, and academic operations.
          </p>
        </div>
        <p className="text-primary-foreground/40 text-sm">© 2024 University Student Management System</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold text-foreground">USMS</h1>
          </div>

          <Card className="border-0 shadow-none lg:shadow-sm lg:border">
            <CardHeader className="space-y-1 px-0 lg:px-6">
              <h2 className="text-2xl font-bold text-foreground font-serif">Welcome back</h2>
              <p className="text-muted-foreground">Sign in to your account to continue</p>
            </CardHeader>
            <CardContent className="px-0 lg:px-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@university.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 p-4 rounded-lg bg-muted">
                <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong>Admin:</strong> admin@university.edu / admin123</p>
                  <p><strong>Faculty:</strong> faculty@university.edu / faculty123</p>
                  <p><strong>Student:</strong> student@university.edu / student123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
