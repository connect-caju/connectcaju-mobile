/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */
export const errorMessages = {
  automaticInvalidationMessage: {
    invalidationMessage: "Caro usuário, detectou-se inconformidades desses dados. Por favor, verifique e corrija onde for necessário."
  },
  farmlandAndBlockConformity: {
    title: "Dados Inconsistentes",
    message:
      "O total dos cajueiros e a área do pomar não correspondem com os dados desta parcela.",
    logFlag: "Farmland data inconsistencies",
    showCancelButton: false,
    showConfirmButton: true,
    cancelText: "",
    confirmText: "  OK  ",
    // invalidationMessage: 'O sistema invalidou este registo porque verificou-se a inconsistência entre o total dos cajueiros e a soma dos cajueiros dos blocos.',
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },

  blockTreesConformityError: {
    title: "Parcelas com cajueiros",
    message:
      "O registo das parcelas com cajueiros não terminou ainda. Pretendes adicionar outra parcela?",
    logFlag: "Farmland data inconsistencies",
    showCancelButton: true,
    showConfirmButton: true,
    cancelText: "  Não  ",
    confirmText: "  Sim  ",
    invalidationMessage:
      "Caro usuário, detectou-se que este pomar tem parcelas de cajueiros que não foram registadas. Por favor, complete o registo, adicionando mais parcelas com cajueiros.",
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },

  farmlandWithNoBlockError: {
    title: "Parcelas com cajueiros",
    message:
      "Este pomar ainda não tem parcelas de cajueiros. Pretendes adicionar parcela?",
    logFlag: "Farmland with no blocks",
    showCancelButton: true,
    showConfirmButton: true,
    cancelText: "  Não  ",
    confirmText: "  Sim  ",
    invalidationMessage:
      "Caro usuário, detectou-se que este pomar possui dados incompletos. Por favor, complete o registo, adicionando dados sobre as parcelas deste pomar.",
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },

  blockAreaConformityError: {
    title: "Área do pomar",
    message:
      "A área total é inferior à soma das áreas das parcelas. Pretendes corrigir essa inconsistência?",
    logFlag: "Farmland data inconsistencies",
    showCancelButton: true,
    showConfirmButton: true,
    cancelText: "  Não  ",
    confirmText: "  Sim  ",
    invalidationMessage:
      "Caro usuário, detectou-se que a área total deste pomar é inferior à soma das áreas das parcelas. Por favor, corrija os dados, rectificando a área por parcela com cajueiros.",
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },

  farmlandError: {
    title: "Dados Inválidos",
    message: "Corrija dados não válidos!",
    // logFlag: 'Network request failed',
    showCancelButton: true,
    showConfirmButton: false,
    cancelText: "  OK  ",
    confirmText: "",
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },

  network: {
    title: "Conexão Internet",
    message: "Verifique a sua Internet!",
    logFlag: "Network request failed",
    showCancelButton: false,
    showConfirmButton: true,
    cancelText: "",
    confirmText: "  OK  ",
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },
  server: {
    title: "Erro do serviço",
    message:
      "O servidor não respondeu positivamente. Volte a tentar mais tarde!",
    logFlag: "Host",
    showCancelButton: false,
    showConfirmButton: true,
    cancelText: "",
    confirmText: "  OK  ",
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },
  signIn: {
    title: "Credenciais Inválidas",
    message: "O endereço electrónico ou a senha  inválido!",
    logUsernameFlag: "username",
    logPasswordFlag: "password",
    showCancelButton: false,
    showConfirmButton: true,
    cancelText: "",
    confirmText: "  OK  ",
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },
  signUp: {
    title: "Credenciais Reconhecidas",
    message: "Já tens uma conta. Fazer o login?",
    logFlag: "name already in use",
    showCancelButton: true,
    showConfirmButton: true,
    cancelText: "  Não  ",
    confirmText: "  Sim  ",
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },
  addPhoto: {
    title: "Fotografia",
    message: "Pretendes carregar uma nova fotografia?",
    logFlag: "photo",
    showCancelButton: true,
    showConfirmButton: true,
    cancelText: "  Não  ",
    confirmText: "  Sim  ",
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },

  resourceValidation: {
    title: "Deferimento do Registo",
    message:
      "Após o deferimento, não será possível alterar dados associados a este registo. Pretendes deferir este registo?",
    logFlag: "dataValidation",
    showCancelButton: true,
    showConfirmButton: true,
    cancelText: "  Não  ",
    confirmText: "  Sim  ",
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },
  resourceInvalidation: {
    title: "Indeferimento do Registo",
    message:
      "Após o indeferimento, o usuário irá alterar esse registo e será redeferido a posterior. Pretendes indeferir o registo?",
    logFlag: "dataInvalidation",
    showCancelButton: true,
    showConfirmButton: true,
    cancelText: "  Não  ",
    confirmText: "  Sim  ",
    onCancelPressed: () => { },
    onConfirmPressed: () => { },
  },
};
