
import Layout from "../component/Layout";

const SyaratDanKetentuan = () => {
  return (
    <div>
      <Layout id="about">
        <div className="min-h-[400px] w-full flex justify-center">
          <div className="sm:w-1/2 w-5/6 my-10">
            <div className="flex justify-center w-full">
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-800">
                Syarat & Ketentuan
              </span>
            </div>
            <div className="mt-10 text-justify flex flex-col gap-3">
              <span className="mr-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-800">
                Ketentuan Umum
              </span>
              <p>
                Syarat dan Ketentuan Website Wijiga merupakan perjanjian antara
                pengguna ("Anda" atau "Pengguna") dan PT. Wijiga Widya Permata
                ("Kami" atau "Wijiga"), sebuah Perseroan terbatas yang didirikan
                dan beroperasi secara sah berdasarkan hukum Negera Republik
                Indonesia dan berdomisili di Bekasi, Indonesia. Syarat dan
                Ketentuan ini mengatur Anda saat mengakses dan menggunakan situs
                web (
                <a href="/" className="text-cyan-500">
                  {" "}
                  https://wijiga.com/
                </a>{" "}
                ), Fitur, konten dan produk yang kami sediakan serta pembayaran
                atau penggunaan website wijiga. Dengan menyetujui Syarat dan
                Ketentuan Website ini, Anda menyetujui Syarat dan Ketentuan
                perubahan dan tambahan atas setiap layanan yang tidak
                terpisahkan dari Syarat dan Ketentuan ini.
              </p>
              <span className="mr-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-800">
                Akun Anda
              </span>
              <p>
                Keamanan dan kerahasiaan akun Anda, termasuk nama terdaftar,
                alamat e-mail, rincian pembayaran dan metode pembayaran yang
                Anda pilih sepenuhnya merupakan tanggung jawab Anda Pribadi.
                Segala kerugian dan risiko yang ada akibat kelalaian Anda dalam
                menjaga keamanan dan kerahasiaan sebagaimana disebutkan
                ditanggung oleh Anda sendiri dan/atau orang tua, wali atau
                pengampu. Hal tersebut, kami akan mengganggap setiap penggunaan
                atau pesanan yang dilakukan melalui Akun Anda sebagai permintaan
                yang sah dari Anda.
              </p>
              <p>
                Jika Anda mengetahui atau menduga bahwa Akun Anda telah
                digunakan tanpa sepengetahuan dan persetujuan Anda diharapkan
                segera memberitahukan kepada Kami, Kami akan melalukan tindakan
                yang kami anggap perlu lakukan terhadap hal tersebut.
              </p>
              <span className="mr-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-800">
                Biaya dan Pembayaran
              </span>
              <p>
                Layanan yang kami sediakan pada situs website
                <a href="/" className="text-cyan-500">
                  {" "}
                  https://wijiga.com/
                </a>{" "}
                dikenakan harga langganan, mengenai harga langganan tersebut
                bisa Anda temukan sebelum Anda memesan paket berlangganan Kami.
                Kami dapat mengubah atau memperbarui harga langganan dari waktu
                ke waktu berdasarkan faktor tentu, yaitu jenis layanan dan
                peraturan perundang-undangan yang berlaku.
              </p>
              <span className="mr-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-800">
                Penggunaan Website yang Dilarang
              </span>
              <p>
                Tidak mereproduksi, menggandakan, menyalin atau menjual kembali
                bagian manapun dari Website Kami yang bertentangan dengan Syarat
                dan Ketentuan Kami.Tidak mengakses tanpa izin, mengganggu,
                merusak, atau mengacak-acak bagian mana pun dari website Kami,
                peralatan atau jaringan dimana website kami tersimpan.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SyaratDanKetentuan;
