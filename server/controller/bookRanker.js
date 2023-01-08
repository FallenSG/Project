module.exports = {
    wilsonScore: async function(rating, date){
        const order = Math.log10( Math.max( rating, 1 ) )
        const sign = rating>0?1:0;
        const seconds = date - 1134028003
        return Math.round(sign * order + seconds/4500, 7)
    },

    baysonAvg: function(rating, ratingCount, confidence=250, m=3.8){
        return (rating + confidence * m)/(ratingCount + confidence)
    }
}