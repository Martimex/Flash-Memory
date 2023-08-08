class Level {
    constructor(number, stages, difficulty, tiles, rows, columns, cords, tile_size, icon_set, limitations, starting_animation, tile_animation, compare_time, uncover, score, win, variables) {
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
        this.variables = variables;
    }

    run() {
        console.log('Starting a new level !');
    }
}

export {Level}