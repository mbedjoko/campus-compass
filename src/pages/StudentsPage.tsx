import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { students as initialStudents, departments, type Student } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const statusColors: Record<string, 'default' | 'secondary' | 'destructive'> = {
  active: 'default',
  inactive: 'destructive',
  graduated: 'secondary',
};

const StudentsPage = () => {
  const { user } = useAuth();
  const [studentsList, setStudentsList] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', studentId: '', departmentId: '', phone: '', status: 'active' as Student['status'] });

  const isAdmin = user?.role === 'admin';

  const filtered = studentsList.filter(s => {
    const q = search.toLowerCase();
    const match = `${s.firstName} ${s.lastName} ${s.email} ${s.studentId}`.toLowerCase().includes(q);
    if (user?.role === 'faculty') return match && s.departmentId === user.departmentId;
    return match;
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ firstName: '', lastName: '', email: '', studentId: '', departmentId: '', phone: '', status: 'active' });
    setDialogOpen(true);
  };

  const openEdit = (s: Student) => {
    setEditing(s);
    setForm({ firstName: s.firstName, lastName: s.lastName, email: s.email, studentId: s.studentId, departmentId: s.departmentId, phone: s.phone, status: s.status });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.studentId || !form.departmentId) {
      toast.error('Please fill all required fields');
      return;
    }
    if (editing) {
      setStudentsList(prev => prev.map(s => s.id === editing.id ? { ...s, ...form } : s));
      toast.success('Student updated');
    } else {
      const newStudent: Student = { id: `stu-${Date.now()}`, ...form, enrollmentYear: new Date().getFullYear(), dateOfBirth: '2000-01-01' };
      setStudentsList(prev => [...prev, newStudent]);
      toast.success('Student created');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setStudentsList(prev => prev.filter(s => s.id !== id));
    toast.success('Student deleted');
  };

  return (
    <>
      <PageHeader
        title="Students"
        description={`Manage student records${user?.role === 'faculty' ? ' in your department' : ''}`}
        action={isAdmin && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Student</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editing ? 'Edit Student' : 'Add Student'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>First Name *</Label>
                    <Input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Last Name *</Label>
                    <Input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Email *</Label>
                  <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Student ID *</Label>
                  <Input value={form.studentId} onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Department *</Label>
                  <Select value={form.departmentId} onValueChange={v => setForm(f => ({ ...f, departmentId: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>
                      {departments.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v: Student['status']) => setForm(f => ({ ...f, status: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleSave}>{editing ? 'Update' : 'Create'} Student</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      />

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Year</TableHead>
                  {isAdmin && <TableHead className="w-20">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(s => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{s.firstName} {s.lastName}</p>
                        <p className="text-xs text-muted-foreground">{s.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{s.studentId}</TableCell>
                    <TableCell>{departments.find(d => d.id === s.departmentId)?.code}</TableCell>
                    <TableCell><Badge variant={statusColors[s.status]}>{s.status}</Badge></TableCell>
                    <TableCell>{s.enrollmentYear}</TableCell>
                    {isAdmin && (
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(s)}><Pencil className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(s.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No students found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default StudentsPage;
