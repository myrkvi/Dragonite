const Discord = require('discord.js');
const prettyMs = require('pretty-ms');
const bot = null;

exports.run = (bot) => {
    var dragonite = `./Dragonite.js`;
	this.bot = bot;


	try{
		//Color for Join Logs //#4760ff
		bot.client.on("guildMemberAdd", (member) => {
			let server = bot.servers[member.guild.id];
			
			if(server.loggingEnabled != "true" || server.loggingJoin != "true"){
				return;
			}
			

			var joinEmbed = new Discord.MessageEmbed()
				.setColor("#4760ff")
				.setTitle("User joined!")
				.setThumbnail(member.user.displayAvatarURL())
				.setDescription(`${member} has joined!\n${member.guild.memberCount} users in this guild.`)
				.setTimestamp(new Date());

			try{
				if(server.userLogChannel != undefined){
					server.userLogChannel.send({embed: joinEmbed});
				} else {
					server.logChannel.send({embed: joinEmbed});
				}
			} catch(err){
				console.log(err);
			}
			
		});

		bot.client.on("guildMemberRemove", (member) => {
			let server = bot.servers[member.guild.id];
			
			if(server.loggingEnabled != "true" || server.loggingJoin != "true"){
				return;
			}
			

			var joinEmbed = new Discord.MessageEmbed()
				.setColor("#4760ff")
				.setTitle("User joined!")
				.setThumbnail(member.user.displayAvatarURL())
				.setDescription(`${member} has left!\n${member.guild.memberCount} users in this guild.`)
				.setTimestamp(new Date());

			try{
				if(server.userLogChannel != undefined){
					server.userLogChannel.send({embed: joinEmbed});
				} else {
					server.logChannel.send({embed: joinEmbed});
				}
			} catch(err){
				console.log(err);
			}
		});
	} catch(err){
		console.log(err);
	}
	
	
	
	//User Welcome/Leave
}