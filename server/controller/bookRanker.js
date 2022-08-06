module.exports = {
    wilsonScore: async function(rating, date){
        const epoch = new Date(1980, 1, 1)
        const order = Math.log10( Math.max( rating, 1 ) )
        const sign = rating>0?1:0;
        const seconds = (date - epoch) / 1000 - 1134028003
        return Math.round(sign * order + seconds/4500, 7)
    },

    baysonAvg: function(rating, ratingCount, confidence=250, m=3.8){
        return (rating + confidence * m)/(ratingCount + confidence)
    }
}