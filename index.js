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
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();


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
                    client.channels.cache.get("700489735352746045").send('<@&675688526460878848>').then(msg => {
                        msg.delete();
                    })
                        client.channels.cache.get("700489735352746045").send(Buffer).then(msg => {
                            msg.delete({timeout: 3599000})
                        });
                    }, 3600000)
                };                   
                
                let userid = message.author.toString()
                let query = `SELECT * FROM bufferpoints WHERE userid = ?`
                db.get(query, [userid], (err, row) => {
                    if(err) throw err;
                                if (message.content.startsWith(`${prefix}bclear`)) {
                                    message.delete()
                                    
                                    var bufferpierwszy = 1;
                                    if(row === undefined) {
                                      let insert = db.prepare(`INSERT INTO bufferpoints VALUES(?, ?)`)
                                      insert.run(userid, bufferpierwszy);

                                    } else {
                                        row.points++;
                                        db.run(`UPDATE bufferpoints SET points = ? WHERE userid = ?`, [row.points, userid])
                                    }
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
                                               client.channels.cache.get("700489735352746045").send('<@&675688526460878848>').then(msg => {
                                                msg.delete();
                                            })
                                                client.channels.cache.get("700489735352746045").send(Buffer).then(msg => {
                                                    msg.delete({timeout: 3599000})
                                                });
                                        },3600000)
        
                                    message.channel.send(BufferClear);
                                    lastbuffer = 0;
                                    }
                                 
                                  if (message.content.startsWith(`${prefix}bfound`)) {
        
                                    message.delete()

                                    clearInterval(interval);


        
                                    const BufferNClear = new Discord.MessageEmbed()
                                        .setColor('#FF0000')
                                        .setTitle('Buffers are NOT clear!')
                                        .setDescription('Enemies are building a cannon on us!')
                                        .addField("Triggered By: ", message.author.toString(), true)
                                        .addField("Time triggered:", datetime, true)
                                        .setTimestamp()
                                        .setFooter('we got splitL')
                                        
        
                                    client.channels.cache.get("700489735352746045").send("<@&675688526460878848> Stay alert! Enemies on our walls!")
                                    client.channels.cache.get("700489735352746045").send("<@&675688526460878848> Stay alert! Enemies on our walls!")
                                    client.channels.cache.get("700489735352746045").send("<@&675688526460878848> Stay alert! Enemies on our walls!")
                                    client.channels.cache.get("700489735352746045").send(BufferNClear)
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
                                        client.channels.cache.get("700489735352746045").send('<@&675688526460878848>').then(msg => {
                                            msg.delete();
                                        })
                                            client.channels.cache.get("700489735352746045").send(Buffer).then(msg => {
                                                msg.delete({timeout: 3599000})
                                            });
                                    },3600000) 
                                 } 
                                if(message.content.startsWith(`${prefix}bufferstop`)) {
                                    clearInterval(interval);
                                    const bstopembed = new Discord.MessageEmbed()
                                    .setTitle('Buffer reminders')
                                    .setColor('#0BFFC8')
                                    .setDescription('Buffer reminders are now ' + "**" + "disabled!" + "**")
                                    message.channel.send(bstopembed)
                                }
                                if(message.content.startsWith(`${prefix}btop`)){
                                    if(message.member.roles.cache.find(r => r.name === "Walls")) {
                                        var description = ""
                                    let all = `SELECT userid , points FROM bufferpoints ORDER BY points DESC LIMIT 10;`
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
                                } else {
                                    message.channel.send('Why u tryna inside');
                                }
                            
                                }

                            })
                            if(message.content.startsWith(`${prefix}poll`)) {
                                message.delete()
                                if(message.member.roles.cache.find(r => r.name === "Donations")) {
                                const args = message.content.slice(prefix.lenght).trim().split(/ +/g);
                                let poll = args.slice(1).join(" ")
                                const pollembed = new Discord.MessageEmbed()
                                .setColor(`#e43f5a`)
                                .setDescription(poll)
                                .setFooter("just vote")
                                .setTimestamp()
                                .setImage(message.author.avatarURL)
                                message.channel.send(pollembed).then(msg => {
                                    msg.react("✅")
                                    msg.react("❌")
                                })
                                



                            } else {
                                message.channel.send("can't do that")
                                return;
                            }
                            }    
                            var blacklist = ["obsop", "obs op", "freecamop", "freecam op"]
                            let found = false;
                            let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "i have a little dick")
                            for(var i in blacklist) {
                            if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) found = true;
                            }
                            if(found === true) {
                                if(!message.author.bot) {
                                if(message.member.roles.cache.has(role.id)){
                                    return;
                                } else {
                                message.member.roles.add(role)
                                message.reply("Congratulations, your roles have been updated!")
                                }
                            } else {
                                return;
                            }
                            }
                            if(message.content.startsWith(`${prefix}gay`)) {
                                userid = message.mentions.members.first()
                                var gaynumber = Math.ceil(Math.random() * 101);
                                if(!userid) {
                                    userid = message.author.id
                                    const gayembed = new Discord.MessageEmbed()
                                    .setColor(`#FF00F7`)
                                    .setDescription("🏳️‍🌈 <@" + userid + "> is **" + gaynumber + "%** gay 🏳️‍🌈")
                                    message.channel.send(gayembed)
                                } else {
                                    const gayembed = new Discord.MessageEmbed()
                                    .setColor(`#FF00F7`)
                                    .setDescription("🏳️‍🌈 <@" + userid + "> is **" + gaynumber + "%** gay 🏳️‍🌈")
                                    message.channel.send(gayembed)
                                }
                                
                            }
                            if(message.content.startsWith(`${prefix}bwords`)) {
                                message.delete()
                                if(message.member.roles.cache.find(r => r.name === "Walls")) {
                                    message.channel.send("Blacklisted words: \n" + blacklist)
                                }
                            }
                            
                        
                        
                        
                        
                        })
                        
                        
                        
                            

                                
        
    
 client.login(process.env.BOT_TOKEN);
