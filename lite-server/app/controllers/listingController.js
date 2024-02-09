const Listing = require('../models/listingModel');

exports.createListing = async (req, res) => {
  try {
    const { type, from_city, from_pin, to_city, to_pin, image_url_1, image_url_2, created_by, length, width, height } = req.body;
    const listing = await Listing.create({ type, from_city, from_pin, to_city, to_pin, image_url_1, image_url_2, created_by, length, width, height });
    return res.status(201).json(listing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.findAll();
    return res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findByPk(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    return res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const { type, from_city, from_pin, to_city, to_pin, image_url_1, image_url_2, created_by, length, width, height } = req.body;
    const listing = await Listing.findByPk(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    listing.type = type;
    listing.from_city = from_city;
    listing.from_pin = from_pin;
    listing.to_city = to_city;
    listing.to_pin = to_pin;
    listing.image_url_1 = image_url_1;
    listing.image_url_2 = image_url_2;
    listing.created_by = created_by;
    listing.length = length;
    listing.width = width;
    listing.height = height;
    await listing.save();
    return res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findByPk(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    await listing.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
