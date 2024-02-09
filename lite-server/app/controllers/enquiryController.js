const Enquiry = require('../models/enquiryModel');

exports.createEnquiry = async (req, res) => {
  try {
    const { by_user_id, to_user_id, for_listing_id } = req.body;
    const newEnquiry = await Enquiry.create({ by_user_id, to_user_id, for_listing_id });
    return res.status(201).json(newEnquiry);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll();
    return res.status(200).json(enquiries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getEnquiryById = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const enquiry = await Enquiry.findByPk(enquiryId);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    return res.status(200).json(enquiry);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const { by_user_id, to_user_id, for_listing_id } = req.body;
    const enquiryToUpdate = await Enquiry.findByPk(enquiryId);
    if (!enquiryToUpdate) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    enquiryToUpdate.by_user_id = by_user_id;
    enquiryToUpdate.to_user_id = to_user_id;
    enquiryToUpdate.for_listing_id = for_listing_id;
    await enquiryToUpdate.save();
    return res.status(200).json(enquiryToUpdate);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const enquiry = await Enquiry.findByPk(enquiryId);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    await enquiry.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};