import {MessageEmbed} from "discord.js";
import {Colors} from "@discord-factory/colorize";
const data = require('../../config.json')
export function createEmbed(title, description) {
    return new MessageEmbed({
        title: title,
        color: Colors.INVISIBLE,
        description: description,
        author: {
            iconURL: data.embeds.rinaorc,
            name: 'Rinaorc API'
        },
        footer: {
            text: "Transfert de données par Rinaorc",
            iconURL: data.embeds.rinaorc
        },
        timestamp: Date.now()
    })
}
