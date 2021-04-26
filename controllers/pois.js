import Poi from "../models/poi.js";

export const getPois = async (req, res) => {
    try {
        const pois = await Poi.find();
        console.log(pois);
        res.status(200).json(pois);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}