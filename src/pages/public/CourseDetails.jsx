import { Navigate, useNavigate, useParams } from "react-router-dom";
import { courses } from "../../data/courses";
import { FaStar, FaClock, FaMapMarkerAlt, FaUser, FaBookOpen, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse } from "../../features/enrollments/enrollmentSlice";

export default function CourseDetails(){

  const { id } = useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const course = courses.find(c => c.id === parseInt(id));
  
  if(!course){
    return <h2 style={{textAlign:"center", padding: "4rem", color: "#666"}}>Course not found</h2>
  }
  
  

  return(
    <div style={styles.container} >
      {/* Hero Section with Image */}
      <div style={styles.heroSection}>
        <div style={styles.imageWrapper}>
          <img 
            src={course.image} 
            alt={course.title} 
            style={styles.image}
          />
          <div style={styles.imageOverlay}></div>
          <div style={styles.imageContent}>
            <h1 style={styles.title}>{course.title}</h1>
            <div style={styles.badge}>{course.level}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Center Info Card */}
        <div style={styles.centerCard}>
          <div style={styles.centerHeader}>
            <img 
              src={course.center.logo || "https://img.icons8.com/color/48/000000/school.png"} 
              alt={course.center.name} 
              style={styles.logo}
            />
            <div style={styles.centerInfo}>
              <h3 style={styles.centerName}>{course.center.name}</h3>
              <p style={styles.location}>
                <FaMapMarkerAlt style={styles.locationIcon} /> {course.center.location}
              </p>
            </div>
          </div>
          <p style={styles.centerDesc}>{course.center.description}</p>
          <p style={styles.goal}>
            <span style={styles.goalLabel}>🎯 Goal:</span> {course.center.goal}
          </p>
        </div>

        {/* Course Stats */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <FaStar style={styles.statIconStar} />
            <div>
              <h4 style={styles.statValue}>{course.rating}</h4>
              <p style={styles.statLabel}>Rating ({course.reviews} reviews)</p>
            </div>
          </div>
          <div style={styles.statCard}>
            <FaClock style={styles.statIcon} />
            <div>
              <h4 style={styles.statValue}>{course.duration}</h4>
              <p style={styles.statLabel}>Duration</p>
            </div>
          </div>
          <div style={styles.statCard}>
            <FaUser style={styles.statIcon} />
            <div>
              <h4 style={styles.statValue}>{course.instructor}</h4>
              <p style={styles.statLabel}>Instructor</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={styles.descriptionSection}>
          <h2 style={styles.sectionTitle}>About This Course</h2>
          <p style={styles.description}>{course.description}</p>
        </div>

        {/* Modules Section */}
        <div style={styles.modulesSection}>
          <h2 style={styles.sectionTitle}>
            <FaBookOpen style={styles.sectionIcon} /> Course Content
          </h2>
          <div style={styles.modulesList}>
            {course.modules.map((module, index)=>(
              <div key={index} style={styles.moduleCard}>
                <div style={styles.moduleHeader}>
                  <div style={styles.moduleNumber}>{index + 1}</div>
                  <h3 style={styles.moduleTitle}>{module.title}</h3>
                </div>
                <ul style={styles.lessonsList}>
                  {module.lessons.map((lesson, i)=>(
                    <li key={i} style={styles.lessonItem} onClick={() => navigate(`/student/learn/${course.id}/${i}`)}>
                      <FaCheckCircle style={styles.lessonIcon} />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with Price and Enroll Button */}
        <div style={styles.footer}>
          <div style={styles.priceContainer}>
            <h2 style={styles.price}>${course.price}</h2>
            <p style={styles.priceNote}>One-time payment • Lifetime access</p>
          </div>
        </div>
      </div>
      <button 
    onClick={() => navigate(`/certificate/${course.id}`)}
    style={{
      ...styles.enrollLink,
      backgroundColor: "#15BE6A",
      color: "#fff"
    }}
  >
     View Certificate
  </button>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    minHeight: '100vh'
  },

  // Hero Section
  heroSection: {
    width: '100%',
    marginBottom: '2rem'
  },
  imageWrapper: {
    position: 'relative',
    height: '450px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)'
  },
  imageContent: {
    position: 'absolute',
    bottom: '3rem',
    left: '3rem',
    color: 'white'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    lineHeight: '1.3',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#15BE6A',
    color: 'white',
    padding: '0.5rem 1.5rem',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },

  // Main Content
  mainContent: {
    padding: '0 3rem 3rem 3rem'
  },

  // Center Card
  centerCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid #f0f0f0'
  },
  centerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  logo: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    objectFit: 'cover'
  },
  centerInfo: {
    flex: 1
  },
  centerName: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '0.3rem',
    fontWeight: '600'
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#666',
    fontSize: '0.9rem'
  },
  locationIcon: {
    color: '#15BE6A',
    fontSize: '0.8rem'
  },
  centerDesc: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '1rem',
    fontSize: '0.95rem'
  },
  goal: {
    color: '#333',
    fontSize: '1rem',
    padding: '0.8rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    borderLeft: `3px solid #15BE6A`
  },
  goalLabel: {
    fontWeight: '700',
    color: '#15BE6A'
  },

  // Stats Container
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    marginBottom: '2.5rem'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  statIcon: {
    fontSize: '2rem',
    color: '#15BE6A'
  },
  statIconStar: {
    fontSize: '2rem',
    color: '#FFD700'
  },
  statValue: {
    fontSize: '1.2rem',
    color: '#333',
    fontWeight: '700',
    marginBottom: '0.2rem'
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#888'
  },

  // Description Section
  descriptionSection: {
    marginBottom: '2.5rem'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '1.5rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  sectionIcon: {
    fontSize: '1.5rem',
    color: '#15BE6A'
  },
  description: {
    color: '#666',
    lineHeight: '1.8',
    fontSize: '1.05rem'
  },

  // Modules Section
  modulesSection: {
    marginBottom: '2.5rem'
  },
  modulesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  moduleCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  },
  moduleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f0f0f0'
  },
  moduleNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#15BE6A',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: '700'
  },
  moduleTitle: {
    fontSize: '1.2rem',
    color: '#333',
    fontWeight: '600',
    margin: 0
  },
  lessonsList: {
    listStyle: 'none',
    padding: '1.5rem',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  lessonItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.5rem',
    color: '#666',
    fontSize: '0.95rem',
    borderBottom: '1px solid #f0f0f0',
    transition: 'all 0.3s ease'
  },
  lessonIcon: {
    color: '#15BE6A',
    fontSize: '0.9rem'
  },

  // Footer
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    marginTop: '2rem',
    flexWrap: 'wrap',
    gap: '1.5rem'
  },
  priceContainer: {
    textAlign: 'left'
  },
  price: {
    fontSize: '2.5rem',
    color: '#15BE6A',
    fontWeight: '700',
    marginBottom: '0.3rem'
  },
  priceNote: {
    fontSize: '0.9rem',
    color: '#888'
  },
  enrollBtn: {
    backgroundColor: '#15BE6A',
    color: 'white',
    border: 'none',
    padding: '1rem 2.5rem',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(21, 190, 106, 0.3)'
  },
  btnIcon: {
    fontSize: '1rem'
  },

  // Hover Effects
  '@media (hover: hover)': {
    statCard: {
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }
    },
    moduleCard: {
      '&:hover': {
        boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
      }
    },
    lessonItem: {
      '&:hover': {
        transform: 'translateX(5px)',
        color: '#15BE6A'
      }
    },
    enrollBtn: {
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(21, 190, 106, 0.4)'
      }
    }
  },

  // Responsive Design
  '@media (max-width: 768px)': {
    imageWrapper: {
      height: '300px'
    },
    imageContent: {
      left: '1.5rem',
      bottom: '1.5rem'
    },
    title: {
      fontSize: '1.8rem'
    },
    mainContent: {
      padding: '0 1.5rem 1.5rem 1.5rem'
    },
    statsContainer: {
      gridTemplateColumns: '1fr',
      gap: '1rem'
    },
    statCard: {
      padding: '1rem'
    },
    footer: {
      flexDirection: 'column',
      textAlign: 'center'
    },
    priceContainer: {
      textAlign: 'center'
    },
    enrollBtn: {
      width: '100%',
      justifyContent: 'center'
    }
  }
};