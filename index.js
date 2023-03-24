const Discord = require("discord.js");

const client = new Discord.Client({ intents: ["GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILDS", "GUILD_PRESENCES"] });

const config = require("./config.json");

const usersToKick = ["426912659661783043", "878504858259427328"]; // Replace with the user IDs you want to kick.

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  if (usersToKick.includes(newState.member.user.id) && newState.channel) {
    const userPresence = newState.member.presence;
    const isMobile = userPresence && userPresence.clientStatus && userPresence.clientStatus.mobile;

    if (isMobile) {
      try {
        await newState.kick("Mobile devices are not allowed in voice channels.");
        console.log(`Kicked user ${newState.member.user.tag} from voice channel ${newState.channel.name}`);
      } catch (error) {
        console.error(`Failed to kick user ${newState.member.user.tag}:`, error);
      }
    }
  }
});

client.login(config.token);

