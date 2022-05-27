import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import { CommandInteraction, Interaction } from 'discord.js'
import { Application } from 'ioc:factory/Core'
import { createEmbed } from 'App/components/embeds'
import { ServerData } from 'App/modules/requests/server/ServerData'

@Command({
  scope: 'GUILDS',
  options: {
    name: 'server-info',
    description: 'Commande pour avoir les informations sur le serveur',
    options: []
  }
})
export default class GetInfoCommand extends BaseCommand {
  public async run (interaction: CommandInteraction): Promise<void> {
    try {
      await new ServerData().registerServer(interaction)
    } catch (error) {
      await interaction.reply({
        embeds: [createEmbed("Une erreur est survenu.", error.toString())],
        ephemeral: true
      })
    }
  }
}
