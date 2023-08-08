// Here we are going to update ONLY USER EXP here (AND NOTHING ELSE !)
import prisma from "../../../lib/prisma";

// (PUT) /api/progress/:id
export default async function handle(req, res) {
    if(req.method === 'GET') {
        // For GET request, we are going to get user data just for UserTab (Landing Page one) to display specific data properly
        const playerEmail = req.query.id;
        const player = await prisma.user.findUnique({
            where:  {email: playerEmail}
        })
        const res_data = await res.json(player);
        return res_data; 
    }

    else if(req.method === 'PUT') {
        // For PUT request we have user progress record ID, so we can update EXP value
        const playerId = req.query.id;
        const { oldExp, exp_to_add } = req.body;
        const updatePlayerExp = await prisma.user.update({
            where: { id: playerId},
            data: {
                exp: oldExp + exp_to_add,
            }
        });
        res.json(updatePlayerExp);
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
} 