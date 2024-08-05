import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const Dataview = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/students")
            .then((response)=>{
                console.log(response.data)
                setStudents(response.data);
            })
    }, []);

    
// Update function

const handleUpdate = (id) => {
    // Find the student with the specified ID
    const studentToUpdate = students.find(student => student.id === id);
    if (!studentToUpdate) {
        console.error("Student not found:", id);
        return;
    }

    // Example: Assume there's a state variable to track the updated student data
    const updatedStudentData = {
        ...studentToUpdate, // Keep existing student data
        name: 'Updated Name', // Example: Update name
        age: 25, // Example: Update age
        mark: 95 // Example: Update mark
    };

    // Send a PUT or PATCH request to the server to update the student
    axios.put(`http://localhost:3001/students/${id}`, updatedStudentData)
        .then((response) => {
            console.log("Student updated successfully:", response.data);
            // Update the state to reflect the changes
            setStudents(students.map(student => student.id === id ? response.data : student));
        })
        .catch((error) => {
            console.error("Error updating student:", error);
        });
};


//Delete Function

    const handleDelete = (id) => {
        // Send a DELETE request to the server to delete the student with the specified ID
        axios.delete(`http://localhost:3001/students/${id}`)
            .then((response) => {
                console.log("Student deleted successfully:", id);
                // Filter out the deleted student from the students array
                setStudents(students.filter(student => student.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting student:", error);
            });
    };

    return (
        <div>
            <h1>Students</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.age}</TableCell>
                                <TableCell>{student.mark}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleUpdate(student.id)} variant="outlined" color="primary">Update</Button>
                                    <Button onClick={() => handleDelete(student.id)} variant="outlined" color="secondary">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Dataview;
