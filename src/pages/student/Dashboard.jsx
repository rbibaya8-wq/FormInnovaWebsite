import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [myCourses, setMyCourses] = useState([]);

  // 📦 load courses from localStorage
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("myCourses")) || [];
    setMyCourses(storedCourses);
  }, []);

  // 🚪 logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.welcome}>
          Welcome, {user?.name || "Student"} 👋
        </h2>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* USER INFO */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Your Info</h3>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      {/* COURSES */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>My Courses</h3>

        {myCourses.length === 0 ? (
          <p style={styles.empty}>
            You have not enrolled in any course yet.
          </p>
        ) : (
          <div style={styles.coursesGrid}>
            {myCourses.map(course => (
              <div key={course.id} style={styles.courseCard}>
                
                <img 
                  src={course.image} 
                  alt={course.title} 
                  style={styles.courseImage}
                />

                <h4 style={styles.courseTitle}>
                  {course.title}
                </h4>

                <p style={styles.courseInfo}>
                  ⏱ {course.duration} | ⭐ {course.rating}
                </p>

                <button
                  style={styles.continueBtn}
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  Continue
                </button>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
const styles = {

  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "#f5f7fa",
    fontFamily: "Segoe UI"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  welcome: {
    fontSize: "26px",
    fontWeight: "600"
  },

  logoutBtn: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#ff4d4f",
    color: "#fff",
    cursor: "pointer"
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "25px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)"
  },

  cardTitle: {
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "600"
  },

  empty: {
    color: "#888"
  },

  coursesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
    gap: "20px"
  },

  courseCard: {
    background: "#fafafa",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    transition: "0.3s"
  },

  courseImage: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  courseTitle: {
    margin: "10px 0",
    fontSize: "16px"
  },

  courseInfo: {
    fontSize: "13px",
    color: "#777"
  },

  continueBtn: {
    marginTop: "10px",
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    background: "#15BE6A",
    color: "#fff",
    cursor: "pointer"
  }
};