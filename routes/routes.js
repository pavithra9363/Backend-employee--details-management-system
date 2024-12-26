const express=require('express');
const router=express.Router();
const model=require('../schema.js');
const multer = require('multer');
const path = require('path');

router.use(express.static('public'));



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public');  
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  
    }
  });

  
  const upload = multer({ storage: storage });



 router.get('/',(req,res)=>{
    res.render('home');
 });


 router.get('/about',(req,res)=>{
    res.render('about');
    console.log("this is about")
 });


 router.get('/create', (req, res) => {
      res.render('createEmployee');  
 });
 

 router.use(express.urlencoded({extended:true}));



router.post('/success', upload.single('photo'), async (req, res) => {
    try {
      
  
      const newEmployee =  await model.create({
        empid:req.body.empid,
        name: req.body.name,
        email: req.body.email,
        position: req.body.position,
        salary: req.body.salary,
        photo: req.file ? `/${req.file.filename}` : null 
      });
      const employees = await model.find();
    console.log('All Employees:', employees);

    res.render('update', { employees });

      
       
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/success', upload.single('photo'), async (req, res) => {

  const employees = await model.find();
  console.log('All Employees:', employees);

  res.render('update', { employees });
})  




router.get('/success/:empid', async (req, res) => {
  const { empid } = req.params;  

  try {
    const employee = await model.findOne({ empid });  
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.render('employee', { employee });  
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).send('Internal Server Error');
  }
});
  
   

router.post('/success/:empid', upload.single('photo'), async (req, res) => {
  const { empid } = req.params;

  try {
    const updatedEmployee = await model.findOneAndUpdate(
      { empid },  
      {
        name: req.body.name,
        email: req.body.email,
        position: req.body.position,
        salary: req.body.salary,
        photo: req.file ? `/${req.file.filename}` : undefined 
      },
      { new: true, upsert: true }  
    );

    if (!updatedEmployee) {
      return res.status(404).send('Employee not found');
    }

    res.redirect(`/new/success`);
    console.log(updatedEmployee) 
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send('Internal Server Error');
  }
});



router.post('/delete/:empid', async (req, res) => {
  const { empid } = req.params;  

 
    const deletedEmployee = await model.findOneAndDelete({ empid });

    res.redirect("/new/success")
});


 

 module.exports=router;
