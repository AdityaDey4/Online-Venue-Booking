const Venue = require("../../model/Venue");

const getAllVenues = async (req, res) => {
  const venue = await Venue.find();
  res.json(venue);
};

const getVenue = async (req, res) => {
  const id = req?.params?.id; 
  if (!id) return res.status(400).json({ message: "id is required" });

  try {
    const venue = await Venue.findById(id).exec();
    if (!venue) {
      return res.status(204).json({ message: `Venue with id ${id} not found` });
    }
    res.json(venue);
  } catch (e) {
    return res.status(400).json({ message: `${e.message}` });
  }
};

const deleteVenue = async (req, res) => {
  const id = req?.body?.id;
  if (!id) return res.status(400).json({ message: "id is required" });

  const venue = await Venue.findByIdAndDelete(id).exec();
  return res.json({ message: `Venue with id ${id} is successfully deleted` });
};

const updateVenue = async (req, res) => {
  const { address, price, description, max_people } = req.body;
  const id = req?.body?.id;
  console.log(id);
  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  try {
    const venue = await Venue.findById(id);
    if (!venue) {
      return res.status(204).json({ message: `Venue with id ${id} not found` });
    } 
    if (address) venue.address = address;
    if (price) venue.price = price;
    if (description) venue.description = description;
    if (max_people) venue.max_people = max_people;
    await venue.save();

    res.json(venue);
  } catch (e) {
    return res.status(400).json({ message: `${e.message}` });
  }
};

const postVenue = async (req, res) => {
    
  var imgobj = req?.files?.dimg;
  console.log(imgobj);
  console.log(req?.files);
  console.log(req?.body?.price);
  imgobj.mv("./public/v_img/" + imgobj.name, async (err) => { 
    if (err) {
      throw err;
    } else {
      const { name, address, price, description, max_people, vo_email } = req.body;

      if (!name || !address || !price || !description || !max_people || !vo_email) {
        return res.status(400).json({ message: "please send all the details" });
      }

      const duplicate = await Venue.findOne({ name: name }).exec();
      if (duplicate) {
        return res
          .status(409)
          .json({ message: `Venue with name : ${name} is already exist.` });
      }

      try {
        const result = await Venue.create({
          name: name,
          address: address,
          price: price,
          description: description,
          max_people: max_people,
          image : imgobj.name,
          vo_email : vo_email
        });

        res.status(201).json({ id: result._id });
      } catch (err) {
        return res.status(400).json({ message: `${err.message}` });
      }
    }
  });
};

const getVenueOwnerVenues = async (req, res)=> {
    
    const {email} = req.params;

    const venues = await Venue.find({"vo_email" : email});
    res.json(venues);
}

module.exports = {
  getAllVenues,
  getVenue,
  deleteVenue,
  updateVenue,
  postVenue,
  getVenueOwnerVenues
};
