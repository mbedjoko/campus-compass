import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { enrollments as initialEnr, students, courses, type Enrollment } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  enrolled: 'default', completed: 'secondary', dropped: 'destructive',
};

const EnrollmentsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [enrList, setEnrList] = useState<Enrollment[]>(initialEnr);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ studentId: '', courseId: '', academicYear: '2024-2025', semester: 'Fall' });

  const filtered = enrList.filter(e => {
    const stu = students.find(s => s.id === e.studentId);
    const crs = courses.find(c => c.id === e.courseId);
    return `${stu?.firstName} ${stu?.lastName} ${crs?.name} ${crs?.code}`.toLowerCase().includes(search.toLowerCase());
  });

  const handleCreate = () => {
    if (!form.studentId || !form.courseId) { toast.error('Select student and course'); return; }
    setEnrList(prev => [...prev, { id: `enr-${Date.now()}`, ...form, status: 'enrolled', enrolledAt: new Date().toISOString().split('T')[0] }]);
    toast.success('Enrollment created');
    setDialogOpen(false);
  };

  return (
    <>
      <PageHeader title="Enrollments" description="Manage student course enrollments"
        action={isAdmin && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />New Enrollment</Button></DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader><DialogTitle>Create Enrollment</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label>Student *</Label>
                  <Select value={form.studentId} onValueChange={v => setForm(f => ({ ...f, studentId: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                    <SelectContent>{students.filter(s => s.status === 'active').map(s => <SelectItem key={s.id} value={s.id}>{s.firstName} {s.lastName}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Course *</Label>
                  <Select value={form.courseId} onValueChange={v => setForm(f => ({ ...f, courseId: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                    <SelectContent>{courses.map(c => <SelectItem key={c.id} value={c.id}>{c.name} ({c.code})</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleCreate}>Create Enrollment</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      />
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-sm mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search enrollments..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(e => {
                  const stu = students.find(s => s.id === e.studentId);
                  const crs = courses.find(c => c.id === e.courseId);
                  return (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">{stu?.firstName} {stu?.lastName}</TableCell>
                      <TableCell>
                        <p className="text-foreground">{crs?.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{crs?.code}</p>
                      </TableCell>
                      <TableCell>{e.semester} {e.academicYear}</TableCell>
                      <TableCell>{e.grade || '—'}</TableCell>
                      <TableCell><Badge variant={statusVariant[e.status]}>{e.status}</Badge></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{e.enrolledAt}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EnrollmentsPage;
