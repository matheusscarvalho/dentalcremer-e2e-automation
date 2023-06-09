import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    usuarios: {
      dentista: {
        email: "teste@teste.com",
        senha: "teste@123"
      }
    },
    item: {
      id: "356823",
      name: "Silicone de Condensação Perfil - Vigodent",
      url: "/silicone-de-condensac-o-perfil-coltene.html",
      images: {
        default: "https://cdn.dentalcremer.com.br/produtos/210/silicone-de-condensacao-perfil-vigodent-113934-dental-cremer.jpg"
      },
      description: "Kit com 1 pote de Perfil Denso com 1Kg + 1 bisnaga de Base de Perfil Fluido com 120g + 1 bisnaga de Catalisador Perfil Cub com 50g.",
    }
  },
  defaultCommandTimeout: 60000,
  requestTimeout: 60000,
  responseTimeout: 60000,
  retries: {
    runMode: 2,
    openMode: 2
  },
  chromeWebSecurity: false,
  video: false,
  e2e: {
    baseUrl: 'https://staging01.dentalcremer.com.br/'
  },
})