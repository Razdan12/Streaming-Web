const { Response } = require("../config/response");
const { createAvatar, getAllAvatar } = require("./avatarRepo");

const CreateAvatarService = async ({ url}) => {
    try {
      if (!url) {
        return Response(500, [], "Gagal mendapatkan Url Image");
      }
      const data = {
        url 
      };
  
      const response = await createAvatar(data);
      return Response(201, response, "Berhasil upload avatar");
    } catch (error) {
      console.log(error);
      return Response(500, error, "Gagal upload avatar");
    }
  };
  
  const GetAllAvatar = async () => {
    const data = await getAllAvatar()
    return data
  }

  module.exports = {
    CreateAvatarService,
    GetAllAvatar
  };