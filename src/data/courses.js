import aiBrain from "../assets/images/Ai Brain.jpg";
import design from "../assets/images/design.jpg";
import data from "../assets/images/data-science.jpg";

import devlogo from "../assets/images/devlogo.jpg";
import designLogo from "../assets/images/design logo.jpg";
import datalogo from "../assets/images/data.jpg";

export const courses = [

/* ===================== 1 ===================== */
{
id: 1,
title: "Complete React Developer",
image: aiBrain,

center: {
  name: "Tech Academy",
  logo: devlogo,
  location: "Casablanca, Morocco",
  description: "Tech Academy is a leading center specialized in modern web development and software enineering.",
  goal: "Train students to become professional developers ready for real-world jobs."
},

instructor: "Sarah Johnson",
category: "development",
level: "beginner",
rating: 4.8,
reviews: "2.1k",
duration: "18h",
price: 49,

description:
"Learn React from scratch and build powerful web applications. This course includes hands-on projects and real-world examples.",

modules: [
{
  title: "Introduction to React",
  lessons: [
    "What is React?",
    "Setup Environment",
    "Create First App"
  ]
},
{
  title: "React Basics",
  lessons: [
    "Components",
    "Props",
    "State"
  ]
},
{
  title: "Advanced React",
  lessons: [
    "Hooks",
    "Routing",
    "API Integration"
  ]
}
]

},

/* ===================== 2 ===================== */
{
id: 2,
title: "UI/UX Design Masterclass",
image: design,

center: {
  name: "Design School",
  logo: designLogo,
  location: "Rabat, Morocco",
  description: "Design School focuses on creative design and user experience training.",
  goal: "Help students become professional UI/UX designers with practical skills."
},

instructor: "Michael Brown",
category: "design",
level: "intermediate",
rating: 4.7,
reviews: "1.6k",
duration: "15h",
price: 59,

description:
"Master UI/UX design principles and create beautiful and user-friendly interfaces using modern tools.",

modules: [
{
  title: "Design Fundamentals",
  lessons: [
    "Introduction to UI/UX",
    "Color Theory",
    "Typography"
  ]
},
{
  title: "User Experience",
  lessons: [
    "User Research",
    "Wireframing",
    "Prototyping"
  ]
},
{
  title: "Advanced Design",
  lessons: [
    "Figma Tools",
    "Design Systems",
    "Real Project"
  ]
}
]

},

/* ===================== 3 ===================== */
{
id: 3,
title: "Data Science with POO",
image: data,

center: {
  name: "AI Institute",
  logo: datalogo,
  location: "Marrakech, Morocco",
  description: "AI Institute specializes in data science, machine learning, and artificial intelligence.",
  goal: "Prepare students to work as data scientists using real datasets and tools."
},

instructor: "Salim Miller",
category: "data-science",
level: "advanced",
rating: 4.9,
reviews: "3.2k",
duration: "22h",
price: 79,

description:
"Learn data science with Python, including data analysis, visualization, and machine learning techniques.",

modules: [
{
  title: "POO Basics",
  lessons: [
    "POO Introduction",
    "Data Types",
    "Libraries Overview"
  ]
},
{
  title: "Data Analysis",
  lessons: [
    "Pandas",
    "Data Cleaning",
    "Visualization"
  ]
},
{
  title: "Machine Learning",
  lessons: [
    "Supervised Learning",
    "Unsupervised Learning",
    "Final Project"
  ]
}
]

},
{
  id: 4,
  title: "Advanced Machine Learning",
  image: datalogo,

  center: {
    name: "AI Institute",
    logo: datalogo,
    location: "Casablanca, Morocco",
    description: "AI Institute focuses on advanced AI and machine learning training.",
    goal: "Train students to build and deploy advanced ML models in real-world scenarios."
  },

  instructor: "Nadia El Amrani",
  category: "machine-learning",
  level: "advanced",
  rating: 4.8,
  reviews: "2.1k",
  duration: "25h",
  price: 99,

  description:
    "Deep dive into advanced machine learning techniques including neural networks, optimization, and model deployment.",

  modules: [
    {
      title: "Neural Networks",
      lessons: [
        "Perceptron",
        "Activation Functions",
        "Backpropagation"
      ]
    },
    {
      title: "Model Optimization",
      lessons: [
        "Loss Functions",
        "Gradient Descent",
        "Regularization"
      ]
    },
    {
      title: "Deployment",
      lessons: [
        "Model Saving",
        "APIs with Flask",
        "Production Basics"
      ]
    }
  ]
},
{
  id: 6,
  title: "Full Stack Web Development",
  image: aiBrain,

  center: {
    name: "Code Academy",
    logo: datalogo,
    location: "Rabat, Morocco",
    description: "Code Academy provides full-stack web development training.",
    goal: "Enable students to build complete web applications from frontend to backend."
  },

  instructor: "Omar Benali",
  category: "web-development",
  level: "intermediate",
  rating: 4.7,
  reviews: "4.5k",
  duration: "30h",
  price: 89,

  description:
    "Learn how to build modern full-stack web applications using React, Node.js, and databases.",

  modules: [
    {
      title: "Frontend Development",
      lessons: [
        "HTML & CSS",
        "JavaScript ES6",
        "React Basics"
      ]
    },
    {
      title: "Backend Development",
      lessons: [
        "Node.js",
        "Express.js",
        "REST APIs"
      ]
    },
    {
      title: "Database & Deployment",
      lessons: [
        "MongoDB",
        "Authentication",
        "Deployment"
      ]
    }
  ]
}


];