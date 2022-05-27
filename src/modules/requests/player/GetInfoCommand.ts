import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import { CommandInteraction, MessageEmbed, Snowflake } from 'discord.js'
import axios, { AxiosResponse } from 'axios'
import {createEmbed} from "App/components/embeds";
import {Application} from "ioc:factory/Core";
import { RequestManager } from 'App/modules/requests/RequestManager'

@Command({
  scope: 'GUILDS',
  options: {
    name: 'player-info',
    description: "Commande permettant d'avoir les informations d'un joueur",
    options: [
      {
        name: "pseudo",
        description: "Définir le pseudo du joueur",
        required: true,
        type: "STRING"
      }
    ]
  }
})
export default class GetInfoCommand extends BaseCommand {
  public async run (interaction: CommandInteraction): Promise<void> {
    const client = Application.getClient()
    const player = interaction.options.getString("pseudo");

    try {
      const playerData: AxiosResponse<any> = await axios({
        url: `https://api.rinaorc.com/player/${player}`,
        method: "GET",
        headers: {
          "API-Key": RequestManager.getToken()
        }
      })

      const pseudo: string = playerData.data["player"]["name"];
      const rank: string = playerData.data["player"]["rank"]["name"];
      let connectionMethod = playerData.data["player"]["connectionMethod"];
      if (connectionMethod === 'CRACK') connectionMethod = "Crack"; else if (connectionMethod === 'PREMIUM') connectionMethod = "Premium"; else connectionMethod = "Inconnu";
      const level: string = playerData.data["player"]["leveling"]["level"];
      const exp: string = playerData.data["player"]["leveling"]["experience"];
      let discordAsLink: string = playerData.data["player"]["links"]["discord"];
      if (discordAsLink === null) discordAsLink = "Aucun compte"; else discordAsLink = `<@${discordAsLink}>`
      const aura: string = playerData.data["player"]["aura"];
      let isConnected = playerData.data["player"]["isOnline"];
      if (isConnected === true) isConnected = "Oui"; else isConnected = "Non";
      let hasBoost: any = playerData.data["player"]["hasBoost"];
      if (hasBoost === true) hasBoost = "Oui"; else hasBoost = "Non";
      let boostMonths: any = playerData.data["player"]["boostMonths"];
      if (boostMonths === null) boostMonths = "Aucun"; else boostMonths = `${boostMonths} mois`;


      const informationEmbed: MessageEmbed = createEmbed(`Informations de ${pseudo}`, "Retrouvez ci-dessous les informations de cet utilisateur")
          .addField("Pseudonyme:", String(pseudo), true)
          .addField("Aura:", String(aura), true)
          .addField("Connexion:", String(connectionMethod), true)
          .addField("Connecté:", String(isConnected), true)
          .addField("Booster:", String(hasBoost), true)
          .addField("Mois de boost:", String(boostMonths), true)
          .addField("Grade:", String(rank), true)
          .addField("Niveau:", String(level), true)
          .addField("Experience:", String(exp), true)
          .addField("Compte Discord lié:", String(discordAsLink), true)


      await interaction.reply({
        embeds: [informationEmbed],
        ephemeral: true
      })

      console.log(playerData.data)
    } catch (error) {
      await interaction.reply({
        embeds: [createEmbed("Une erreur est survenu.", error.toString())],
        ephemeral: true
      })
    }
  }
}
