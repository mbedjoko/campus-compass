import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { courses as initialCourses, departments, type Course } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const CoursesPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [coursesList, setCourses] = useState<Course[]>(initialCourses);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState({ name: '', code: '', departmentId: '', credits: 3, instructor: '', capacity: 40, semester: 'Fall 2024' });

  const filtered = coursesList.filter(c => {
    const match = `${c.name} ${c.code} ${c.instructor}`.toLowerCase().includes(search.toLowerCase());
    if (user?.role === 'faculty') return match && c.departmentId === user.departmentId;
    return match;
  });

  const openCreate = () => { setEditing(null); setForm({ name: '', code: '', departmentId: '', credits: 3, instructor: '', capacity: 40, semester: 'Fall 2024' }); setDialogOpen(true); };
  const openEdit = (c: Course) => { setEditing(c); setForm({ name: c.name, code: c.code, departmentId: c.departmentId, credits: c.credits, instructor: c.instructor, capacity: c.capacity, semester: c.semester }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.code || !form.departmentId) { toast.error('Fill required fields'); return; }
    if (editing) {
      setCourses(prev => prev.map(c => c.id === editing.id ? { ...c, ...form } : c));
      toast.success('Course updated');
    } else {
      setCourses(prev => [...prev, { id: `crs-${Date.now()}`, ...form, enrolled: 0 }]);
      toast.success('Course created');
    }
    setDialogOpen(false);
  };

  return (
    <>
      <PageHeader title="Courses" description="Manage course offerings"
        action={isAdmin && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Course</Button></DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader><DialogTitle>{editing ? 'Edit' : 'Add'} Course</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5"><Label>Course Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>Code *</Label><Input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} /></div>
                  <div className="space-y-1.5"><Label>Credits</Label><Input type="number" value={form.credits} onChange={e => setForm(f => ({ ...f, credits: +e.target.value }))} /></div>
                </div>
                <div className="space-y-1.5">
                  <Label>Department *</Label>
                  <Select value={form.departmentId} onValueChange={v => setForm(f => ({ ...f, departmentId: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{departments.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5"><Label>Instructor</Label><Input value={form.instructor} onChange={e => setForm(f => ({ ...f, instructor: e.target.value }))} /></div>
                <div className="space-y-1.5"><Label>Capacity</Label><Input type="number" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: +e.target.value }))} /></div>
                <Button className="w-full" onClick={handleSave}>{editing ? 'Update' : 'Create'}</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      />
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-sm mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Enrollment</TableHead>
                  {isAdmin && <TableHead className="w-20">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <p className="font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.credits} credits · {c.semester}</p>
                    </TableCell>
                    <TableCell className="font-mono">{c.code}</TableCell>
                    <TableCell>{departments.find(d => d.id === c.departmentId)?.code}</TableCell>
                    <TableCell>{c.instructor}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">{c.enrolled}/{c.capacity}</p>
                        <Progress value={(c.enrolled / c.capacity) * 100} className="h-1.5" />
                      </div>
                    </TableCell>
                    {isAdmin && (
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(c)}><Pencil className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { setCourses(prev => prev.filter(x => x.id !== c.id)); toast.success('Deleted'); }}><Trash2 className="w-3.5 h-3.5" /></Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CoursesPage;
