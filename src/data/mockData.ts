export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  departmentId: string;
  enrollmentYear: number;
  status: 'active' | 'inactive' | 'graduated';
  dateOfBirth: string;
  phone: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  description: string;
  studentCount: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  credits: number;
  semester: string;
  instructor: string;
  capacity: number;
  enrolled: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  academicYear: string;
  semester: string;
  grade?: string;
  status: 'enrolled' | 'completed' | 'dropped';
  enrolledAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT';
  entity: string;
  entityId: string;
  details: string;
}

export const departments: Department[] = [
  { id: 'dep-1', name: 'Computer Science', code: 'CS', head: 'Prof. James Walker', description: 'Study of computation and information', studentCount: 245 },
  { id: 'dep-2', name: 'Mathematics', code: 'MATH', head: 'Dr. Emily Chen', description: 'Pure and applied mathematics', studentCount: 180 },
  { id: 'dep-3', name: 'Physics', code: 'PHY', head: 'Dr. Robert Klein', description: 'Study of matter, energy, and the fundamental forces', studentCount: 156 },
  { id: 'dep-4', name: 'Business Administration', code: 'BA', head: 'Prof. Maria Santos', description: 'Management and business studies', studentCount: 312 },
  { id: 'dep-5', name: 'Electrical Engineering', code: 'EE', head: 'Dr. Ahmed Hassan', description: 'Electrical systems and electronics', studentCount: 198 },
];

export const students: Student[] = [
  { id: 'stu-1', firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@uni.edu', studentId: 'CS2023001', departmentId: 'dep-1', enrollmentYear: 2023, status: 'active', dateOfBirth: '2002-05-14', phone: '+1-555-0101' },
  { id: 'stu-2', firstName: 'Bob', lastName: 'Williams', email: 'bob.w@uni.edu', studentId: 'CS2023002', departmentId: 'dep-1', enrollmentYear: 2023, status: 'active', dateOfBirth: '2001-11-22', phone: '+1-555-0102' },
  { id: 'stu-3', firstName: 'Clara', lastName: 'Martinez', email: 'clara.m@uni.edu', studentId: 'MATH2022005', departmentId: 'dep-2', enrollmentYear: 2022, status: 'active', dateOfBirth: '2001-03-08', phone: '+1-555-0103' },
  { id: 'stu-4', firstName: 'David', lastName: 'Brown', email: 'david.b@uni.edu', studentId: 'PHY2021010', departmentId: 'dep-3', enrollmentYear: 2021, status: 'graduated', dateOfBirth: '2000-07-30', phone: '+1-555-0104' },
  { id: 'stu-5', firstName: 'Eva', lastName: 'Garcia', email: 'eva.g@uni.edu', studentId: 'BA2023008', departmentId: 'dep-4', enrollmentYear: 2023, status: 'active', dateOfBirth: '2002-01-19', phone: '+1-555-0105' },
  { id: 'stu-6', firstName: 'Frank', lastName: 'Lee', email: 'frank.l@uni.edu', studentId: 'EE2022003', departmentId: 'dep-5', enrollmentYear: 2022, status: 'active', dateOfBirth: '2001-09-12', phone: '+1-555-0106' },
  { id: 'stu-7', firstName: 'Grace', lastName: 'Kim', email: 'grace.k@uni.edu', studentId: 'CS2022007', departmentId: 'dep-1', enrollmentYear: 2022, status: 'active', dateOfBirth: '2001-06-25', phone: '+1-555-0107' },
  { id: 'stu-8', firstName: 'Henry', lastName: 'Davis', email: 'henry.d@uni.edu', studentId: 'MATH2023004', departmentId: 'dep-2', enrollmentYear: 2023, status: 'inactive', dateOfBirth: '2002-04-03', phone: '+1-555-0108' },
];

export const courses: Course[] = [
  { id: 'crs-1', name: 'Data Structures & Algorithms', code: 'CS201', departmentId: 'dep-1', credits: 4, semester: 'Fall 2024', instructor: 'Prof. James Walker', capacity: 60, enrolled: 52 },
  { id: 'crs-2', name: 'Machine Learning', code: 'CS401', departmentId: 'dep-1', credits: 3, semester: 'Fall 2024', instructor: 'Dr. Lisa Park', capacity: 40, enrolled: 38 },
  { id: 'crs-3', name: 'Linear Algebra', code: 'MATH201', departmentId: 'dep-2', credits: 3, semester: 'Fall 2024', instructor: 'Dr. Emily Chen', capacity: 50, enrolled: 45 },
  { id: 'crs-4', name: 'Quantum Mechanics', code: 'PHY301', departmentId: 'dep-3', credits: 4, semester: 'Fall 2024', instructor: 'Dr. Robert Klein', capacity: 35, enrolled: 28 },
  { id: 'crs-5', name: 'Financial Management', code: 'BA301', departmentId: 'dep-4', credits: 3, semester: 'Fall 2024', instructor: 'Prof. Maria Santos', capacity: 70, enrolled: 65 },
  { id: 'crs-6', name: 'Circuit Analysis', code: 'EE201', departmentId: 'dep-5', credits: 4, semester: 'Fall 2024', instructor: 'Dr. Ahmed Hassan', capacity: 45, enrolled: 40 },
];

export const enrollments: Enrollment[] = [
  { id: 'enr-1', studentId: 'stu-1', courseId: 'crs-1', academicYear: '2024-2025', semester: 'Fall', status: 'enrolled', enrolledAt: '2024-09-01' },
  { id: 'enr-2', studentId: 'stu-1', courseId: 'crs-2', academicYear: '2024-2025', semester: 'Fall', status: 'enrolled', enrolledAt: '2024-09-01' },
  { id: 'enr-3', studentId: 'stu-2', courseId: 'crs-1', academicYear: '2024-2025', semester: 'Fall', status: 'enrolled', enrolledAt: '2024-09-02' },
  { id: 'enr-4', studentId: 'stu-3', courseId: 'crs-3', academicYear: '2024-2025', semester: 'Fall', grade: 'A', status: 'completed', enrolledAt: '2024-09-01' },
  { id: 'enr-5', studentId: 'stu-5', courseId: 'crs-5', academicYear: '2024-2025', semester: 'Fall', status: 'enrolled', enrolledAt: '2024-09-03' },
  { id: 'enr-6', studentId: 'stu-6', courseId: 'crs-6', academicYear: '2024-2025', semester: 'Fall', status: 'dropped', enrolledAt: '2024-09-01' },
];

export const auditLogs: AuditLog[] = [
  { id: 'log-1', timestamp: '2024-09-01T08:30:00Z', userId: '1', userName: 'Dr. Sarah Mitchell', role: 'admin', action: 'CREATE', entity: 'Student', entityId: 'stu-1', details: 'Created student Alice Johnson' },
  { id: 'log-2', timestamp: '2024-09-01T09:15:00Z', userId: '2', userName: 'Prof. James Walker', role: 'faculty', action: 'CREATE', entity: 'Enrollment', entityId: 'enr-1', details: 'Enrolled Alice Johnson in CS201' },
  { id: 'log-3', timestamp: '2024-09-02T10:00:00Z', userId: '1', userName: 'Dr. Sarah Mitchell', role: 'admin', action: 'UPDATE', entity: 'Course', entityId: 'crs-2', details: 'Updated capacity for Machine Learning' },
  { id: 'log-4', timestamp: '2024-09-03T14:20:00Z', userId: '1', userName: 'Dr. Sarah Mitchell', role: 'admin', action: 'DELETE', entity: 'Enrollment', entityId: 'enr-6', details: 'Dropped Frank Lee from EE201' },
  { id: 'log-5', timestamp: '2024-09-04T07:45:00Z', userId: '3', userName: 'Alice Johnson', role: 'student', action: 'LOGIN', entity: 'Session', entityId: '3', details: 'Student logged in' },
  { id: 'log-6', timestamp: '2024-09-05T11:30:00Z', userId: '1', userName: 'Dr. Sarah Mitchell', role: 'admin', action: 'CREATE', entity: 'Department', entityId: 'dep-5', details: 'Created Electrical Engineering department' },
];
