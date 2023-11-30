const mongoose = require('mongoose');
const database = require('./config/database');

mongoose.connect(database.url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Employee = require('./models/employee');

db.once('open', async function () {
    try {
        console.log('Connected to MongoDB database');

        // Now, try inserting a sample document
        const sampleEmployee = new Employee({
            name: 'John Doe',
            salary: 50000,
            age: 30
        });

        await sampleEmployee.save();
        console.log('Sample document inserted successfully');
    } catch (error) {
        console.error('Error inserting sample document:', error);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
});