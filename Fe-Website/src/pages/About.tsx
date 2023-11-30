
import Layout from "../component/Layout";

const About = () => {
  return (
    <>
      <Layout id="about">
        <div className="min-h-[400px] w-full flex justify-center">
          <div className="sm:w-1/2 w-5/6 my-10">
            <div className="flex justify-center w-full">
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-800">
                Tentang Kami
              </span>
            </div>
            <div className="mt-10 text-justify">
              <p>
                <span className="mr-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-800">
                  PT. WIJIGA WIDYA PERMATA
                </span>
                (Wijiga) merupakan Perseroan terbatas yang bergerak dibidang
                Teknologi berfokus pada Pendidikan Anak Usia Dini dan Guru.
                Wijiga menyediakan berbagai layanan belajar melalui streaming
                Video Pembelajaran, berbagai Musik Edukasi anak, Materi-materi
                pembelajaran Anak Usia Dini berupa E-book, dan beberapa Games
                Edukasi yang bisa diakses melalui website Wijiga.
              </p>
              <p className="mt-3">
                <span className="mr-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-800">
                  Misi
                </span>
                Wijiga adalah menyediakan dan meningkatkan Pendidikan yang
                berkualitas untuk para guru dan anak usia dini melalui teknologi
                yang bisa diakses dimana pun dan kapan pun.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
