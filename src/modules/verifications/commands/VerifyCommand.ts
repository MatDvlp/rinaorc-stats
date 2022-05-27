import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import { CommandInteraction } from 'discord.js'
import axios, { AxiosResponse } from 'axios'
import { RequestManager } from 'App/modules/requests/RequestManager'
import { createEmbed } from 'App/components/embeds'

@Command({
  scope: 'GUILDS',
  options: {
    name: 'verify',
    description: 'Vérifier si un compte Rinaorc vous appartient.',
    options: [
      {
        name: 'pseudo',
        description: 'Définir le pseudo du compte Rinaorc',
        type: 'STRING',
        required: true
      }
    ]
  }
})
export default class VerifyCommand extends BaseCommand {
  public async run (interaction: CommandInteraction): Promise<void> {
    const pseudo: string | null = interaction.options.getString('pseudo')
    try {
      const data: AxiosResponse<any> = await axios({
        url: `https://api.rinaorc.com/player/${pseudo}`,
        method: 'GET',
        headers: {
          'API-Key': RequestManager.getToken()
        }
      })

      const targetID = data.data['player']['links']['discord']

      if (targetID === interaction.member!.user.id) {
        await interaction.reply({
          embeds: [createEmbed('Vérification terminé', 'Ce compte vous appartient.')],
          ephemeral: true
        })
      } else {
        await interaction.reply({
          embeds: [createEmbed('Vérification terminé', 'Ce compte ne vous appartient pas.')],
          ephemeral: true
        })
      }

    } catch (error) {
      await interaction.reply({
        embeds: [createEmbed('Une erreur est survenu.', error.toString())],
        ephemeral: true
      })
    }
  }
}
