const player_stats_pages = [
    [
        {stat_name: 'EXP', connect_name: 'main-exp', color_bar_class: 'bar--exp', getValues: function(paramName) {return paramName}},
        {stat_name: 'STARS', connect_name: 'main-stars', color_bar_class: 'bar--stars', getValues: function(paramName) {return paramName}},
        {stat_name: 'LEVELS', connect_name: 'main-levels', color_bar_class: 'bar--levels', getValues: function(paramName) {return paramName}},
    ],
    [
        {stat_name: 'EASY', connect_name: 'diff-easy', color_bar_class: 'bar--easy', getValues: function(paramName) {return paramName}},
        {stat_name: 'MEDIUM', connect_name: 'diff-medium', color_bar_class: 'bar--medium', getValues: function(paramName) {return paramName}},
        {stat_name: 'HARD', connect_name: 'diff-hard', color_bar_class: 'bar--hard', getValues: function(paramName) {return paramName}},
    ],
    [
        {stat_name: 'INSANE', connect_name: 'diff-insane', color_bar_class: 'bar--insane', getValues: function(paramName) {return paramName}},
        {stat_name: 'EXTREME', connect_name: 'diff-extreme', color_bar_class: 'bar--extreme', getValues: function(paramName) {return paramName}},
        {stat_name: 'LEGEND', connect_name: 'diff-legend', color_bar_class: 'bar--legend', getValues: function(paramName) {return paramName}},
    ],
];

const pages_titles = ['General info', 'Completed (1/2)', 'Completed (2/2)'];

export  { pages_titles };
export default player_stats_pages;