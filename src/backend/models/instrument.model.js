module.exports = (mongoose) => {
  const { Schema } = mongoose;
  const Instrument = mongoose.model('instrument', new Schema({}), 'instrument');
  return Instrument;
};
