// We will also have to import getSession once we set up an authentication service
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const { user_id, level_id, level_difficulty } = req.body;
    // We want also to await getSesstion;
    const result = await prisma.progress.create({
        data: {
            stars_got: 0,
            lv_progress: 0,
            highscore: 0,
            lv_difficulty: level_difficulty,
            userId: user_id,
            levelId: level_id,
        },
    });
    res.json(result);
}