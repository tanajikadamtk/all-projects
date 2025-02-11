import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../api/studentsapi";

interface Student {
  id: number;
  firstName: string;
  maidenName: string;
  age: number;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    maidenName: "",
    age: 0,
  });
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const firstNameInputRef = useRef<HTMLInputElement | null>(null);
  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = useCallback(async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  }, []);

  // Focus on firstName input when editing or adding a student
  useEffect(() => {
    if (editingStudent && firstNameInputRef.current) {
      firstNameInputRef.current.focus();
    }
  }, [editingStudent?.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddStudent = async () => {
    if (!newStudent.firstName || newStudent.age <= 0) {
      alert("Please enter valid details");
      return;
    }
    try {
      const addedStudent = await addStudent(newStudent);
      setStudents((prev) => [...prev, addedStudent]);
      setNewStudent({ firstName: "", maidenName: "", age: 0 });
    } catch (error) {
      console.error("Error adding student:", error);
    }
    // Create a new student object with a unique ID
    const newEntry = {
      id: students.length + 1, // Mocking an ID
      firstName: newStudent.firstName,
      maidenName: newStudent.maidenName,
      age: newStudent.age,
    };

    setStudents([...students, newEntry]); // Update state locally
    setNewStudent({ firstName: "", maidenName: "", age: 0 }); // Reset form
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent) return;
    try {
      const updatedStudent = await updateStudent(editingStudent.id, {
        firstName: editingStudent.firstName,
        maidenName: editingStudent.maidenName,
        age: editingStudent.age,
      });

      setStudents((prev) =>
        prev.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );

      setEditingStudent(null);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="container">
      <h1>Student List</h1>
      {editingStudent ? (
         <div className="container my-4">
         <div className="card p-4 shadow-sm">
           <h3 className="text-center mb-3">Edit Student</h3>
           <div className="row">
             <div className="col-md-4 mb-3">
               <label className="form-label">First Name</label>
               <input
                 ref={firstNameInputRef}
                 type="text"
                 className="form-control"
                 value={editingStudent?.firstName || ""}
                 onChange={(e) =>
                   setEditingStudent({
                     ...editingStudent!,
                     firstName: e.target.value,
                   })
                 }
               />
             </div>
             <div className="col-md-4 mb-3">
               <label className="form-label">Last Name</label>
               <input
                 type="text"
                 className="form-control"
                 value={editingStudent?.maidenName || ""}
                 onChange={(e) =>
                   setEditingStudent({
                     ...editingStudent!,
                     maidenName: e.target.value,
                   })
                 }
               />
             </div>
             <div className="col-md-4 mb-3">
               <label className="form-label">Age</label>
               <input
                 type="text"
                 className="form-control"
                 value={editingStudent?.age || ""}
                 onChange={(e) =>
                   setEditingStudent({
                     ...editingStudent!,
                     age: parseInt(e.target.value, 10),
                   })
                 }
               />
             </div>
           </div>
           <div className="text-center">
             <button className="btn btn-success px-4 me-2" onClick={handleUpdateStudent}>
               Update
             </button>
             <button className="btn btn-secondary px-4" onClick={() => setEditingStudent(null)}>
               Cancel
             </button>
           </div>
         </div>
       </div>
      ) : (
        <div className="container my-4">
          <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-3">Add Student</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="Enter first name"
                  value={newStudent.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="maidenName"
                  className="form-control"
                  placeholder="Enter Last name"
                  value={newStudent.maidenName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Age</label>
                <input
                  type="text"
                  name="age"
                  className="form-control"
                  placeholder="Enter age"
                  value={newStudent.age}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary px-4"
                onClick={handleAddStudent}
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
 {/* Student List Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.firstName}</td>
              <td>{student.maidenName}</td>
              <td>{student.age}</td>
              <td>
                <button onClick={() => setEditingStudent(student)}>Edit</button>
                <button onClick={() => handleDeleteStudent(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
