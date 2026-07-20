import React from "react";
import "./App.css";

import { students } from "./utils/data";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students,
      newStudent: {
        name: "",
        subject: "",
        grade: "",
      },
    };
  }

  handleFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({ newStudent: { ...this.state.newStudent, [name]: value } });
  };

  handleDeleteStudent = (studentId) => {
    this.setState({
      students: this.state.students.filter(
        (student) => student.id !== studentId,
      ),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, subject, grade } = this.state.newStudent;

    if (!name.trim() || !subject || !grade) {
      alert("Please fill in all fields");
      return;
    }

    const gradeNumber = parseInt(grade, 10);

    if (isNaN(gradeNumber) || gradeNumber < 0 || gradeNumber > 100) {
      alert("Please enter a valid grade between 0 and 100");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      subject,
      grade: gradeNumber,
      passed: gradeNumber >= 55,
    };

    this.setState({
      students: [...this.state.students, newStudent],
      newStudent: {
        name: "",
        subject: "",
        grade: "",
      },
    });
  };

  renderStudentList() {
    const { students } = this.state;

    if (students.length === 0) {
      return (
        <div className="empty-students-list">
          <p>No students added yet. Add your first student below!</p>
        </div>
      );
    }

    return students.map((student) => (
      <div
        className={`student-card ${student.passed ? "passed" : "failed"}`}
        key={student.id}
      >
        <div className="student-info">
          <h3>{student.name}</h3>
          <p>
            <strong>Subject: </strong>
            {student.subject}
          </p>
          <p>
            <strong>Grade: </strong>
            {student.grade}%
          </p>
        </div>
        <div className="student-status">
          <span
            className={`status ${student.passed ? "status-passed" : "status-failed"}`}
          >
            {student.passed ? "Passed" : "Failed"}
          </span>
        </div>
        <div className="student-actions">
          <button
            className="delete-btn"
            title="Delete Student"
            onClick={() => this.handleDeleteStudent(student.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }

  render() {
    const { students } = this.state;

    return (
      <div className="app">
        <header className="app-header">
          <h1>Student Grade Tracker</h1>
          <p>Class Component Design</p>
        </header>
        <main className="app-main">
          <section className="students-section">
            <h2>Student List ({students.length})</h2>
            <div className="students-grid">{this.renderStudentList()}</div>
          </section>

          <section className="add-student-section">
            <h2>Add New Student</h2>
            <form onSubmit={this.handleSubmit} className="add-student-form">
              <div className="form-group">
                <label htmlFor="studentName">Student Name: </label>
                <input
                  type="text"
                  id="sudentName"
                  name="name"
                  value={this.state.newStudent.name}
                  onChange={this.handleFieldChange}
                  placeholder="Enter student's full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="studentSubject">Subject: </label>
                <select
                  name="subject"
                  id="sudentSubject"
                  value={this.state.newStudent.subject}
                  onChange={this.handleFieldChange}
                >
                  <option value="">Select a subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="studentGrade">Grade (0-100): </label>
                <input
                  type="number"
                  id="studentGrade"
                  name="grade"
                  value={this.state.newStudent.grade}
                  onChange={this.handleFieldChange}
                  placeholder="Enter grade (0-100)"
                  min="0"
                  max="100"
                />
              </div>
              <button type="submit" className="submit-btn">
                Add Student
              </button>
            </form>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
