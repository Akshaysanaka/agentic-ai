import { Router } from 'express'
import { Profile } from '../models/Profile.js'

const router = Router()

// Seed profiles from mock data - all 60 people
router.post('/profiles', async (req, res) => {
  try {
    const mk = (name, email, affiliation, expertise, location, projectTitle = 'Project 1', projectDesc = 'Research project in the field.') => ({
      name, email, affiliation, expertise, location, 
      projects: [{ title: projectTitle, description: projectDesc }]
    })

    const mockPeople = [
      mk('Aarav Sharma', 'aarav.sharma@iitb.ac.in', 'IIT Bombay', ['AI/ML', 'Systems'], 'Mumbai, India', 'AI Research Project', 'Advanced machine learning research in neural networks and deep learning applications.'),
      mk('Aditi Rao', 'aditi.rao@iisc.ac.in', 'IISc Bangalore', ['Bio', 'NLP'], 'Bengaluru, India', 'Bioinformatics NLP', 'Natural language processing for biological data analysis.'),
      mk('Aditya Singh', 'aditya.singh@iitd.ac.in', 'IIT Delhi', ['Robotics', 'AI/ML'], 'New Delhi, India', 'Robotic AI Systems', 'Intelligent robotic systems powered by machine learning.'),
      mk('Akanksha Gupta', 'akanksha.gupta@iitk.ac.in', 'IIT Kanpur', ['HCI', 'NLP'], 'Kanpur, India', 'Human-Computer Interaction', 'Designing intuitive interfaces with NLP capabilities.'),
      mk('Akshay Patel', 'akshay.patel@iitm.ac.in', 'IIT Madras', ['AI/ML', 'Security'], 'Chennai, India', 'Secure ML Systems', 'Machine learning with security and privacy considerations.'),
      mk('Aman Verma', 'aman.verma@iitkgp.ac.in', 'IIT Kharagpur', ['CV', 'AI/ML'], 'Kharagpur, India', 'Computer Vision AI', 'Advanced computer vision using deep learning techniques.'),
      mk('Amrita Nair', 'amrita.nair@iisc.ac.in', 'IISc Bangalore', ['Bio', 'Data'], 'Bengaluru, India'),
      mk('Ananya Mukherjee', 'ananya.mukherjee@iitb.ac.in', 'IIT Bombay', ['AI/ML', 'NLP', 'IR'], 'Mumbai, India', 'Agentic Research Assistant', 'Intelligent research assistant system using AI and NLP for information retrieval.'),
      mk('Anil Kumar', 'anil.kumar@iitr.ac.in', 'IIT Roorkee', ['CV', 'Robotics'], 'Roorkee, India'),
      mk('Anisha Reddy', 'anisha.reddy@iiith.ac.in', 'IIIT Hyderabad', ['Security', 'Systems'], 'Hyderabad, India'),
      mk('Ankit Joshi', 'ankit.joshi@iitb.ac.in', 'IIT Bombay', ['Data', 'Analytics'], 'Mumbai, India'),
      mk('Arjun Mehta', 'arjun.mehta@iima.ac.in', 'IIM Ahmedabad', ['Analytics', 'Economics'], 'Ahmedabad, India'),
      mk('Asha Menon', 'asha.menon@iisc.ac.in', 'IISc Bangalore', ['HCI', 'Design'], 'Bengaluru, India'),
      mk('Ashwin Rao', 'ashwin.rao@iitm.ac.in', 'IIT Madras', ['Systems', 'Networks'], 'Chennai, India'),
      mk('Avani Desai', 'avani.desai@iitd.ac.in', 'IIT Delhi', ['Policy', 'AI/ML'], 'New Delhi, India'),
      mk('Bhavna Shah', 'bhavna.shah@iitb.ac.in', 'IIT Bombay', ['Bio', 'Data'], 'Mumbai, India'),
      mk('Deepak Garg', 'deepak.garg@iitk.ac.in', 'IIT Kanpur', ['Security', 'AI/ML'], 'Kanpur, India'),
      mk('Devika Iyer', 'devika.iyer@iisc.ac.in', 'IISc Bangalore', ['Bio', 'NLP'], 'Bengaluru, India'),
      mk('Dhruv Kapoor', 'dhruv.kapoor@iitd.ac.in', 'IIT Delhi', ['Robotics', 'CV'], 'New Delhi, India'),
      mk('Divya Sinha', 'divya.sinha@iitb.ac.in', 'IIT Bombay', ['AI/ML', 'IR'], 'Mumbai, India'),
      mk('Esha Chatterjee', 'esha.chatterjee@iisc.ac.in', 'IISc Bangalore', ['Data', 'HCI'], 'Bengaluru, India'),
      mk('Gaurav Kulkarni', 'gaurav.kulkarni@iitb.ac.in', 'IIT Bombay', ['Systems', 'Networks'], 'Mumbai, India'),
      mk('Geeta Bhat', 'geeta.bhat@iisc.ac.in', 'IISc Bangalore', ['Bio', 'AI/ML'], 'Bengaluru, India'),
      mk('Harshad Kulkarni', 'harshad.kulkarni@iitm.ac.in', 'IIT Madras', ['CV', 'AI/ML'], 'Chennai, India'),
      mk('Isha Singh', 'isha.singh@iitkgp.ac.in', 'IIT Kharagpur', ['NLP', 'IR'], 'Kharagpur, India'),
      mk('Jaya Nair', 'jaya.nair@iisc.ac.in', 'IISc Bangalore', ['Bio', 'Analytics'], 'Bengaluru, India'),
      mk('Karan Malhotra', 'karan.malhotra@iitd.ac.in', 'IIT Delhi', ['Security', 'Systems'], 'New Delhi, India'),
      mk('Kavya Prasad', 'kavya.prasad@iitb.ac.in', 'IIT Bombay', ['HCI', 'Design'], 'Mumbai, India'),
      mk('Krishna Reddy', 'krishna.reddy@iiith.ac.in', 'IIIT Hyderabad', ['AI/ML', 'Robotics'], 'Hyderabad, India'),
      mk('Lakshmi Subramanian', 'lakshmi.subramanian@iitm.ac.in', 'IIT Madras', ['Bio', 'Data'], 'Chennai, India'),
      mk('Manish Tiwari', 'manish.tiwari@iitk.ac.in', 'IIT Kanpur', ['Systems', 'Networks'], 'Kanpur, India'),
      mk('Meera Pillai', 'meera.pillai@iisc.ac.in', 'IISc Bangalore', ['Policy', 'Ethics'], 'Bengaluru, India'),
      mk('Mohit Chopra', 'mohit.chopra@iitd.ac.in', 'IIT Delhi', ['AI/ML', 'CV'], 'New Delhi, India'),
      mk('Nandini Roy', 'nandini.roy@iitb.ac.in', 'IIT Bombay', ['Data', 'Analytics'], 'Mumbai, India'),
      mk('Neeraj Gupta', 'neeraj.gupta@iitkgp.ac.in', 'IIT Kharagpur', ['Security', 'IR'], 'Kharagpur, India'),
      mk('Nisha Agarwal', 'nisha.agarwal@iisc.ac.in', 'IISc Bangalore', ['HCI', 'NLP'], 'Bengaluru, India'),
      mk('Omkar Deshmukh', 'omkar.deshmukh@iitb.ac.in', 'IIT Bombay', ['Robotics', 'AI/ML'], 'Mumbai, India'),
      mk('Pallavi Joshi', 'pallavi.joshi@iitd.ac.in', 'IIT Delhi', ['Design', 'HCI'], 'New Delhi, India'),
      mk('Parth Shah', 'parth.shah@iitm.ac.in', 'IIT Madras', ['AI/ML', 'Systems'], 'Chennai, India'),
      mk('Priya Kapoor', 'priya.kapoor@iisc.ac.in', 'IISc Bangalore', ['Bio', 'CV'], 'Bengaluru, India'),
      mk('Rahul Jain', 'rahul.jain@iitb.ac.in', 'IIT Bombay', ['NLP', 'AI/ML'], 'Mumbai, India'),
      mk('Rakesh Bansal', 'rakesh.bansal@iitd.ac.in', 'IIT Delhi', ['Systems', 'Security'], 'New Delhi, India'),
      mk('Riya Sen', 'riya.sen@iisc.ac.in', 'IISc Bangalore', ['Policy', 'AI/ML'], 'Bengaluru, India'),
      mk('Rohit Anand', 'rohit.anand@iitkgp.ac.in', 'IIT Kharagpur', ['CV', 'Data'], 'Kharagpur, India'),
      mk('Sagar Sinha', 'sagar.sinha@iitb.ac.in', 'IIT Bombay', ['IR', 'NLP'], 'Mumbai, India'),
      mk('Sakshi Verma', 'sakshi.verma@iitd.ac.in', 'IIT Delhi', ['AI/ML', 'HCI'], 'New Delhi, India'),
      mk('Sameer Khan', 'sameer.khan@iitm.ac.in', 'IIT Madras', ['Security', 'Systems'], 'Chennai, India'),
      mk('Sanjana Ghosh', 'sanjana.ghosh@iiith.ac.in', 'IIIT Hyderabad', ['CV', 'AI/ML'], 'Hyderabad, India'),
      mk('Santosh Yadav', 'santosh.yadav@iitk.ac.in', 'IIT Kanpur', ['Robotics', 'Systems'], 'Kanpur, India'),
      mk('Shalini Kaur', 'shalini.kaur@iisc.ac.in', 'IISc Bangalore', ['Bio', 'Ethics'], 'Bengaluru, India'),
      mk('Shashi Reddy', 'shashi.reddy@iitb.ac.in', 'IIT Bombay', ['IR', 'AI/ML'], 'Mumbai, India'),
      mk('Shruti Nair', 'shruti.nair@iitd.ac.in', 'IIT Delhi', ['NLP', 'Data'], 'New Delhi, India'),
      mk('Siddharth Mishra', 'siddharth.mishra@iitm.ac.in', 'IIT Madras', ['AI/ML', 'Robotics'], 'Chennai, India'),
      mk('Sneha Bose', 'sneha.bose@iisc.ac.in', 'IISc Bangalore', ['HCI', 'Design'], 'Bengaluru, India'),
      mk('Sonia Bhattacharya', 'sonia.bhattacharya@iitkgp.ac.in', 'IIT Kharagpur', ['Policy', 'Data'], 'Kharagpur, India'),
      mk('Sudhir Rao', 'sudhir.rao@iitb.ac.in', 'IIT Bombay', ['Systems', 'Networks'], 'Mumbai, India'),
      mk('Supriya Menon', 'supriya.menon@iisc.ac.in', 'IISc Bangalore', ['Bio', 'AI/ML'], 'Bengaluru, India'),
      mk('Tanvi Deshpande', 'tanvi.deshpande@iitd.ac.in', 'IIT Delhi', ['CV', 'HCI'], 'New Delhi, India'),
      mk('Uday Kulkarni', 'uday.kulkarni@iitm.ac.in', 'IIT Madras', ['IR', 'Systems'], 'Chennai, India'),
      mk('Varun Saxena', 'varun.saxena@iiith.ac.in', 'IIIT Hyderabad', ['AI/ML', 'Security'], 'Hyderabad, India'),
    ]

    const results = []
    for (const person of mockPeople) {
      const existing = await Profile.findOne({ email: person.email })
      if (!existing) {
        const profile = await Profile.create(person)
        results.push({ created: true, name: profile.name })
      } else {
        results.push({ created: false, name: existing.name, message: 'Already exists' })
      }
    }

    res.json({ 
      message: 'Seed completed', 
      total: mockPeople.length,
      results 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

