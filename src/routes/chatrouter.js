import {Router} from 'express';


const router = Router();

router.get("/", (req, res) => {
    res.render(
        'chat',
        {
            title: 'Chat',
            style: 'index.css',
        }
    )
})

export default router;