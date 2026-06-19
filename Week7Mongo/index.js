const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { auth , JWT_SECRET } = require("./auth");
const { userModel , todoModel} = require('./db');
const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://admin:NusCHxlpJhBa7Zqs@cluster0.0lhsllb.mongodb.net/Todo-app-database')
app.post('/signup', async (req, res)=>{
    const username = req.body.username;
    const password  = req.body.password;
    await userModel.create({
       username : username, 
       password : password,

    })
    res.send({
        message : "User created successfully"
    });
});
app.post('/signin',async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user =await userModel.findOne({
        username: username,
        password : password,
    })
    if(user)
    {
        const token = jwt.sign({
            id : user._id.toString(),
        }, JWT_SECRET);

        return res.json({
            token: token
        });
    }
    else
    {
        return res.status(403).json({ message: "Invalid username or password"});
    }
});
app.post('/todo', auth , async (req, res)=>{
    const userId = req.UserId;
    const title = req.body.title;
    const done = req.body.done;
    await todoModel.create({
        title,
        done,
        userId
    });
    res.json({
        message : "successfully created todo"
    });
});
app.get('/todos',auth , async (req, res)=>{
    const userId = req.UserId;
    const todos = await todoModel.find({
        UserId : userId
    })
    res.json({
        todos
    });
});

app.listen(3000);