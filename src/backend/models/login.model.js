module.exports = (mongoose) => {
  const Session = mongoose.model(
    'session',
    mongoose.Schema({ status: String, access: String })
  );
  return Session;
};
