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
      status: "all",
      sort: "asc",
      editStudent: null,
    };
  }

  handleFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({ newStudent: { ...this.state.newStudent, [name]: value } });
  };

  handleTypeChange = (value) => {
    this.setState({ status: value });
  };

  handleSort = (value) => {
    this.setState({ sort: value });
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

  handleSave = () => {
    const updatedStudentData = this.state.editStudent;
    const gradeNumber = parseInt(updatedStudentData.grade, 10);

    if (isNaN(gradeNumber) || gradeNumber < 0 || gradeNumber > 100) {
      alert("Please enter a valid grade between 0 and 100");
      return;
    }

    this.setState({
      students: this.state.students.map((student) =>
        student.id === updatedStudentData.id
          ? { ...updatedStudentData, passed: updatedStudentData.grade >= 55 }
          : student,
      ),
    });
    this.setState({ editStudent: null });
  };

  renderStudentList() {
    const { students } = this.state;
    const sortBy = this.state.sort;
    const sortedStudents = students.sort((a, b) => {
      return sortBy === "asc"
        ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        : b.name.toLowerCase().localeCompare(a.name.toLowerCase());
    });
    const filterType = this.state.status;
    const filteredStudents =
      filterType === "all"
        ? sortedStudents
        : sortedStudents.filter((student) =>
            filterType === "passed" ? student.passed : !student.passed,
          );

    if (students.length === 0) {
      return (
        <div className="empty-students-list">
          <p>No students added yet. Add your first student below!</p>
        </div>
      );
    }

    return (
      <div>
        <h2>Filtered Student List ({filteredStudents.length})</h2>
        <div className="students-grid">
          {filteredStudents.map((student) => (
            <div
              className={`student-card ${student.passed ? "passed" : "failed"}`}
              key={student.id}
            >
              <div className="student-status">
                <span
                  className={`status ${student.passed ? "status-passed" : "status-failed"}`}
                >
                  {student.passed ? "Passed" : "Failed"}
                </span>
              </div>
              <div className="student-info">
                <h3>{student.name}</h3>
                <p>
                  <strong>Subject: </strong>
                  {student.subject}
                </p>
                {this.state.editStudent ? (
                  this.state.editStudent.id === student.id ? (
                    <div className="form-group">
                      <strong>Grade: </strong>
                      <input
                        type="number"
                        value={this.state.editStudent.grade}
                        onChange={(e) =>
                          this.setState({
                            editStudent: {
                              ...this.state.editStudent,
                              grade: e.target.value,
                            },
                          })
                        }
                        className="grade-input"
                        min="0"
                        max="100"
                      />
                    </div>
                  ) : (
                    <p>
                      <strong>Grade: </strong>
                      {student.grade}%
                    </p>
                  )
                ) : (
                  <p>
                    <strong>Grade: </strong>
                    {student.grade}%
                  </p>
                )}
              </div>
              <div className="student-actions">
                {this.state.editStudent ? (
                  this.state.editStudent.id === student.id ? (
                    <button
                      className="action-btn save-btn"
                      title="Save Grade"
                      onClick={() => this.handleSave()}
                    >
                      Save Grade
                    </button>
                  ) : (
                    <button
                      className="action-btn edit-btn"
                      title="Edit Grade"
                      onClick={() => this.setState({ editStudent: student })}
                    >
                      Edit Grade
                    </button>
                  )
                ) : (
                  <button
                    className="action-btn edit-btn"
                    title="Edit Grade"
                    onClick={() => this.setState({ editStudent: student })}
                  >
                    Edit Grade
                  </button>
                )}
                <button
                  className="action-btn delete-btn"
                  title="Delete Student"
                  onClick={() => this.handleDeleteStudent(student.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
            <div style={{ display: "flex", gap: "50px", marginBottom: "15px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <span>Filter by Status:</span>
                <select
                  value={this.state.status}
                  onChange={(e) => this.handleTypeChange(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <span>Sort By:</span>
                <select
                  value={this.state.sort}
                  onChange={(e) => this.handleSort(e.target.value)}
                >
                  <option value="asc">Ascending</option>
                  <option value="dec">Decending</option>
                </select>
              </div>
            </div>
            {this.renderStudentList()}
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
