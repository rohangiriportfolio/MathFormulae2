import dotenv from 'dotenv';
import express from "express";
import path from "path";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import moment from "moment";
import mobileDetect from "mobile-detect";
import { contributeModel as contributeModelSample } from './main/model/contributionData.js';
import { userModel as userModelSample } from './main/model/userData.js';
import { cookieMiddleFunc as cookieMiddleFuncVar } from './main/service/cookieMiddleWare.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URL)  //mongoose.connect("mongodb://127.0.0.1:27017/contributionDbs")
    .then(() => console.log("MongoDB successfully connected!"))
    .catch((err) => console.log("Error: ", err));

const app = express();

app.locals.moment = moment;
moment.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: function (output) {
            if (output === "just now") {
                return output;
            } else {
                return output + " ago";
            }
        },
        s: "just now",
        m: "1 min",
        mm: "%d mins",
        h: "1 hr",
        hh: "%d hrs",
        d: "1 day",
        dd: "%d days",
        M: "1 month",
        MM: "%d months",
        y: "1 yr",
        yy: "%d yrs"
    }
});





app.use(express.static('main'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieMiddleFuncVar.validateCookie("token"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./main/views"));
const isAuthenticated = (req, res, next) => {
    if (req.user) { // It is checking that user is signin or not if yes then call the next() function otherwise redirect to the signin page
        next();
    } else {
        res.redirect('/signin');
    }
};
app.use('/contribute_page', isAuthenticated);
app.use('/feedback_page', isAuthenticated);

app.get('/', (req, res) => {
    // res.sendFile("index.ejs", {root: 'main'});
    res.render("loader");
});

app.get('/load', (req, res) => {
    res.render("index", {
        user: req.user,
    });
});

app.get('/feedback_page', (req, res) => {
    res.render("feedback", {
        user: req.user,
    });
});
app.get('/close_popup', (req, res) => {
    res.render("index");
});
app.get('/contribute_page', async (req, res) => {
    const allContributions = await contributeModelSample.find({});
    res.render("contribute", {
        user: req.user,
        allContributions: allContributions,
    });
});
app.get('/signup', (req, res) => {
    res.render("signup");
});
app.get('/signin', (req, res) => {
    res.render("signin");
});
app.get('/logout', (req, res) => {
    res.clearCookie("token").redirect("/load");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started at ${PORT} ...`);
});



app.post('/contribute_page', async (req, res) => {
    const { section, contribution } = req.body;
    const contributedBy = req.user.name;
    //console.log(`Section: ${section}, Contribution: ${contribution}, Contributed By: ${contributedBy}`);
    const contributeCollection = new contributeModelSample({
        section: section,
        contribution: contribution,
        contributedBy: contributedBy,
        likes: [],
        disLikes: [],
    });
    // contributeModelSample.findOne({});
    const added = contributeCollection.save();
    const id = (await added)._id;
    //console.log("ID: ", id);
    // res.status(204).send();
    setTimeout(() => {
        res.redirect("/contribute_page");
    }, 2000);
});


app.post('/likes', async (req, res) => {
    // console.log(req.body);
    const cardId = req.body.cardId;
    // console.log(cardId);
    const id = await contributeModelSample.findById(cardId);
    if (id.likes.includes(req.user._id)) {
        id.likes = id.likes.filter(id => id !== req.user._id);
        await id.save();
        res.send({ message: 'false' });
    }
    else {
        id.likes.push(req.user._id);
        await id.save();
        res.send({ message: 'true' });
    }
});

app.post('/disLikes', async (req, res) => {
    // console.log(req.body);
    const cardId = req.body.cardId;
    // console.log(cardId);
    const id = await contributeModelSample.findById(cardId);
    if (id.disLikes.includes(req.user._id)) {
        id.disLikes = id.disLikes.filter(id => id !== req.user._id);
        await id.save();
        res.send({ message: 'false' });
    }
    else {
        id.disLikes.push(req.user._id);
        await id.save();
        res.send({ message: 'true' });
    }
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    // console.log(`Name: ${name}, Email ID: ${email}, Password: ${password}`);
    const userCollection = new userModelSample({
        name: name,
        email: email,
        password: password,
    });
    
    userCollection.save();
    res.render("signup", { successes: "Account Created Successfully !!" });
});

app.post('/signin', async (req, res) => {
    const { email1, password1 } = req.body;
    try {
        // console.log(`Email ID: ${email1}, Password: ${password1}`);
        const token = await userModelSample.matchPasswordAndCreateToken(email1, password1);
        setTimeout(() => {
            return res.cookie("token", token).render("signin", {
                successes: "Successfully Signed In !!",
                redirect: true,
                redirectUrl: '/load',
                redirectTime: 3000
            });
        }, 1000);
    }
    catch (error) {
        return res.render("signin", {
            error: "Invalid Email ID Or Password !!"
        });
    }
});


app.use((req, res) => {
    res.status(404).render('error_page');
});

app.get('*', (req, res, next) => {
    const md = new mobileDetect(req.headers['user-agent']);
    if (md.mobile()) {
      // Mobile device detected, prevent desktop site rendering
      res.redirect('/mobile'); // or render mobile-specific content
    } else {
      next(); // Proceed with desktop site rendering
    }
  });
  