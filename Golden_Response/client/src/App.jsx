import React, { useState } from "react";

function App() {

  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    course: "",
    semester: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addStudent = () => {

    if (
      !formData.name ||
      !formData.rollNumber ||
      !formData.course ||
      !formData.semester
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId !== null) {

      const updatedStudents = students.map((student) =>
        student.id === editId
          ? { ...student, ...formData }
          : student
      );

      setStudents(updatedStudents);

      setEditId(null);

    } else {

      const newStudent = {
        id: Date.now(),
        ...formData,
      };

      setStudents([...students, newStudent]);
    }

    setFormData({
      name: "",
      rollNumber: "",
      course: "",
      semester: "",
    });
  };

  const editStudent = (student) => {

    setFormData({
      name: student.name,
      rollNumber: student.rollNumber,
      course: student.course,
      semester: student.semester,
    });

    setEditId(student.id);
  };

  const deleteStudent = (id) => {
    setStudents(
      students.filter((item) => item.id !== id)
    );
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">

      {/* Navbar */}
      <nav className="bg-blue-700 text-white p-5 shadow-lg">
        <h1 className="text-4xl font-bold text-center">
          Student Management Dashboard
        </h1>
      </nav>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto py-10 px-5">

        {/* Form */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Add Student Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              name="name"
              placeholder="Student Name"
              className="border-2 border-gray-300 p-4 rounded-2xl focus:outline-none focus:border-blue-500"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="rollNumber"
              placeholder="Roll Number"
              className="border-2 border-gray-300 p-4 rounded-2xl focus:outline-none focus:border-blue-500"
              value={formData.rollNumber}
              onChange={handleChange}
            />

            <input
              type="text"
              name="course"
              placeholder="Course"
              className="border-2 border-gray-300 p-4 rounded-2xl focus:outline-none focus:border-blue-500"
              value={formData.course}
              onChange={handleChange}
            />

            <input
              type="text"
              name="semester"
              placeholder="Semester"
              className="border-2 border-gray-300 p-4 rounded-2xl focus:outline-none focus:border-blue-500"
              value={formData.semester}
              onChange={handleChange}
            />

          </div>

          <div className="text-center mt-8">

            <button
              onClick={addStudent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl text-xl shadow-lg transition duration-300"
            >
              {editId !== null ? "Update Student" : "Add Student"}
            </button>

          </div>
        </div>

        {/* Search */}
        <div className="mt-10">

          <input
            type="text"
            placeholder="Search Student..."
            className="w-full border-2 border-gray-300 p-4 rounded-2xl focus:outline-none focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Student Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

          {filteredStudents.map((student) => (

            <div
              key={student.id}
              className="bg-white rounded-3xl p-8 shadow-2xl hover:scale-105 transition duration-300"
            >

              <h2 className="text-4xl font-bold text-blue-700 mb-6">
                {student.name}
              </h2>

              <div className="space-y-3 text-lg text-gray-700">

                <p>
                  <strong>Roll:</strong>
                  {" "}
                  {student.rollNumber}
                </p>

                <p>
                  <strong>Course:</strong>
                  {" "}
                  {student.course}
                </p>

                <p>
                  <strong>Semester:</strong>
                  {" "}
                  {student.semester}
                </p>

              </div>

              <div className="flex gap-3 mt-8">

                <button
                  onClick={() => editStudent(student)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl transition"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteStudent(student.id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;