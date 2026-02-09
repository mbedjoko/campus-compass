import { useAuth } from '@/contexts/AuthContext';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, BookOpen, ClipboardList, TrendingUp, GraduationCap } from 'lucide-react';
import { students, departments, courses, enrollments, auditLogs } from '@/data/mockData';

const AdminDashboard = () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard label="Total Students" value={students.length} icon={Users} trend="+12% this semester" trendUp />
      <StatCard label="Departments" value={departments.length} icon={Building2} />
      <StatCard label="Active Courses" value={courses.length} icon={BookOpen} trend="6 this semester" trendUp />
      <StatCard label="Enrollments" value={enrollments.length} icon={ClipboardList} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-sans">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditLogs.slice(0, 5).map(log => (
              <div key={log.id} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{log.details}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {log.userName} · {new Date(log.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">{log.action}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-sans">Departments Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {departments.map(dep => (
              <div key={dep.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{dep.name}</p>
                  <p className="text-xs text-muted-foreground">{dep.head}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{dep.studentCount}</p>
                  <p className="text-xs text-muted-foreground">students</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </>
);

const FacultyDashboard = () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <StatCard label="My Students" value={students.filter(s => s.departmentId === 'dep-1').length} icon={Users} />
      <StatCard label="My Courses" value={courses.filter(c => c.departmentId === 'dep-1').length} icon={BookOpen} />
      <StatCard label="Enrollments" value={4} icon={TrendingUp} />
    </div>
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-sans">My Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {courses.filter(c => c.departmentId === 'dep-1').map(course => (
            <div key={course.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-medium text-foreground">{course.name}</p>
                <p className="text-xs text-muted-foreground">{course.code} · {course.credits} credits</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{course.enrolled}/{course.capacity}</p>
                <p className="text-xs text-muted-foreground">enrolled</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </>
);

const StudentDashboard = () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <StatCard label="Enrolled Courses" value={2} icon={BookOpen} />
      <StatCard label="Department" value="CS" icon={Building2} />
      <StatCard label="Status" value="Active" icon={GraduationCap} />
    </div>
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-sans">My Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {enrollments.filter(e => e.studentId === 'stu-1').map(enr => {
            const course = courses.find(c => c.id === enr.courseId);
            return (
              <div key={enr.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{course?.name}</p>
                  <p className="text-xs text-muted-foreground">{course?.code} · {enr.semester} {enr.academicYear}</p>
                </div>
                <Badge variant={enr.status === 'enrolled' ? 'default' : enr.status === 'completed' ? 'secondary' : 'destructive'}>
                  {enr.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  </>
);

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <>
      <PageHeader
        title={`Welcome, ${user?.name.split(' ')[0]}`}
        description="Here's an overview of your university portal"
      />
      {user?.role === 'admin' && <AdminDashboard />}
      {user?.role === 'faculty' && <FacultyDashboard />}
      {user?.role === 'student' && <StudentDashboard />}
    </>
  );
};

export default DashboardPage;
