import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Building2, BookOpen, ClipboardList,
  History, LogOut, GraduationCap, User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['admin', 'faculty', 'student'] },
  { label: 'Students', icon: Users, path: '/students', roles: ['admin', 'faculty'] },
  { label: 'Departments', icon: Building2, path: '/departments', roles: ['admin'] },
  { label: 'Courses', icon: BookOpen, path: '/courses', roles: ['admin', 'faculty'] },
  { label: 'Enrollments', icon: ClipboardList, path: '/enrollments', roles: ['admin', 'faculty'] },
  { label: 'My Profile', icon: User, path: '/profile', roles: ['student'] },
  { label: 'My Courses', icon: BookOpen, path: '/my-courses', roles: ['student'] },
  { label: 'Audit Log', icon: History, path: '/audit-log', roles: ['admin'] },
];

const roleLabels: Record<UserRole, string> = {
  admin: 'Administrator',
  faculty: 'Faculty',
  student: 'Student',
};

export const AppSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const filtered = navItems.filter(item => item.roles.includes(user.role));

  return (
    <aside className="w-64 min-h-screen sidebar-gradient flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-sidebar-foreground tracking-wide">USMS</h1>
            <p className="text-xs text-sidebar-foreground/60">University Portal</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {filtered.map(item => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center text-sm font-semibold text-sidebar-accent-foreground">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/60">{roleLabels[user.role]}</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
