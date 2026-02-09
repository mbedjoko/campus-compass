import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { departments as initialDeps, type Department } from '@/data/mockData';
import { toast } from 'sonner';

const DepartmentsPage = () => {
  const [depts, setDepts] = useState<Department[]>(initialDeps);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [form, setForm] = useState({ name: '', code: '', head: '', description: '' });

  const filtered = depts.filter(d => `${d.name} ${d.code} ${d.head}`.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => { setEditing(null); setForm({ name: '', code: '', head: '', description: '' }); setDialogOpen(true); };
  const openEdit = (d: Department) => { setEditing(d); setForm({ name: d.name, code: d.code, head: d.head, description: d.description }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.code) { toast.error('Name and code required'); return; }
    if (editing) {
      setDepts(prev => prev.map(d => d.id === editing.id ? { ...d, ...form } : d));
      toast.success('Department updated');
    } else {
      setDepts(prev => [...prev, { id: `dep-${Date.now()}`, ...form, studentCount: 0 }]);
      toast.success('Department created');
    }
    setDialogOpen(false);
  };

  return (
    <>
      <PageHeader title="Departments" description="Manage academic departments and filières"
        action={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Department</Button></DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader><DialogTitle>{editing ? 'Edit' : 'Add'} Department</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                  <div className="space-y-1.5"><Label>Code *</Label><Input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} /></div>
                </div>
                <div className="space-y-1.5"><Label>Department Head</Label><Input value={form.head} onChange={e => setForm(f => ({ ...f, head: e.target.value }))} /></div>
                <div className="space-y-1.5"><Label>Description</Label><Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
                <Button className="w-full" onClick={handleSave}>{editing ? 'Update' : 'Create'}</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-sm mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search departments..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Head</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(d => (
                  <TableRow key={d.id}>
                    <TableCell>
                      <p className="font-medium text-foreground">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.description}</p>
                    </TableCell>
                    <TableCell className="font-mono">{d.code}</TableCell>
                    <TableCell>{d.head}</TableCell>
                    <TableCell>{d.studentCount}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(d)}><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { setDepts(prev => prev.filter(x => x.id !== d.id)); toast.success('Deleted'); }}><Trash2 className="w-3.5 h-3.5" /></Button>
                      </div>
                    </TableCell>
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

export default DepartmentsPage;
