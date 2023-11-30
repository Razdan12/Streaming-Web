const { AddFAQRepo, GetFAQRepo, DeleteFAQRepo } = require("./FaqRepo")

const AddFAQService = async (question, answer) => {
   try {
     const data = {
         question,
         answer
     }
     const response = await AddFAQRepo(data)
     return response
   } catch (error) {
    console.log(error);
   }
}

const GetFAQService = async () => {
   const response = await GetFAQRepo()
   return response
}

const DeleteFAQService = async (id) => {
    const response = await DeleteFAQRepo(id)
    return response
}

module.exports = {
    AddFAQService,
    GetFAQService,
    DeleteFAQService

}