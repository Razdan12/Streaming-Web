const akunRepo = require("./akunRepo");

const createAccounts = async (userId, packageId) => {
  const user = await akunRepo.findUser(userId);

  if (!user) {
    return { status: 404, data: { error: "User not found" } };
  }

  const newPackage = await akunRepo.findPackage(packageId);
  const masaAktif = newPackage.masaAktif;
  const date = new Date(new Date().getTime() + masaAktif * 24 * 60 * 60 * 1000);
  if (!newPackage) {
    return { status: 404, data: { error: "Package not found" } };
  }

  if (!user.akun) {
    user.akun = [];
  }

  const accountsToCreate = newPackage.kapasitas - user.akun.length;

  if (accountsToCreate <= 0) {
    return {
      status: 400,
      data: {
        error:
          "User has already reached the maximum number of accounts for their package",
      },
    };
  }

  await akunRepo.updateUser(userId, newPackage.id, date);

  const createdAccounts = await akunRepo.createAccounts(
    userId,
    accountsToCreate
  );

  return {
    status: 201,
    data: { message: `${createdAccounts.count} accounts created ` },
  };
};

const tambahProfil = async (idUser, jumlah) => {
  const user = await akunRepo.findUser(idUser);

  if (!user) {
    return { status: 404, data: { error: "User not found" } };
  }
  const createdAccounts = await akunRepo.createAccounts(idUser, jumlah);
  return createdAccounts;
};

const getProfil = async (id) => {
  try {
    const profil = await akunRepo.getAkunById(id);
    return profil;
  } catch (error) {
    return "profil tidak ditemukan";
  }
};

const updateProfil = async (id, name, picture, status) => {
  try {
    const profilData = { name, picture, status };
    const profil = await akunRepo.updateAccount(id, profilData);
    return profil;
  } catch (error) {
    throw error;
  }
};

const deleteProfilByUser = async (idUser) => {
  try {
    const deleteProfil = await akunRepo.deleteAccountsByUser(idUser);
    return deleteProfil;
  } catch (error) {
    throw error;
  }
};

const getProfilUser = async (idUser) => {
  return response = await akunRepo.getAkunByUser(idUser)
}

const deleteProfilById = async (id) => {
  return response = await akunRepo.deleteAccountsById(id)
}

module.exports = {
  createAccounts,
  getProfil,
  updateProfil,
  deleteProfilByUser,
  tambahProfil,
  getProfilUser,
  deleteProfilById
};
