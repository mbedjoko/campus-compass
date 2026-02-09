import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { students, departments, enrollments, courses } from '@/data/mockData';

const StudentProfilePage = () => {
  // In a real app, this would fetch the logged-in student's data
  const student = students[0];
  const dept = departments.find(d => d.id === student.departmentId);
  const myEnrollments = enrollments.filter(e => e.studentId === student.id);

  return (
    <>
      <PageHeader title="My Profile" description="Your academic information" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">{student.firstName[0]}{student.lastName[0]}</span>
              </div>
              <h2 className="text-xl font-semibold text-foreground font-sans">{student.firstName} {student.lastName}</h2>
              <p className="text-muted-foreground text-sm">{student.email}</p>
              <Badge className="mt-2">{student.status}</Badge>
            </div>
            <div className="mt-6 space-y-3">
              {[
                ['Student ID', student.studentId],
                ['Department', dept?.name],
                ['Enrollment Year', student.enrollmentYear],
                ['Phone', student.phone],
                ['Date of Birth', student.dateOfBirth],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-foreground font-medium">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-lg font-sans">My Enrollments</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myEnrollments.map(enr => {
                const course = courses.find(c => c.id === enr.courseId);
                return (
                  <div key={enr.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{course?.name}</p>
                      <p className="text-sm text-muted-foreground">{course?.code} · {course?.credits} credits · {course?.instructor}</p>
                      <p className="text-xs text-muted-foreground mt-1">{enr.semester} {enr.academicYear}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={enr.status === 'enrolled' ? 'default' : enr.status === 'completed' ? 'secondary' : 'destructive'}>{enr.status}</Badge>
                      {enr.grade && <p className="text-lg font-bold text-foreground mt-1">{enr.grade}</p>}
                    </div>
                  </div>
                );
              })}
              {myEnrollments.length === 0 && <p className="text-center text-muted-foreground py-8">No enrollments found</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StudentProfilePage;
