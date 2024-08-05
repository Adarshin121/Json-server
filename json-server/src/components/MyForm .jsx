import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';

const MyForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [mark, setMark] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Create a student object from the form inputs
        const newStudent = {
            name: name,
            age: parseInt(age), // Convert age to integer
            mark: parseInt(mark) // Convert mark to integer
        };

        // Send a POST request to your JSON server
        fetch('http://localhost:3001/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudent),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add student');
            }
            return response.json();
        })
        .then(data => {
            console.log('Student added successfully:', data);
            // Optionally, you can reset the form fields after successful submission
            setName('');
            setAge('');
            setMark('');
        })
        .catch(error => {
            console.error('Error adding student:', error);
        });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" gutterBottom>Add New Student</Typography>
            <form onSubmit={handleSubmit}>
                
                        <TextField
                            
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        /><br></br><br></br>
                   
                        <TextField
                            
                            label="Age"
                            variant="outlined"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        /><br></br><br></br>
                    
                        <TextField
                            
                            label="Mark"
                            variant="outlined"
                            type="number"
                            value={mark}
                            onChange={(e) => setMark(e.target.value)}
                        /><br></br><br></br>
                    
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </Container>
    );
};

export default MyForm;
