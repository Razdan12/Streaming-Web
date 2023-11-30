const express = require("express");
const { authAdmin, authAll } = require("../config/auth");
const { AddFAQService, GetFAQService, DeleteFAQService } = require("./FaqService");
const router = express.Router();

router.post("/", authAdmin, async (req, res) => {
    const {question, answer} = req.body;
    const data = await AddFAQService(question, answer)
    res.json({ status: 200, data: data, message: "sukses" });
})

router.get("/", authAll, async (req, res) => {
    const response = await GetFAQService()
    res.json({ status: 200, data: response, message: "sukses" });
})

router.delete("/:id", authAdmin, async(req, res) => {
    const id = req.params.id
    const response = await DeleteFAQService(id)
    res.json({ status: 200, data: response, message: "sukses" });
})

module.exports = router;