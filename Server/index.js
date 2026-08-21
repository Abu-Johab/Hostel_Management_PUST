import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import user routes
import userRoutes from './src/routes/user.route.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // your frontend
}));

// MongoDB connection
const mongoURI = "mongodb+srv://abujohabcsepust:rTJiyVNeDsiGiqul@cluster0.ofxe4mf.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api', userRoutes); // 👈 All user-related routes start with /api

// Test routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/home', (req, res) => {
  res.send('Hello World home!');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
