const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/Person');  // Importing the User model at the top for clarity
const Buyer = require('../models/Buyer');  // Importing the Buyer model at the top for clarity
dotenv.config();


// const { Person } = require('../models/Person');

// exports.register = async (req, res) => {
//     const { email, p_password, fname, lname, dob, phone } = req.body;
//     const { Person } = require('../models/Person');
//     console.log(Person)
    
//     // Validate the request body
//     if (!email || !p_password || !fname || !lname || !dob || !phone) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         // Check if the email already exists in the database
//         const user = await Person.findOne({ where: { email } });

//         // If the user exists, return an error response
//         if (user) {
//             return res.status(400).json({ message: 'Email already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(p_password, 10);

//         // Create the new user
//         const newUser = await Person.create({
//             email,
//             p_password: hashedPassword,
//             fname,
//             lname,
//             dob,
//             phone
//         });

//         // Send success response after user is created
//         res.status(201).json({ message: 'User registered successfully', user: newUser });
//     } catch (err) {
//         console.error('Registration error:', err); // Log the error for debugging
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };


// exports.register = async (req, res) => {
//     const User = require('../models/Person');  // Importing the User model at the top for clarity
//     const user = await User.findOne({ where: { email: req.body.email } });
// }

exports.register = async (req, res) => {

    const { email, p_password, fname, lname, dob, phone, carrier } = req.body;
    console.log('Request body:', req.body);  // Log the request body for debugging

    // Validate the request body
    if (!email || !p_password || !fname || !lname || !dob || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the email already exists in the database
        const user = await User.findOne({ attributes: ['email'] ,where: { email: email } });
        console.log('user is found')

        // If user exists, return a response saying email is already taken
        if (user) {
            console.log('Email already exists');
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(p_password, 10);
        console.log('Password hashed successfully');
        console.log("Creating a new user......")
        // Create a new user record in the database
        const newUser = await User.create({
            email,
            p_password: hashedPassword,  // Corrected field name to `p_password`
            fname,
            lname,
            dob,
            phone,
            carrier
        });

        await Buyer.create({
            buyer_email: email});

        // Return a success response with the newly created user data
        res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (err) {
        // Log any errors that occur during the process
        console.error('Error occurred during registration:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.login = async (req, res) => {
    const { email, p_password } = req.body;
    console.log('Request body:', req.body);  // Log the request body for debugging
    
    // Validate the request body
    if (!email || !p_password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the email exists in the database
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(p_password, user.p_password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send both the user object and the token in the response
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email, fname: user.fname, lname: user.lname, phone: user.phone, carrier: user.carrier } // Include user details here
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};




exports.logout = (req, res) => {
    
    res.status(200).json({ message: 'logout' });
}


exports.resetPassword = async (req, res) => {
    
    const { email, currentPassword, confirmPassword , newPassword } = req.body;
    console.log('Request body:', req.body);  // Log the request body for debugging
    if ( !confirmPassword || !newPassword || !email || !currentPassword) {
        return res.status(400).json({ message: 'passwords are required' });
    }

    try{
        // Check if the email exists in the database
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(currentPassword, user.p_password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        await User.update({ p_password: hashedPassword }, { where: { email } });

        res.status(200).json({ message: 'Password updated successfully' });
    }
catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.getUserDetails = async (req, res) => {
    const { buyer_email } = req.params; // Get the user ID from the request parameters

    try {
        // Find the user by ID
        const user = await User.findOne({ where: { email:buyer_email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user details
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updateUserDetails = async (req, res) => {
    const {fname, lname, dob, phone } = req.body;
    const { buyer_email } = req.params; // Get the user ID from the request parameters

    try {
        const user = await User.findOne({ where: { email:buyer_email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user details
        await User.update({ fname, lname, dob, phone }, { where: { email:buyer_email } });
        res.status(200).json({ message: 'User details updated successfully' });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }


}; 
