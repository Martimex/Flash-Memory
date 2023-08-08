const exp_for_level = {
    // Read this as: If You want to have [key] level, you need to gather [value] exp IN TOTAL.
    // For example, to get from level 2 to level 3, You need to get 180 (NOT 240), because at level 2 you alredy have 60 exp, so: 240 - 60 = 180.
    1: 0,
    2: 60,
    3: 240,
    4: 520,
    5: 880,
    6: 1440,
    7: 2200,
    8: 3080,
    9: 4000,
    10: 5200,
    11: 6700,
    12: 8500,
    13: 10500,
    14: 14000,
    15: 18000,
    16: 23500,
    17: 30000,
    18: 38000,
    19: 48000,
    20: 60000,
    21: 75000,
    22: 92000,
    23: 108000,
    24: 128000,
    25: 150000,
    26: 190000,
    27: 250000,
    28: 320000,
    29: 400000,
    30: 500000,
};

const frames_for_level = {
    1: 'beginner',
    4: 'adventurer',
    9: 'explorer',
    15: 'guardian',
    22: 'archmaster',
    30: 'challenger'
}

const exp_for_difficulty = {
    easy: {firstVictory: 50, win: 30},
    medium: {firstVictory: 130, win: 80},
    hard: {firstVictory: 280, win: 240},
    insane: {firstVictory: 620, win: 500},
    extreme: {firstVictory: 1100, win: 800},
    legend: {firstVictory: 1820, win: 1200}
}

const getPlayerLevel = (exp) => {
    if(exp !== 0 && !exp) { return "0"};
    const exp_values_sorted = [...Object.values(exp_for_level)].sort((a, b) => a - b);
    const next_lv_exp = exp_values_sorted.find((lv_exp, ind) => (lv_exp > exp));
    const currentLv = Object.keys(exp_for_level).find(key => exp_for_level[key] === next_lv_exp) - 1;
    return (currentLv)? currentLv : Object.keys(exp_for_level).length;
}

const getLevelProgress = (exp) => {
    const playerLevel = getPlayerLevel(exp);
    if(playerLevel !== Object.keys(exp_for_level).length) {

        return Math.floor((100 / (exp_for_level[playerLevel + 1] - exp_for_level[playerLevel])) * (exp - exp_for_level[playerLevel]));
    }
    return 100;
}

const getLevelsCount = () => {
    return Object.keys(exp_for_level).length;
}

const getFrameColor = (exp) => {
    const playerLevel = getPlayerLevel(exp);
    const frame_levels_sorted = [...Object.keys(frames_for_level)].sort((a, b) => a - b);
    const next_frame = frame_levels_sorted.find((lv_for_frame, ind) => lv_for_frame > playerLevel);
    if(!next_frame) { return frames_for_level[frame_levels_sorted[frame_levels_sorted.length - 1]]}
    const currentFrame = frames_for_level[frame_levels_sorted[frame_levels_sorted.findIndex((el) => el.toString() === next_frame.toString()) - 1]];
    return currentFrame;
}

export {exp_for_level, exp_for_difficulty, getPlayerLevel, getLevelProgress, getLevelsCount, getFrameColor};