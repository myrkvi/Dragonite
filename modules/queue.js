
const prettyMs = require('pretty-ms');

module.exports = {
    name: "queue",
    aliases: [],    
    helpDesc: "Shows the current list of songs",
    helpTitle: "Queue <page #>",
    cat: "music",
    run: async (bot, message, args) => {
        var dragonite = `../Dragonite.js`;
    
        const server = bot.servers[message.guild.id];					

        var page = 0;
        var pages = Math.floor((server.queue.length - 1) / 10) + 1;
        var totalTimeLeft = 0;

        if(!server.queue){
            message.channel.send("I\'m not playing anything yet");
            return;
        }

        if(args[1]){
            page = Number.parseInt(args[1]) - 1;
        }

        if(page >= pages){
            page = pages - 1;
        }

        for(var i = 0; i < server.queue.length; i++){
            totalTimeLeft += server.queue[i].time;
        }

        totalTimeLeft -= server.dispatcher.totalStreamTime;

        var queueS = "__Page **" + (page + 1) + "** of **" + pages + "**__\n";

        queueS += "Now playing " + server.queue[0].title + " by " + server.queue[0].author + "\n";
        queueS += "Time left: `" + prettyMs(totalTimeLeft) + "` Songs left: `" + (server.queue.length - 1) + "`\n\n";
        for(var i = 1; (10 * page + i) < server.queue.length && i <= 10; i++){
            queueS += "`[" + (i + 10 * page) + "]` " + server.queue[i + 10 * page].title + " by " + server.queue[i + 10 * page].author + " \n";
        }

        queueS += "\nUse the Queue command with a page number to see other pages";
        message.channel.send(queueS);
    }
}