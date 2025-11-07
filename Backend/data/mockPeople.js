// Mock people data for backend seeding - now synced with MongoDB Atlas
// This is used for seeding the database with initial data
// Note: AI agents now use MongoDB Atlas directly for dynamic operations

const longProjectDescription = `Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8\nLine 9\nLine 10\nLine 11\nLine 12\nLine 13\nLine 14\nLine 15\nLine 16\nLine 17\nLine 18\nLine 19\nLine 20\nLine 21\nLine 22\nLine 23\nLine 24\nLine 25\nLine 26\nLine 27\nLine 28\nLine 29\nLine 30\nLine 31\nLine 32\nLine 33\nLine 34\nLine 35\nLine 36\nLine 37\nLine 38\nLine 39\nLine 40\nLine 41\nLine 42\nLine 43\nLine 44\nLine 45\nLine 46\nLine 47\nLine 48\nLine 49\nLine 50\nLine 51\nLine 52\nLine 53\nLine 54\nLine 55\nLine 56\nLine 57\nLine 58\nLine 59\nLine 60\nLine 61\nLine 62\nLine 63\nLine 64\nLine 65\nLine 66\nLine 67\nLine 68\nLine 69\nLine 70\nLine 71\nLine 72\nLine 73\nLine 74\nLine 75\nLine 76\nLine 77\nLine 78\nLine 79\nLine 80\nLine 81\nLine 82\nLine 83\nLine 84\nLine 85\nLine 86\nLine 87\nLine 88\nLine 89\nLine 90\nLine 91\nLine 92\nLine 93\nLine 94\nLine 95\nLine 96\nLine 97\nLine 98\nLine 99\nLine 100\nLine 101\nLine 102\nLine 103\nLine 104\nLine 105`;

const mk = (id, name, email, affiliation, expertise, location) => ({
  id, name, email, affiliation, expertise, location, projects: [{ title: 'Project 1', description: 'Short description' }]
})

const people = [
  mk('1','Aarav Sharma','aarav.sharma@iitb.ac.in','IIT Bombay',['AI/ML','Systems'],'Mumbai, India'),
  mk('2','Aditi Rao','aditi.rao@iisc.ac.in','IISc Bangalore',['Bio','NLP'],'Bengaluru, India'),
  mk('3','Aditya Singh','aditya.singh@iitd.ac.in','IIT Delhi',['Robotics','AI/ML'],'New Delhi, India'),
  mk('4','Akanksha Gupta','akanksha.gupta@iitk.ac.in','IIT Kanpur',['HCI','NLP'],'Kanpur, India'),
  mk('5','Akshay Patel','akshay.patel@iitm.ac.in','IIT Madras',['AI/ML','Security'],'Chennai, India'),
  mk('6','Aman Verma','aman.verma@iitkgp.ac.in','IIT Kharagpur',['CV','AI/ML'],'Kharagpur, India'),
  mk('7','Amrita Nair','amrita.nair@iisc.ac.in','IISc Bangalore',['Bio','Data'],'Bengaluru, India'),
  { id: '8', name: 'Ananya Mukherjee', email: 'ananya.mukherjee@iitb.ac.in', affiliation: 'IIT Bombay', expertise: ['AI/ML','NLP','IR'], location: 'Mumbai, India', projects: [{ title: 'Agentic Research Assistant', description: longProjectDescription }] },
  mk('9','Anil Kumar','anil.kumar@iitr.ac.in','IIT Roorkee',['CV','Robotics'],'Roorkee, India'),
  mk('10','Anisha Reddy','anisha.reddy@iiith.ac.in','IIIT Hyderabad',['Security','Systems'],'Hyderabad, India'),
  mk('11','Ankit Joshi','ankit.joshi@iitb.ac.in','IIT Bombay',['Data','Analytics'],'Mumbai, India'),
  mk('12','Arjun Mehta','arjun.mehta@iima.ac.in','IIM Ahmedabad',['Analytics','Economics'],'Ahmedabad, India'),
  mk('13','Asha Menon','asha.menon@iisc.ac.in','IISc Bangalore',['HCI','Design'],'Bengaluru, India'),
  mk('14','Ashwin Rao','ashwin.rao@iitm.ac.in','IIT Madras',['Systems','Networks'],'Chennai, India'),
  mk('15','Avani Desai','avani.desai@iitd.ac.in','IIT Delhi',['Policy','AI/ML'],'New Delhi, India'),
  mk('16','Bhavna Shah','bhavna.shah@iitb.ac.in','IIT Bombay',['Bio','Data'],'Mumbai, India'),
  mk('17','Deepak Garg','deepak.garg@iitk.ac.in','IIT Kanpur',['Security','AI/ML'],'Kanpur, India'),
  mk('18','Devika Iyer','devika.iyer@iisc.ac.in','IISc Bangalore',['Bio','NLP'],'Bengaluru, India'),
  mk('19','Dhruv Kapoor','dhruv.kapoor@iitd.ac.in','IIT Delhi',['Robotics','CV'],'New Delhi, India'),
  mk('20','Divya Sinha','divya.sinha@iitb.ac.in','IIT Bombay',['AI/ML','IR'],'Mumbai, India'),
  mk('21','Esha Chatterjee','esha.chatterjee@iisc.ac.in','IISc Bangalore',['Data','HCI'],'Bengaluru, India'),
  mk('22','Gaurav Kulkarni','gaurav.kulkarni@iitb.ac.in','IIT Bombay',['Systems','Networks'],'Mumbai, India'),
  mk('23','Geeta Bhat','geeta.bhat@iisc.ac.in','IISc Bangalore',['Bio','AI/ML'],'Bengaluru, India'),
  mk('24','Harshad Kulkarni','harshad.kulkarni@iitm.ac.in','IIT Madras',['CV','AI/ML'],'Chennai, India'),
  mk('25','Isha Singh','isha.singh@iitkgp.ac.in','IIT Kharagpur',['NLP','IR'],'Kharagpur, India'),
  mk('26','Jaya Nair','jaya.nair@iisc.ac.in','IISc Bangalore',['Bio','Analytics'],'Bengaluru, India'),
  mk('27','Karan Malhotra','karan.malhotra@iitd.ac.in','IIT Delhi',['Security','Systems'],'New Delhi, India'),
  mk('28','Kavya Prasad','kavya.prasad@iitb.ac.in','IIT Bombay',['HCI','Design'],'Mumbai, India'),
  mk('29','Krishna Reddy','krishna.reddy@iiith.ac.in','IIIT Hyderabad',['AI/ML','Robotics'],'Hyderabad, India'),
  mk('30','Lakshmi Subramanian','lakshmi.subramanian@iitm.ac.in','IIT Madras',['Bio','Data'],'Chennai, India'),
  mk('31','Manish Tiwari','manish.tiwari@iitk.ac.in','IIT Kanpur',['Systems','Networks'],'Kanpur, India'),
  mk('32','Meera Pillai','meera.pillai@iisc.ac.in','IISc Bangalore',['Policy','Ethics'],'Bengaluru, India'),
  mk('33','Mohit Chopra','mohit.chopra@iitd.ac.in','IIT Delhi',['AI/ML','CV'],'New Delhi, India'),
  mk('34','Nandini Roy','nandini.roy@iitb.ac.in','IIT Bombay',['Data','Analytics'],'Mumbai, India'),
  mk('35','Neeraj Gupta','neeraj.gupta@iitkgp.ac.in','IIT Kharagpur',['Security','IR'],'Kharagpur, India'),
  mk('36','Nisha Agarwal','nisha.agarwal@iisc.ac.in','IISc Bangalore',['HCI','NLP'],'Bengaluru, India'),
  mk('37','Omkar Deshmukh','omkar.deshmukh@iitb.ac.in','IIT Bombay',['Robotics','AI/ML'],'Mumbai, India'),
  mk('38','Pallavi Joshi','pallavi.joshi@iitd.ac.in','IIT Delhi',['Design','HCI'],'New Delhi, India'),
  mk('39','Parth Shah','parth.shah@iitm.ac.in','IIT Madras',['AI/ML','Systems'],'Chennai, India'),
  mk('40','Priya Kapoor','priya.kapoor@iisc.ac.in','IISc Bangalore',['Bio','CV'],'Bengaluru, India'),
  mk('41','Rahul Jain','rahul.jain@iitb.ac.in','IIT Bombay',['NLP','AI/ML'],'Mumbai, India'),
  mk('42','Rakesh Bansal','rakesh.bansal@iitd.ac.in','IIT Delhi',['Systems','Security'],'New Delhi, India'),
  mk('43','Riya Sen','riya.sen@iisc.ac.in','IISc Bangalore',['Policy','AI/ML'],'Bengaluru, India'),
  mk('44','Rohit Anand','rohit.anand@iitkgp.ac.in','IIT Kharagpur',['CV','Data'],'Kharagpur, India'),
  mk('45','Sagar Sinha','sagar.sinha@iitb.ac.in','IIT Bombay',['IR','NLP'],'Mumbai, India'),
  mk('46','Sakshi Verma','sakshi.verma@iitd.ac.in','IIT Delhi',['AI/ML','HCI'],'New Delhi, India'),
  mk('47','Sameer Khan','sameer.khan@iitd.ac.in','IIT Madras',['Security','Systems'],'Chennai, India'),
  mk('48','Sanjana Ghosh','sanjana.ghosh@iiith.ac.in','IIIT Hyderabad',['CV','AI/ML'],'Hyderabad, India'),
  mk('49','Santosh Yadav','santosh.yadav@iitk.ac.in','IIT Kanpur',['Robotics','Systems'],'Kanpur, India'),
  mk('50','Shalini Kaur','shalini.kaur@iisc.ac.in','IISc Bangalore',['Bio','Ethics'],'Bengaluru, India'),
  mk('51','Shashi Reddy','shashi.reddy@iitb.ac.in','IIT Bombay',['IR','AI/ML'],'Mumbai, India'),
  mk('52','Shruti Nair','shruti.nair@iitd.ac.in','IIT Delhi',['NLP','Data'],'New Delhi, India'),
  mk('53','Siddharth Mishra','siddharth.mishra@iitm.ac.in','IIT Madras',['AI/ML','Robotics'],'Chennai, India'),
  mk('54','Sneha Bose','sneha.bose@iisc.ac.in','IISc Bangalore',['HCI','Design'],'Bengaluru, India'),
  mk('55','Sonia Bhattacharya','sonia.bhattacharya@iitkgp.ac.in','IIT Kharagpur',['Policy','Data'],'Kharagpur, India'),
  mk('56','Sudhir Rao','sudhir.rao@iitb.ac.in','IIT Bombay',['Systems','Networks'],'Mumbai, India'),
  mk('57','Supriya Menon','supriya.menon@iisc.ac.in','IISc Bangalore',['Bio','AI/ML'],'Bengaluru, India'),
  mk('58','Tanvi Deshpande','tanvi.deshpande@iitd.ac.in','IIT Delhi',['CV','HCI'],'New Delhi, India'),
  mk('59','Uday Kulkarni','uday.kulkarni@iitm.ac.in','IIT Madras',['IR','Systems'],'Chennai, India'),
  mk('60','Varun Saxena','varun.saxena@iiith.ac.in','IIIT Hyderabad',['AI/ML','Security'],'Hyderabad, India'),
]

export default people
