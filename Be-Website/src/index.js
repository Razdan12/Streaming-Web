const bodyParser = require('body-parser'); 
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

const userControler = require("./users/userControler");
const registerControler = require("./register/registerControler")
const loginControler = require("./login/loginControler")
const paketControler = require("./paket/paketControler")
const akunControler = require("./akun/akunControler")
const videoControler = require("./video/videoControler")
const musikControler = require("./musik/musikControler")
const kategoriControler = require("./kategori/kategoriControler")
const paketVideoContr = require("./paket-video/paketVideoContr")
const paketMusikContr = require("./paket-musik/paketMusikContr")
const vaControler = require("./payment/va/vaControler")
const SiplahPayment = require("./payment/siplah/controler")
const Transaksi = require("./payment/paymentControler")
const voucherControler = require("./voucher/voucherControler")
const siplahControler = require("./siplah/siplahControler")
const banner = require("./banner/bannerController")
const jenjang = require("./Jenjang/jenjangControler")
const streaming = require("./video/streaming")
const faq = require("./faq/FaqControler")
const mail = require("./mail/mailControler")
const avatar = require("./avatar/avatarControler")

const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION',
  credentials: true, 
};
const app = express();
app.use(cors(corsOptions)); 

dotenv.config();
const port = process.env.PORT;

app.use(bodyParser.json({limit: '1gb'}));
app.use(bodyParser.urlencoded({limit: '1gb', extended: true}));

app.use(express.json());

app.use("/user", userControler)
app.use("/register", registerControler)
app.use("/login", loginControler)
app.use("/paket", paketControler)
app.use("/akun", akunControler)

// Apply CORS middleware to the "/video" route
app.use("/video", videoControler)
app.use("/musik", musikControler)
app.use("/kategori", kategoriControler)
app.use("/paket-video", paketVideoContr)
app.use("/paket-musik", paketMusikContr)
app.use("/payment/va", vaControler)
app.use("/payment/siplah", SiplahPayment)
app.use("/transaksi", Transaksi)

// app.use("/payment/outlet", outletControler)
app.use("/voucher", voucherControler)
app.use("/siplah", siplahControler)
app.use("/banner", banner)
app.use("/jenjang", jenjang)
app.use("/streaming", streaming)
app.use("/faq", faq)
app.use("/mail", mail)
app.use("/avatar", avatar)

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(port, () => {
  console.log(`Server Runing on port ${port}`);
});
