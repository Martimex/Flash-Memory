// Here we are going to update current progresses records (BUT NEVER DELETE !)
import prisma from "../../../lib/prisma";

// (PUT) /api/progress/:id
export default async function handle(req, res) {
    if(req.method === 'PUT') {
        // For PUT request we have user progress record ID, so we can update it immediately
        const progressId = req.query.id;
        const { lv_progress, highscore, stars } = req.body;

        const updateProgress = await prisma.progress.update({
            where: { id: progressId},
            data: {
                lv_progress: lv_progress,
                highscore: highscore,
                stars_got: stars,
            }
        });
        res.json(updateProgress);
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
} 