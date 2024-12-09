import cloudinary from "./cloudinary.js";

// logic for converting base64
const uploadImageOnCloudinary = async (file) => {
  try {
    const mimeType = file.mimetype;  // Correct property name
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${mimeType};base64,${base64Image}`;  // Use mimeType instead of file.mimeType

    const uploadResponse = await cloudinary.uploader.upload(dataURI);

    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed.");
  }
};

export default uploadImageOnCloudinary;
