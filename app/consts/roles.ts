/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */
export const roles = {
  fieldAgent: "Extensionista", // field agent (main user) accountable to the IAM,IP branch manager
  provincialManager: "Gestor Provincial", // the IAM,IP branch manager (oversees all the branch field agents) accountable to the IAM,IP
  coopManager: "Gestor-Promotor [AMPCM]", // cooperative manager accountable to the AMPCM manager
  ampcmSupervisor: "Supervisor [AMPCM]", // the AMPCM manager (oversees all coop managers) accountable to the AMPCM
  haveReadAndWritePermissions: ["Extensionista", "Gestor-Promotor [AMPCM]"],
  haveReadAndValidatePermissions: ["Gestor Provincial", "Supervisor [AMPCM]"],
};
