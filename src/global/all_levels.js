import { Level } from './Level.js';

/* Each stage array has to have the same array length ! */

const all_levels = {
    tf: {
        1: new Level(1, 2, 'easy', 
            [16, 4], 
            [4, 2], 
            [4, 2], 
            [ [], [] ], 
            [70, 60], 
            ['fas', 'far'], 
            [ {turns: 13,  time: 35}, {time: 5} ], 
            [ {time: 900, tileShowTime: 900}, {time: 700, tileShowTime: 600} ], 
            [ {time: 400, easing: 'linear'}, {time: 400, easing: 'linear'} ],
            [800, 800],
            [ {count: 2, pattern: 'pairs'}, {count: 2, pattern: 'pairs'} ],
            [ {count: 100, extras: 'spree'}, {count: 100 } ],
            [ {value: 16, pointsPerMatch: 2, pattern: 'tilesFound'}, {value: 4, pointsPerMatch: 2, pattern: 'tilesFound'}  ],
            {} ),
            
        2: new Level(2, 1, 'medium',
            [24],
            [4], 
            [6], 
            [ [] ], 
            [53], 
            ['fas'], 
            [ {time: 75, turns: 21} ], // time: 75
            [ {time: 1200, tileShowTime: 900} ], 
            [ {time: 600, easing: 'linear'} ], 
            [600],
            [ {count: 2, pattern: 'pairs'} ],
            [ {count: 100, extras: 'spree'} ],
            [ {value: 24, pointsPerMatch: 2, pattern: 'tilesFound'} ],
            {} ),
        3: new Level(3, 1, 'easy',
            [20],
            [4], 
            [5], 
            [ [] ],
            [66],
            ['fas'],
            [{time: 67}], // 64
            [ {time: 700, tileShowTime: 700} ], 
            [ {time: 800, easing: 'easeInSine'} ], 
            [900],
            [ {count: 2, pattern: 'pairs'} ],
            [ {count: 100, extras: 'spree'} ],
            [ {value: 20, pointsPerMatch: 2, pattern: 'tilesFound'} ],
            {} ),

        4: new Level(4, 1, 'medium',
            [36], 
            [6], 
            [6],  
            [ [] ],
            [42],
            ['far'],
            [{turns: 45, time: 200}], 
            [ {time: 100, tileShowTime: 100} ], // this level has starting animation hidden, so those values does not really matter
            [ {time: 1200, easing: 'easeInOutQuint'} ], 
            [600],
            [ {count: 2, pattern: 'pairs'} ],
            [ {count: 100, extras: 'spree'} ],
            [ {value: 36, pointsPerMatch: 2, pattern: 'tilesFound'} ],
            { secret_streak: 0, secret_streak_requirements: 3, secret_solved: false, matchCount: 0, matchCountLimit: 6} ),

        5: new Level(5, 2, 'hard',
            [32, 20],
            [4, 4],
            [8, 5], 
            [ [] ],
            [48, 50],
            ['fas', 'fas'],
            [ {time: 172, turns: 34}, {time: 172, turns: 20} ],
            [ {time: 1000, tileShowTime: 1600}, {time: 800, tileShowTime: 1000} ],  
            [ {time: 700, easing: 'easeInSine'}, {time: 600, easing: 'easeInSine'},  ], 
            [800, 550],
            [ {count: 2, pattern: 'pairs'}, {count: 4, pattern: 'quads'} ],
            [ {count: 100, extras: 'spree'}, {count: 250, extras: 'spree'} ],
            [ {value: 32, pointsPerMatch: 2, pattern: 'tilesFound'}, {value: 20, pointsPerMatch: 4, pattern: 'tilesFound'} ],
            { wasMatch: true, } ),

        6: new Level(6, 1, 'insane',
            [36],
            [6],
            [6],
            [ [] ],
            [32],
            ['fas'],
            [ {time: 1155, turns: 40} ],  // was 155 seconds \\ was 52 turns 
            [ {time: 1000, tileShowTime: 1200} ], 
            [ {time: 500, easing: 'linear'} ],
            [800],
            [ {count: 2, pattern: 'pairs'} ],
            [ {count: 100, extras: 'spree'} ],
            [ {value: 36, pointsPerMatch: 2, pattern: 'tilesFound'} ],
            {} ),

        7: new Level(7, 1, 'insane', 40, 5, 8, [], 58, 'fas', {time: 156}, ),
        8: new Level(8, 1, 'extreme', 48, 6, 8, [], 46, 'fas', {time: 235}, ),
        9: new Level(9, 1, 'easy', 42, 6, 7, [], 50, 'fas', {time: 180}, ),
        10:new Level(10, 1, 'insane',  44, 4, 11, [], 58, 'fas', {turns: 50}, ),
    },

    os: {
        1: new Level(1, 1, 'medium', 44, 4, 11, [], 52, 'fas', {turns: 26}, ),
        2: new Level(2, 1, 'hard', 50, 5, 10, [], 46, 'fas', {time: 256}, ),
        3: new Level(3, 1, 'insane', 72, 6, 12, [], 40, 'fas', {turns: 132}, ),
        4: new Level(4, 1, 'easy', 48, 6, 8, [], 48, 'fas', {time: 260}, ),
        5: new Level(5, 1, 'hard', 40, 5, 10, [], 48, 'fas', {turns: 120}, ), /* bomb level, tiles: 40 rows: 5 cols: 10 */
        6: new Level(6, 1, 'extreme', 42, 6, 7, [], 48, 'fas', {time: 224}, ),
        7: new Level(7, 5, 'hard', 96, 6, 8, [], 50, 'fas', {turns: 104}, ),  /*  it's actually 48 + 24 + 12 + 8 + 4 = 96, but level is divided into phases (steps) + at the start 2 tiles are omitted */
        8: new Level(8, 1, 'insane', 36, 6, 6, [], 50, 'fas', {turns: 111}, ),
        9: new Level(9, 4, 'insane', 126, 6, 7, [], 46, 'fas', {turns: 112}, ), /* it's 42 + (2 * 42) = 126 */
        10: new Level(10, 1, 'medium', 64, 8, 8, [], 41, 'fas', {time: 290}, ), /* 32 sec extra bcs of starting animation */
    }

};


export { all_levels };

/*
        this.number = number;
        this.stages = stages;
        this.difficulty = difficulty;
        this.tiles = tiles;
        this.rows = rows;
        this.columns = columns;
        this.cords = cords;
        this.tile_size = tile_size;
        this.icon_set = icon_set;
        this.limitations = limitations;
        this.starting_animation = starting_animation;
        this.tile_animation = tile_animation;
        this.compare_time = compare_time;
        this.uncover = uncover;
        this.score = score;
        this.win = win;
        this.variables = variables;   // (do not wrap into array, keep it as an object) used to store level specific variables, which are accesible only within SCRIPT FILES (start, xclick ...)
*/