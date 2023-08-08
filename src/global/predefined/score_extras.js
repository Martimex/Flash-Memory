
const scoreExtras = {

    spree: function(inGameCounters, basicScore) {
        return  (inGameCounters['spree'] > 0) ? (inGameCounters['spree'] - 1) * (basicScore / 2) : 0;
    },
}

export {scoreExtras};