// Here we are going to update current progresses records (BUT NEVER DELETE !)
import prisma from "../../../../lib/prisma";

// (GET) /api/progress/[:id]/:userid
export default async function handle(req, res) {
    if(req.method === 'GET') {
        // For GET request, we want to get a user progress record for picked level (but we could only pass level ID)
        const levelId = req.query.id;
        const userId = req.query.userid;
        const user_progresses = await prisma.progress.findMany({
            where: { userId: userId  },
        });

        const level_progress = await user_progresses.find(progress_record => progress_record.levelId === levelId);
        const res_data = await res.json(level_progress);
        return res_data;
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
} 