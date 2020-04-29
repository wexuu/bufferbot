const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const sqlite = require('sqlite3').verbose();
var lastbuffer;
lastbuffer = 0;
let interval;


var currentdate = new Date(); 
var datetime = " " + currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes();


        client.once('ready', () => {
            console.log('Ready!');
            client.user.setActivity('You', { type: 'WATCHING' });
            let db  = new sqlite.Database(`./blip.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)
        })
            client.on('message', message => {

                let db  = new sqlite.Database(`./blip.db`, sqlite.OPEN_READWRITE);
                db.run(`CREATE TABLE IF NOT EXISTS bufferpoints(userid INTEGER NOT NULL, points NUMBER NOT NULL)`)    

                if(message.content.startsWith(`${prefix}bufferstart`)){
                    message.delete()
                    if(message.member.roles.cache.find(r => r.name === "Donations")) {
                    const bstartembed = new Discord.MessageEmbed()
                    .setTitle('Buffer reminders')
                    .setColor('#0BFFC8')
                    .setDescription('Buffer reminders are now ' + "**" + "enabled!" + "**")
                    message.channel.send(bstartembed)
                    interval = setInterval(function(){
                    lastbuffer++;
                    const Buffer = new Discord.MessageEmbed()
                    .setColor('#FF6501')
                    .setTitle("**It's time to check buffers!**")
                    .setDescription("**It's been **" + "`" + lastbuffer + " Hour" + "`" + "** since last buffercheck, <@&675688526460878848>**." + " **Check now!**")
                    .setThumbnail('https://art.pixilart.com/88534e2f28b65a4.png')
                    .setFooter('WEEEEEWOOOOO')
                    .setTimestamp();
                    client.channels.cache.get("705099481586073641").send('<@&675688526460878848>').then(msg => {
                        msg.delete();
                    })
                        client.channels.cache.get("705099481586073641").send(Buffer).then(msg => {
                            msg.delete({timeout: 3599000})
                        });
                    }, 3600000)
                } else {
                    message.channel.send("don't know what to put here")
                }               
            }
       
                let userid = message.author.toString()
                let query = `SELECT * FROM bufferpoints WHERE userid = ?`
                db.get(query, [userid], (err, row) => {
                    if(err) throw err;
                                if (message.content.startsWith(`${prefix}bclear`)) {
                                    message.delete()
                                    
                                    if(message.member.roles.cache.find(r => r.name === "Walls")) {
                                    var bufferpierwszy = 1;
                                        row.points++;
                                        db.run(`UPDATE bufferpoints SET points = ? WHERE userid = ?`, [row.points, userid])
                 
                                    clearInterval(interval);
      
                                    const BufferClear = new Discord.MessageEmbed()
        
                                        .setColor('#1DFF98')
                                        .setTitle('**Buffers are clear!**')
                                        .setDescription ('👑 Buffers are CLEAR! 👑')
                                        .addField("Checked by: ", message.author.toString(), true)
                                        .addField("Points: ", row.points, true)
                                        .setTimestamp()
                                        .setFooter('Buffers clear. Now go grind!')
        
                                        interval = setInterval(function(){
                                            lastbuffer++;
                                            const Buffer = new Discord.MessageEmbed()
                                            .setColor('#8300FF')
                                            .setTitle("**It's time to check buffers!**")
                                            .setDescription("**It's been **" + "`" + lastbuffer + " Hour" + "`" + "** since last buffercheck, <@&675688526460878848>**." + " **Check now!**")
                                            .setThumbnail('https://art.pixilart.com/88534e2f28b65a4.png')
                                            .setFooter('WEEEEEWOOOOO')
                                            .setTimestamp();
                                               client.channels.cache.get("705099481586073641").send('<@&675688526460878848>').then(msg => {
                                                msg.delete();
                                            })
                                                client.channels.cache.get("705099481586073641").send(Buffer).then(msg => {
                                                    msg.delete({timeout: 3599000})
                                                });
                                        },3600000)
        
                                    message.channel.send(BufferClear);
                                    lastbuffer = 0;
                                    } else {
                                        message.channel.send('stop it')
                                    }
                                }
                                
                                  if (message.content.startsWith(`${prefix}bfound`)) {
        
                                    message.delete()

                                    if(message.member.roles.cache.find(r => r.name === "Walls")) {

                                    clearInterval(interval);


        
                                    const BufferNClear = new Discord.MessageEmbed()
                                        .setColor('#FF0000')
                                        .setTitle('Buffers are NOT clear!')
                                        .setDescription('Enemies are building a cannon on us!')
                                        .addField("Triggered By: ", message.author.toString(), true)
                                        .addField("Time triggered:", datetime, true)
                                        .setTimestamp()
                                        .setFooter('we got splitL')
                                        
        
                                    client.channels.cache.get("705099481586073641").send("<@&675688526460878848> Stay alert! Enemies on our walls!")
                                    client.channels.cache.get("705099481586073641").send("<@&675688526460878848> Stay alert! Enemies on our walls!")
                                    client.channels.cache.get("705099481586073641").send("<@&675688526460878848> Stay alert! Enemies on our walls!")
                                    client.channels.cache.get("705099481586073641").send(BufferNClear)
                                    lastbuffer = 0;  
                                    interval = setInterval(function(){
                                        lastbuffer++;
                                        const Buffer = new Discord.MessageEmbed()
                                        .setColor('#8300FF')
                                        .setTitle("**It's time to check buffers!**")
                                        .setDescription("**It's been **" + "`" + lastbuffer + " Hour" + "`" + "** since last buffercheck, <@&675688526460878848>**." + " **Check now!**")
                                        .setThumbnail('https://art.pixilart.com/88534e2f28b65a4.png')
                                        .setFooter('WEEEEEWOOOOO')
                                        .setTimestamp();
                                        client.channels.cache.get("705099481586073641").send('<@&675688526460878848>').then(msg => {
                                            msg.delete();
                                        })
                                            client.channels.cache.get("705099481586073641").send(Buffer).then(msg => {
                                                msg.delete({timeout: 3599000})
                                            });
                                    },3600000) 
                                 
                                } else {
                                    message.channel.send('no perms so fuck off')
                                }
                                }
                                if(message.content.startsWith(`${prefix}bufferstop`)) {
                                    message.delete()
                                    if(message.member.roles.cache.find(r => r.name === "Donations")) {
                                    clearInterval(interval);
                                    const bstopembed = new Discord.MessageEmbed()
                                    .setTitle('Buffer reminders')
                                    .setColor('#0BFFC8')
                                    .setDescription('Buffer reminders are now ' + "**" + "disabled!" + "**")
                                    message.channel.send(bstopembed)
                                    } else {
                                        message.channel.send('nononono')
                                    }
                                }
                                if(message.content.startsWith(`${prefix}btop`)){
                                    message.delete()
                                    if(message.member.roles.cache.find(r => r.name === "Walls")) {
                                        let splitMessage = message.content.split(" ");
                                            btoppage = splitMessage[1];
                                            if(!btoppage) {
                                                var description = ""
                                    let all = `SELECT userid , points FROM bufferpoints ORDER BY points DESC LIMIT 20;`
                                    db.all(all, (err, row) => {
                                        if(err) throw err;
                                    const topembed = new Discord.MessageEmbed()
                                        .setColor('#FF760B')
                                        .setTitle(message.guild.name + "'s TOP Buffercheckers!")
                                        .setTimestamp()  
                                        let i = 0;
                                            row.forEach(function (row) {
                                                i++;
                                                if(row.points === 0) {
                                                    return;
                                                }
                                            description +=` ${i}. ` + row.userid + `** - ${row.points}**\n`
                                        })
                                        
                                        topembed.setDescription(description)
                                        message.channel.send(topembed)
                                    })
                                } 
                                            } else {
                                                message.channel.send('Why u tryna inside')
                                            }
                            
                                }

                            })
                            
            
                        
                        
                        })      

                                
        
    
 client.login(process.env.BOT_TOKEN);
