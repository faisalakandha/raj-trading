module.exports = (mongoose) => {
    const Watchlist = mongoose.model(
        'watchlist',
        mongoose.Schema({ symbol: String, code: String, ltp: Number })
    );
    return Watchlist;
};