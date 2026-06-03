const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Admin = require('./models/Admin');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Admin.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const admin = new Admin({
      username: 'admin',
      password: adminPassword
    });
    await admin.save();
    console.log('👤 Admin created (username: admin)');

    // Seed projects
    const projects = [
      {
        title: 'AI-Powered Code Review System',
        description: 'An intelligent code review platform that uses GPT-4 and AST parsing to automatically analyze pull requests, detect bugs, and suggest improvements in real-time.',
        longDescription: 'Built a production-grade code review automation tool that integrates with GitHub webhooks. Uses abstract syntax tree parsing combined with large language models to provide contextual code review comments. Features include security vulnerability detection, code smell identification, and automated documentation generation.',
        techStack: ['Python', 'FastAPI', 'OpenAI API', 'React', 'PostgreSQL', 'Docker', 'Redis'],
        category: 'ai-ml',
        image: '',
        githubUrl: 'https://github.com/duha/ai-code-review',
        liveUrl: 'https://ai-review-demo.vercel.app',
        featured: true,
        order: 1
      },
      {
        title: 'SafarLink — Travel Companion App',
        description: 'A full-stack travel planning platform with real-time collaboration, AI-powered itinerary suggestions, and interactive maps for group trip planning.',
        longDescription: 'Developed a comprehensive travel companion application featuring real-time collaborative trip planning, AI-generated itineraries based on user preferences and budget, interactive maps with point-of-interest discovery, expense splitting among travelers, and offline access to saved itineraries.',
        techStack: ['Next.js', 'TypeScript', 'MongoDB', 'Socket.io', 'Mapbox GL', 'TailwindCSS'],
        category: 'fullstack',
        image: '',
        githubUrl: 'https://github.com/duha/safarlink',
        liveUrl: 'https://safarlink.vercel.app',
        featured: true,
        order: 2
      },
      {
        title: 'Neural Style Transfer Studio',
        description: 'A web application that applies artistic neural style transfer to images using deep learning, with real-time preview and batch processing capabilities.',
        longDescription: 'Created an interactive web application using TensorFlow.js for client-side neural style transfer. Features include real-time style preview with WebGL acceleration, custom style training from user-uploaded artworks, batch processing queue, and a gallery of pre-trained artistic styles.',
        techStack: ['TensorFlow.js', 'React', 'Python', 'Flask', 'WebGL', 'AWS S3'],
        category: 'ai-ml',
        image: '',
        githubUrl: 'https://github.com/duha/style-transfer',
        liveUrl: 'https://style-studio-demo.vercel.app',
        featured: true,
        order: 3
      },
      {
        title: 'Real-Time Stock Analytics Dashboard',
        description: 'A high-performance dashboard for real-time stock market analysis with predictive modeling, sentiment analysis from news feeds, and customizable alerts.',
        longDescription: 'Built a real-time financial analytics platform that streams live market data via WebSocket connections. Features ML-based price prediction using LSTM networks, NLP-powered sentiment analysis of financial news, custom alert systems, portfolio tracking, and interactive charting with technical indicators.',
        techStack: ['React', 'D3.js', 'Node.js', 'WebSocket', 'Python', 'TensorFlow', 'Redis'],
        category: 'fullstack',
        image: '',
        githubUrl: 'https://github.com/duha/stock-analytics',
        liveUrl: 'https://stock-dash-demo.vercel.app',
        featured: false,
        order: 4
      },
      {
        title: 'Distributed Chat System',
        description: 'A scalable real-time messaging platform with end-to-end encryption, file sharing, video calls, and support for 10K+ concurrent connections.',
        longDescription: 'Designed and implemented a distributed chat system using microservices architecture. Features include end-to-end encryption using the Signal protocol, real-time messaging with Redis Pub/Sub, file sharing with CDN integration, WebRTC video calling, message search with Elasticsearch, and horizontal scaling with Kubernetes.',
        techStack: ['Node.js', 'Socket.io', 'React', 'Redis', 'Kubernetes', 'WebRTC', 'MongoDB'],
        category: 'backend',
        image: '',
        githubUrl: 'https://github.com/duha/distributed-chat',
        liveUrl: '',
        featured: false,
        order: 5
      },
      {
        title: 'ML Playground — Interactive Visualizer',
        description: 'An educational web app for visualizing machine learning algorithms in real-time, featuring interactive dataset creation and step-by-step algorithm animations.',
        longDescription: 'Created an interactive machine learning education platform where users can draw custom datasets, select algorithms (SVM, KNN, Decision Trees, Neural Networks), and watch the training process animate in real-time. Features include adjustable hyperparameters, decision boundary visualization, and exportable trained models.',
        techStack: ['JavaScript', 'Canvas API', 'Python', 'scikit-learn', 'Flask', 'WebSocket'],
        category: 'ai-ml',
        image: '',
        githubUrl: 'https://github.com/duha/ml-playground',
        liveUrl: 'https://ml-playground-demo.vercel.app',
        featured: true,
        order: 6
      }
    ];

    await Project.insertMany(projects);
    console.log(`📦 ${projects.length} projects seeded`);

    console.log('\n✅ Seed completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin Login:');
    console.log('  Username: admin');
    console.log(`  Password: ${adminPassword}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedData();
