import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import { Application } from 'ioc:factory/Core'
import axios, { AxiosResponse } from 'axios'
import { createEmbed } from 'App/components/embeds'
import { RequestManager } from 'App/modules/requests/RequestManager'

@Command({
  scope: 'GUILDS',
  options: {
    name: 'clan-info',
    description: `Commande permettant d'avoir les informations d'un clan`,
    options: [
      {
        name: 'clan',
        description: 'Définir le nom du clan',
        type: 'STRING',
        required: true
      }
    ]
  }
})
export default class GetInfoCommand extends BaseCommand {
  public async run (interaction: CommandInteraction): Promise<void> {
    const client = Application.getClient()
    const clan = interaction.options.getString('clan')

    try {
      const clanData: AxiosResponse<any> = await axios({
        url: `https://api.rinaorc.com/clan/${clan}`,
        method: 'GET',
        headers: {
          'API-Key': RequestManager.getToken()
        }
      })

      const name: string = clanData.data['clan']['name']
      const id: string = clanData.data['clan']['id']
      const description: string = clanData.data['clan']['description']
      const level: string = clanData.data['clan']['level']
      const exp: string = clanData.data['clan']['experience']
      const expRequired: string = clanData.data['clan']['requiredExperience']
      const player: string = clanData.data['clan']['players'].length
      const playerMax: string = clanData.data['clan']['maxPlayers']
      const statues: string = clanData.data['clan']['status']

      const informationEmbed: MessageEmbed = createEmbed(`Informations du clan ${name}`, description)
        .addField('Nom:', String(name + ` ` + `(${id})`), true)
        .addField('Niveau:', String(level), true)
        .addField('Experience:', String(`${exp}/${expRequired}`), true)
        .addField('Joueurs:', String(`${player}/${playerMax}`), true)
        .addField('Statues:', String(statues), true)

      await interaction.reply({
        embeds: [informationEmbed],
        ephemeral: true
      })
      console.log(clanData.data)
    } catch (error) {
      await interaction.reply({
        embeds: [createEmbed("Une erreur est survenu.", error.toString())],
        ephemeral: true
      })
    }
  }
}
