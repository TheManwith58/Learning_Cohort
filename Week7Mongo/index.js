const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { z } = require('zod');
const { auth , JWT_SECRET } = require("./auth");
const { userModel , todoModel} = require('./db');
const app = express();
app.use(express.json());
mongoose.connect('DATABASE_URL');
app.post('/signup', async (req, res)=>{
    const required = z.object({
        username : z.string().max(100).min(3),
        password : z.string().max(100).min(3)

    })
    const requirementsuccess = required.safeParse(req.body);
    if(!requirementsuccess)
    {
        res.send({
            message : "invalid foramt of input"
        });
        return;
    }
    const username = req.body.username;
    const password  = req.body.password;
    try {
    const hashedPass = await bcrypt.hash(password , 5);
    await userModel.create({
       username : username, 
       password : hashedPass,

    })
    res.send({
        message : "User created successfully"
    });}
    catch (e)
    {
        res.send({
            message : "error while adding to db"
        })
    }
});
//each request can only send one response

app.post('/signin',async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user =await userModel.findOne({
        username: username,
    })
    if(!user)
    {
        response.status(200).json({
            message : "user does not exist"
        })
        return ;
    }
    const passwordmap = brypt.compare(password ,user.password);
    if(passwordmap)
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