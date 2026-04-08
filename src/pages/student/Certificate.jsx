import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaCertificate,
  FaDownload,
  FaPrint,
  FaShare,
  FaCheckCircle,
  FaCalendarAlt,
  FaUser,
  FaBookOpen,
  FaStar,
  FaTrophy,
  FaAward,
  FaGraduationCap,
  FaSpinner,
  FaMapMarkerAlt,
  FaBuilding
} from "react-icons/fa";
import { courses } from "../../data/courses";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    padding: "40px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  
  certificateWrapper: {
    maxWidth: "900px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease"
  },
  
  // Certificate design - more square / compact
  certificate: {
    padding: "40px 35px",
    background: "#ffffff",
    position: "relative",
    border: "1px solid #e9ecef"
  },
  
  // Decorative border (subtle)
  decorativeBorder: {
    position: "absolute",
    top: "15px",
    left: "15px",
    right: "15px",
    bottom: "15px",
    border: "1px solid #15BE6A",
    opacity: 0.2,
    pointerEvents: "none",
    borderRadius: "8px"
  },
  
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px"
  },
  
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  
  logoIcon: {
    fontSize: "40px",
    color: "#15BE6A"
  },
  
  instituteText: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#1a2a3a",
    letterSpacing: "1px"
  },
  
  certificateBadge: {
    backgroundColor: "#15BE6A10",
    padding: "6px 14px",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  
  badgeIcon: {
    fontSize: "18px",
    color: "#15BE6A"
  },
  
  badgeText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#15BE6A",
    textTransform: "uppercase"
  },
  
  titleSection: {
    textAlign: "center",
    marginBottom: "25px"
  },
  
  certTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#15BE6A",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "5px"
  },
  
  subTitle: {
    fontSize: "14px",
    color: "#6c757d",
    letterSpacing: "1px"
  },
  
  studentInfo: {
    textAlign: "center",
    marginBottom: "25px"
  },
  
  thisIsToCertify: {
    fontSize: "15px",
    color: "#6c757d",
    marginBottom: "8px"
  },
  
  studentName: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1a2a3a",
    fontFamily: "'Georgia', serif",
    marginBottom: "8px"
  },
  
  underline: {
    width: "80px",
    height: "3px",
    backgroundColor: "#15BE6A",
    margin: "0 auto"
  },
  
  completionText: {
    fontSize: "15px",
    color: "#6c757d",
    margin: "20px 0 10px"
  },
  
  courseName: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#15BE6A",
    marginBottom: "20px"
  },
  
  // Center info card
  centerInfo: {
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    padding: "15px 20px",
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px"
  },
  
  centerDetail: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  
  centerIcon: {
    fontSize: "20px",
    color: "#15BE6A"
  },
  
  centerText: {
    fontSize: "14px",
    color: "#1a2a3a",
    fontWeight: "500"
  },
  
  centerSub: {
    fontSize: "12px",
    color: "#6c757d"
  },
  
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    margin: "20px 0",
    textAlign: "center"
  },
  
  detailCard: {
    backgroundColor: "#f8f9fa",
    padding: "12px",
    borderRadius: "10px"
  },
  
  detailLabel: {
    fontSize: "12px",
    color: "#6c757d",
    marginBottom: "5px"
  },
  
  detailValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a2a3a"
  },
  
  gradeSection: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    margin: "25px 0",
    flexWrap: "wrap"
  },
  
  gradeCircle: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    backgroundColor: "#15BE6A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 8px",
    boxShadow: "0 4px 10px rgba(21,190,106,0.3)"
  },
  
  gradeLetter: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff"
  },
  
  gradeLabel: {
    fontSize: "12px",
    color: "#6c757d"
  },
  
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #e9ecef",
    flexWrap: "wrap",
    gap: "20px"
  },
  
  signatureBox: {
    textAlign: "center"
  },
  
  signatureLine: {
    width: "180px",
    height: "2px",
    backgroundColor: "#1a2a3a",
    marginBottom: "8px"
  },
  
  signatureName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a2a3a"
  },
  
  signatureTitle: {
    fontSize: "11px",
    color: "#6c757d"
  },
  
  dateBox: {
    textAlign: "center"
  },
  
  certId: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "11px",
    color: "#adb5bd",
    fontFamily: "monospace"
  },
  
  // Buttons
  actionButtons: {
    padding: "20px 30px",
    backgroundColor: "#fff",
    borderTop: "1px solid #e9ecef",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap"
  },
  
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease"
  },
  
  downloadButton: {
    backgroundColor: "#15BE6A",
    color: "#fff"
  },
  
  printButton: {
    backgroundColor: "#1a2a3a",
    color: "#fff"
  },
  
  shareButton: {
    backgroundColor: "#e9ecef",
    color: "#495057"
  },
  
  backButton: {
    backgroundColor: "#fff",
    color: "#15BE6A",
    border: "1px solid #15BE6A"
  },
  
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "16px"
  },
  
  spinner: {
    animation: "spin 1s linear infinite",
    fontSize: "48px",
    color: "#15BE6A"
  },
  
  toast: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#15BE6A",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    zIndex: 1000,
    animation: "slideIn 0.3s ease"
  }
};

export default function Certificate() {
  const { courseId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const myCoursesIds = useSelector((state) => state.enrollments.myCourses);
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  const [certificateData, setCertificateData] = useState({
    studentName: "",
    courseName: "",
    completionDate: "",
    grade: "A",
    score: 95,
    certificateId: "",
    duration: "40 hours",
    instructor: "FormInnova Team",
    centerName: "",
    centerLocation: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    const foundCourse = courses.find(c => c.id === parseInt(courseId));
    
    if (!foundCourse) {
      navigate("/student/my-courses");
      return;
    }
    
    if (!myCoursesIds.includes(foundCourse.id)) {
      navigate("/courses");
      return;
    }
    
    setCourse(foundCourse);
    
    // Extract center info (handle both object and string)
    let centerName = "FormInnova Learning Center";
    let centerLocation = "Online / Worldwide";
    if (foundCourse.center) {
      if (typeof foundCourse.center === 'object') {
        centerName = foundCourse.center.name || centerName;
        centerLocation = foundCourse.center.location || foundCourse.center.city || centerLocation;
      } else {
        centerName = foundCourse.center;
      }
    }
    
    const completionDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const certificateId = `FIC-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    setCertificateData({
      studentName: user.name || user.username || "Student",
      courseName: foundCourse.title,
      completionDate: completionDate,
      grade: "A",
      score: Math.floor(Math.random() * 20) + 85,
      certificateId: certificateId,
      duration: foundCourse.duration || "40 hours",
      instructor: foundCourse.instructor || "FormInnova Team",
      centerName: centerName,
      centerLocation: centerLocation
    });
    
    setLoading(false);
  }, [courseId, user, myCoursesIds, navigate]);
  
  const handleDownload = () => {
    setToastMessage("Use Print to save as PDF");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    window.print();
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Certificate - ${certificateData.courseName}`,
          text: `I completed ${certificateData.courseName} on FormInnova!`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToastMessage("Link copied!");
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Share error:", error);
    }
  };
  
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <FaSpinner style={styles.spinner} />
        <p>Generating your certificate...</p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.certificateWrapper}>
        <div style={styles.certificate} ref={certificateRef}>
          <div style={styles.decorativeBorder}></div>
          
          {/* Header with logo and badge */}
          <div style={styles.header}>
            <div style={styles.logoArea}>
              <FaGraduationCap style={styles.logoIcon} />
              <span style={styles.instituteText}>FormInnova</span>
            </div>
            <div style={styles.certificateBadge}>
              <FaCertificate style={styles.badgeIcon} />
              <span style={styles.badgeText}>Certificate of Completion</span>
            </div>
          </div>
          
          {/* Title */}
          <div style={styles.titleSection}>
            <div style={styles.certTitle}>CERTIFICATE</div>
            <div style={styles.subTitle}>OF ACHIEVEMENT</div>
          </div>
          
          {/* Student name */}
          <div style={styles.studentInfo}>
            <div style={styles.thisIsToCertify}>This certificate is proudly presented to</div>
            <div style={styles.studentName}>{certificateData.studentName}</div>
            <div style={styles.underline}></div>
          </div>
          
          {/* Completion text + course */}
          <div style={{ textAlign: "center" }}>
            <div style={styles.completionText}>for successfully completing the course</div>
            <div style={styles.courseName}>{certificateData.courseName}</div>
          </div>
          
          {/* Center info (name + location) */}
          <div style={styles.centerInfo}>
            <div style={styles.centerDetail}>
              <FaBuilding style={styles.centerIcon} />
              <div>
                <div style={styles.centerText}>{certificateData.centerName}</div>
                <div style={styles.centerSub}>Education Center</div>
              </div>
            </div>
            <div style={styles.centerDetail}>
              <FaMapMarkerAlt style={styles.centerIcon} />
              <div>
                <div style={styles.centerText}>{certificateData.centerLocation}</div>
                <div style={styles.centerSub}>Location</div>
              </div>
            </div>
          </div>
          
          {/* Details grid: duration, instructor, score */}
          <div style={styles.detailsGrid}>
            <div style={styles.detailCard}>
              <div style={styles.detailLabel}>Duration</div>
              <div style={styles.detailValue}>{certificateData.duration}</div>
            </div>
            <div style={styles.detailCard}>
              <div style={styles.detailLabel}>Instructor</div>
              <div style={styles.detailValue}>{certificateData.instructor}</div>
            </div>
            <div style={styles.detailCard}>
              <div style={styles.detailLabel}>Final Score</div>
              <div style={styles.detailValue}>{certificateData.score}%</div>
            </div>
          </div>
          
          {/* Grade circle */}
          <div style={styles.gradeSection}>
            <div>
              <div style={styles.gradeCircle}>
                <div style={styles.gradeLetter}>{certificateData.grade}</div>
              </div>
              <div style={styles.gradeLabel}>Grade</div>
            </div>
            <div>
              <div style={styles.gradeCircle}>
                <FaAward style={{ fontSize: "32px", color: "#fff" }} />
              </div>
              <div style={styles.gradeLabel}>Honor</div>
            </div>
          </div>
          
          {/* Footer with signature and date */}
          <div style={styles.footer}>
            <div style={styles.signatureBox}>
              <div style={styles.signatureLine}></div>
              <div style={styles.signatureName}>Dr. Sarah Johnson</div>
              <div style={styles.signatureTitle}>Academic Director</div>
            </div>
            <div style={styles.dateBox}>
              <FaCalendarAlt style={{ color: "#15BE6A", marginBottom: "8px" }} />
              <div style={styles.signatureName}>{certificateData.completionDate}</div>
              <div style={styles.signatureTitle}>Date Issued</div>
            </div>
          </div>
          
          {/* Certificate ID */}
          <div style={styles.certId}>
            ID: {certificateData.certificateId}
          </div>
        </div>
        
        {/* Action buttons */}
        <div style={styles.actionButtons}>
          <button onClick={handleDownload} style={{...styles.button, ...styles.downloadButton}}>
            <FaDownload /> Download PDF
          </button>
          <button onClick={handlePrint} style={{...styles.button, ...styles.printButton}}>
            <FaPrint /> Print
          </button>
          <button onClick={handleShare} style={{...styles.button, ...styles.shareButton}}>
            <FaShare /> Share
          </button>
          <button onClick={() => navigate("/student/my-courses")} style={{...styles.button, ...styles.backButton}}>
            Back to Courses
          </button>
        </div>
      </div>
      
      {showToast && (
        <div style={styles.toast}>
          <FaCheckCircle />
          {toastMessage}
        </div>
      )}
      
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          div[style*="certificateWrapper"], 
          div[style*="certificate"], 
          div[style*="certificate"] * {
            visibility: visible;
          }
          div[style*="certificateWrapper"] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none;
          }
          button {
            display: none !important;
          }
          @page {
            size: landscape;
            margin: 0.5cm;
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}