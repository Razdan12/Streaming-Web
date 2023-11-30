import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import LayoutProfile from "../../component/LayoutProfile";
import Logo from "../../assets/logo.png";
import LogoFooter from "../../assets/LOGO WJG OPSI REVISI b 1.png";
import { useStore } from "../../store/Store";
import api from "../../Api/api";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 100,
  },
  teksTop1: {
    fontSize: 9,
    marginVertical: 3,
    flexBasis: "35%",
  },
  teksTop2: {
    fontSize: 9,
    marginVertical: 3,
    flexBasis: "65%",
  },
  VIewBase: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  ViewChild1: {
    flexDirection: "row",
    marginLeft: 10,
    flexBasis: "46%",
  },
  ViewChild2: {
    flexBasis: "100%",
  },
  ViewChild3: {
    flexDirection: "row",
  },
  TeksTabelHeader: {
    fontSize: 10.5,
    textAlign: "center",
    margin: 5,
  },
  TeksTabelContent: {
    fontSize: 10,
    textAlign: "left",
    margin: 5,
  },
  VIewBaseTabel: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tableHeader1: {
    backgroundColor: "#CECECE",
    justifyContent: "space-between",
    flexBasis: "30%",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableConten1: {
    justifyContent: "space-between",
    flexBasis: "30%",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableHeader2: {
    backgroundColor: "#CECECE",
    justifyContent: "space-between",
    flexBasis: "10%",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableConten2: {
    justifyContent: "space-between",
    flexBasis: "10%",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableHeader3: {
    backgroundColor: "#CECECE",
    justifyContent: "space-between",
    flexBasis: "35%",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableConten3: {
    justifyContent: "space-between",
    flexBasis: "35%",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableHeader4: {
    backgroundColor: "#CECECE",
    justifyContent: "space-between",
    flexBasis: "20%",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableConten4: {
    justifyContent: "space-between",
    flexBasis: "20%",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableTotal: {
    justifyContent: "space-between",
    flexBasis: "75%",
    textAlign: "center",
  },
  tableTTd: {
    justifyContent: "space-between",
    flexBasis: "40%",
    marginTop: 30,
    textAlign: "center",
  },
});

const Invoice: React.FC = () => {
  const { idTransaksi, token } = useStore();
  const [transaksi, setTransaksi] = useState<any>();

  const dataTransaksi = async () => {
    const response = await api.GetInvoiceUser(token, idTransaksi);
    setTransaksi(response.data);
  };
  useEffect(() => {
    dataTransaksi();
  }, []);

  const tanggal = (tanggal: any) => {
    const tanggalSekarang: Date = new Date(tanggal);

    const opsi: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return tanggalSekarang.toLocaleDateString("id-ID", opsi);
  };

  const rangeTanggal = () => {
    const tanggalSekarang: Date = new Date(transaksi?.tanggalBayar);
    const tanggalKedepan: Date = new Date(tanggalSekarang);

    tanggalKedepan.setDate(tanggalSekarang.getDate() + transaksi?.masaAktif);

    const opsi: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return (
      tanggalSekarang.toLocaleDateString("id-ID", opsi) +
      " - " +
      tanggalKedepan.toLocaleDateString("id-ID", opsi)
    );
  };

  const kodeBayar: string = transaksi?.kodePembayaran;
  const Code: string =
    kodeBayar?.slice(0, 3) + "*".repeat(kodeBayar?.length - 3);

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Invoice</Text>
          <Image style={styles.logo} src={Logo} />
        </View>
        <View style={{ borderTop: "1 solid black", marginBottom: 20 }} />
        <Text style={{ fontSize: 11, fontWeight: "bold" }}>Kepada Yth:</Text>
        <View style={styles.VIewBase}>
          <View style={styles.ViewChild1}>
            <View style={styles.ViewChild2}>
              {transaksi?.siplahData?.map((item: any) => (
                <View>
                  <View style={styles.ViewChild3}>
                    <Text style={styles.teksTop1}>Nama Instansi</Text>
                    <Text style={styles.teksTop2}>: {item?.namaInstansi}</Text>
                  </View>
                  <View style={styles.ViewChild3}>
                    <Text style={styles.teksTop1}>No Telfon</Text>
                    <Text style={styles.teksTop2}>: {item?.noTelfon}</Text>
                  </View>
                  <View style={styles.ViewChild3}>
                    <Text style={styles.teksTop1}>Alamat Instansi</Text>
                    <Text style={styles.teksTop2}>: {item?.alamat}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.ViewChild3}>
                <Text style={styles.teksTop1}>Email Instansi</Text>
                <Text style={styles.teksTop2}>: {transaksi?.email}</Text>
              </View>
            </View>
          </View>
          <View style={styles.ViewChild1}>
            <View style={styles.ViewChild2}>
              <View style={styles.ViewChild3}>
                <Text style={styles.teksTop1}>No Invoice</Text>
                <Text style={styles.teksTop2}>: {transaksi?.noInvoice}</Text>
              </View>
              <View style={styles.ViewChild3}>
                <Text style={styles.teksTop1}>Tanggal Pembayaran</Text>
                <Text style={styles.teksTop2}>
                  : {tanggal(transaksi?.tanggalBayar)}
                </Text>
              </View>
              <View style={styles.ViewChild3}>
                <Text style={styles.teksTop1}>Paymeny Method</Text>
                <Text style={styles.teksTop2}>
                  : {transaksi?.paymentMethod}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.VIewBaseTabel}>
          <View style={styles.tableHeader1}>
            <Text style={styles.TeksTabelHeader}>Nama Barang</Text>
          </View>
          <View style={styles.tableHeader2}>
            <Text style={styles.TeksTabelHeader}>Qty</Text>
          </View>
          <View style={styles.tableHeader3}>
            <Text style={styles.TeksTabelHeader}>Keterangan</Text>
          </View>
          <View style={styles.tableHeader4}>
            <Text style={styles.TeksTabelHeader}>Harga</Text>
          </View>
          <View style={styles.tableHeader4}>
            <Text style={styles.TeksTabelHeader}>Total</Text>
          </View>
        </View>
        <View style={styles.VIewBaseTabel}>
          <View style={styles.tableConten1}>
            <Text style={styles.TeksTabelContent}>
              Paket {transaksi?.namaPaket}
            </Text>
            <Text style={styles.TeksTabelContent}>
              ( {transaksi?.jumlahAkun} Akun )
            </Text>
          </View>
          <View style={styles.tableConten2}>
            <Text style={styles.TeksTabelHeader}>
              {transaksi?.masaAktif} Hari
            </Text>
          </View>
          <View style={styles.tableConten3}>
            <Text style={styles.TeksTabelContent}>
              Kode Pembayaran : {Code}
            </Text>
            <Text style={styles.TeksTabelContent}>
              Masa Aktif : {rangeTanggal()}
            </Text>
          </View>
          <View style={styles.tableConten4}>
            <Text style={styles.TeksTabelHeader}>Rp. {transaksi?.harga}</Text>
          </View>
          <View style={styles.tableConten4}>
            <Text style={styles.TeksTabelHeader}>Rp. {transaksi?.harga}</Text>
          </View>
        </View>
        <View style={styles.VIewBaseTabel}>
          <View style={styles.tableTotal} />
          <View style={styles.tableConten4}>
            <Text style={styles.TeksTabelContent}>Sub Total</Text>
            <Text style={styles.TeksTabelContent}>Diskon</Text>
          </View>
          <View style={styles.tableConten4}>
            <Text style={styles.TeksTabelContent}>Rp. {transaksi?.harga}</Text>
            <Text style={styles.TeksTabelContent}>Rp. 0</Text>
          </View>
        </View>
        <View style={styles.VIewBaseTabel}>
          <View style={styles.tableTotal} />
          <View style={styles.tableConten4}>
            <Text style={styles.TeksTabelContent}>Total Pembayaran</Text>
          </View>
          <View style={styles.tableConten4}>
            <Text style={styles.TeksTabelContent}>Rp. {transaksi?.harga}</Text>
          </View>
        </View>
        <View style={styles.VIewBaseTabel}>
          <View style={styles.tableTotal} />
          <View style={styles.tableTTd}>
            <Text style={styles.TeksTabelHeader}>
              Bekasi, {tanggal(transaksi?.tanggalBayar)}
            </Text>
            <Text style={styles.TeksTabelHeader}>Mengetahui,</Text>
            <Image style={styles.logo} src={Logo} />
            <Text style={{ fontSize: 11, textDecoration: "underline" }}>
              SRI WIDIAHAYATI
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              Direktur Utama
            </Text>
          </View>
        </View>

        <View style={{ borderTop: "1 solid black", marginTop: 30 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View>
            <Text style={{fontSize: 17}}>PT. WIJIGA WIDYA PERMATA</Text>
            <Text style={{fontSize: 9}}>SKU, Jl. Libra BLOK A17 No.02C RT.001/RW.001 Kel. Mekarsari Kec. Tambun Selatan, Kab. Bekasi 17510</Text>
            <Text style={{fontSize: 9}}>Telp : 0821-2402-8972, Email : WijigaWidyaPermata@gmail.com</Text>
          </View>
          <View>
            <Image style={{width: 60}} src={LogoFooter} />
          </View>
        </View>
      </Page>
    </Document>
  );
  return (
    <>
      <LayoutProfile id="invoice">
        <PDFViewer className="w-full min-h-screen">
          <MyDocument />
        </PDFViewer>
      </LayoutProfile>
    </>
  );
};

export default Invoice;
