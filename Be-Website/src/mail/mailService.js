const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const SendEmail = async (penerima, subject, pesan, dataPesan, penutup) => {
  const name = penerima.split("@")[0];
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOption = {
    from: process.env.MAIL_USER,
    to: penerima,
    subject: subject,
    html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <img src="cid:logo@myapp.com" alt="Logo" style="width: 200px; height: auto;" />
            <h2>Hallo ${name},</h2>
            <p>${pesan}</p>
            <h3 style="background-color: #f8f8f8; padding: 10px; text-align: left;">${dataPesan}</h3>
            <p>${penutup}</p>
            <p>Salam,</p>
            <p>Tim Wijjiga</p>
            <p style="font-size: 0.9em; color: #888;">Email ini dikirimkan secara otomatis, mohon tidak membalas email ini.</p>
            <p style="fonst-size: 0,7em; color: #888; text-align: center;" >PT.Wijiga Widya Permata</p>
            <p style="fonst-size: 0,7em; color: #888; text-align: center;" >www.wijiga.com</p>
            
        </div>
    `,
    attachments: [
      {
        filename: "logo.png",
        path: "./src/mail/logo.png",
        cid: "logo@myapp.com",
      },
    ],
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
      return "email tidak terkirim";
    } else {
      console.log(info.response);
      return "email terkirim";
    }
  });
};

module.exports = {
  SendEmail,
};
