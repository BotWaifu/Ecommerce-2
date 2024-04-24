import {Router} from 'express';
import userModel from '../dao/models/userModel.js';
import { auth } from '../middlewares/auth.js';

const router = Router();


router.post("/register",async (req, res) => {
    try {
        req.session.failRegister = false;
        await userModel.create(req.body);
        res.redirect("/login");
    } catch (e) {
        console.log(e.message);
        req.session.failRegister = true;
        res.redirect("/register");
    }
});
router.post("/login", auth, async (req, res) => {
    try {
        req.session.failLogin = false;
        const result = await userModel.findOne({email: req.body.email});
        if (!result) {
            req.session.failLogin = true;
            return res.redirect("/login");
        }

        if (req.body.password !== result.password) {
            req.session.failLogin = true;
            return res.redirect("/login");
        }else{
            const password = result.password;
            const email = result.email;
            console.log(email, password)


            delete result.password;
            req.session.user = result;
    
            return res.redirect("/");
        }
    } catch (e) {
        req.session.failLogin = true;
        return res.redirect("/login");
    }
});


export default router;