import {MessageEmbed} from "discord.js";
import {Colors} from "@discord-factory/colorize";
const data = require('../../config.json')

export function createEmbed(title, description, footer) {
    return new MessageEmbed({
        title: title,
        color: Colors.SKY_600,
        description: description,
        footer: {
            text: footer,
            iconURL: data.embeds.icon
        }
    })
}