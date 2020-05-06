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
                    if(message.member.roles.cache.find(r => r.name === "Donations")) {
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
                    .setDescription("**It's been **" + "`" + lastbuffer + " Hour" + "`" + "** since last buffercheck, <@&696818317327073300>**." + " **Check now!**")
                    .setThumbnail('https://art.pixilart.com/88534e2f28b65a4.png')
                    .setFooter('WEEEEEWOOOOO')
                    .setTimestamp();
                    client.channels.cache.get("696819778995617792").send('<@&696818317327073300>').then(msg => {
                        msg.delete();
                    })
                        client.channels.cache.get("696819778995617792").send(Buffer).then(msg => {
                            msg.delete({timeout: 3599000})
                        });
                    }, 3600000)
                    } else {
                        message.channel.send('no')
                    }
                };                   
                
                let userid = message.author.toString()
                let query = `SELECT * FROM bufferpoints WHERE userid = ?`
                db.get(query, [userid], (err, row) => {
                    if(err) throw err;
                                if (message.content.startsWith(`${prefix}bclear`)) {
                                    if(message.member.roles.cache.find(r => r.name === "Walls")) {
                                    message.delete()
                                    
                                    var bufferpierwszy = 1;
                                    if(row === undefined) {
                                      let insert = db.prepare(`INSERT INTO bufferpoints VALUES(?, ?)`)
                                      insert.run(userid, bufferpierwszy);
                                      const BufferClear = new Discord.MessageEmbed()
        
                                      .setColor('#1DFF98')
                                      .setTitle('**Buffers are clear!**')
                                      .setDescription ('👑 Buffers are CLEAR! 👑')
                                      .addField("Checked by: ", message.author.toString(), true)
                                      .addField("Points: ", "1", true)
                                      .setTimestamp()
                                      .setFooter('Buffers clear. Now go grind!')
                                      message.channel.send(BufferClear);

                                    } else {
                                        row.points++;
                                        db.run(`UPDATE bufferpoints SET points = ? WHERE userid = ?`, [row.points, userid])
                                        const BufferClear = new Discord.MessageEmbed()
        
                                      .setColor('#1DFF98')
                                      .setTitle('**Buffers are clear!**')
                                      .setDescription ('👑 Buffers are CLEAR! 👑')
                                      .addField("Checked by: ", message.author.toString(), true)
                                      .addField("Points: ", row.points, true)
                                      .setTimestamp()
                                      .setFooter('Buffers clear. Now go grind!')
                                      message.channel.send(BufferClear);
                                    }
                                    clearInterval(interval);
      
        
                                        interval = setInterval(function(){
                                            lastbuffer++;
                                            const Buffer = new Discord.MessageEmbed()
                                            .setColor('#8300FF')
                                            .setTitle("**It's time to check buffers!**")
                                            .setDescription("**It's been **" + "`" + lastbuffer + " Hour" + "`" + "** since last buffercheck, <@&696818317327073300>**." + " **Check now!**")
                                            .setThumbnail('https://art.pixilart.com/88534e2f28b65a4.png')
                                            .setFooter('WEEEEEWOOOOO')
                                            .setTimestamp();
                                               client.channels.cache.get("706982848468615244").send('<@&696818317327073300>').then(msg => {
                                                msg.delete();
                                            })
                                                client.channels.cache.get("706982848468615244").send(Buffer).then(msg => {
                                                    msg.delete({timeout: 3599000})
                                                });
                                        },3600000)
        
                                    
                                    lastbuffer = 0;
                                    } else {
                                        return;
                                    }    
                                }
                                 
                                  if (message.content.startsWith(`${prefix}bfound`)) {
                                    if(message.member.roles.cache.find(r => r.name === "Walls")) {
        
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
                                        
        
                                    client.channels.cache.get("696819778995617792").send("<@&696818317327073300> Stay alert! Enemies on our walls!")
                                    client.channels.cache.get("696819778995617792").send("<@&696818317327073300> Stay alert! Enemies on our walls!")
                                    client.channels.cache.get("696819778995617792").send("<@&696818317327073300> Stay alert! Enemies on our walls!")
                                    client.channels.cache.get("696819778995617792").send(BufferNClear)
                                    lastbuffer = 0;  
                                    interval = setInterval(function(){
                                        lastbuffer++;
                                        const Buffer = new Discord.MessageEmbed()
                                        .setColor('#8300FF')
                                        .setTitle("**It's time to check buffers!**")
                                        .setDescription("**It's been **" + "`" + lastbuffer + " Hour" + "`" + "** since last buffercheck, <@&696818317327073300>**." + " **Check now!**")
                                        .setThumbnail('https://art.pixilart.com/88534e2f28b65a4.png')
                                        .setFooter('WEEEEEWOOOOO')
                                        .setTimestamp();
                                        client.channels.cache.get("696819778995617792").send('<@&696818317327073300>').then(msg => {
                                            msg.delete();
                                        })
                                            client.channels.cache.get("696819778995617792").send(Buffer).then(msg => {
                                                msg.delete({timeout: 3599000})
                                            });
                                    },3600000) 
                                 } 
                                }
                                if(message.content.startsWith(`${prefix}bufferstop`)) {
                                    if(message.member.roles.cache.find(r => r.name === "Donations")) {
                                    clearInterval(interval);
                                    const bstopembed = new Discord.MessageEmbed()
                                    .setTitle('Buffer reminders')
                                    .setColor('#0BFFC8')
                                    .setDescription('Buffer reminders are now ' + "**" + "disabled!" + "**")
                                    message.channel.send(bstopembed)
                                    } else {
                                        message.channel.send('no')
                                    }
                                }
                                if(message.content.startsWith(`${prefix}btop`)){
                                    if(message.member.roles.cache.find(r => r.name === "Walls")) {
                                        let splitMessage = message.content.split(" ")
                                        let btoppage = splitMessage[1]
                                        console.log(btoppage)
                                        if(!btoppage || btoppage === "1") {
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
                               
                                } else if(btoppage === "2"){
                                    var description = ""
                                    let all = `SELECT userid , points FROM bufferpoints ORDER BY points DESC LIMIT 20 OFFSET 20;`
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
                            }else {
                                message.channel.send('Why u tryna inside');
                            }
                                }
                            
                                }

                                  
                            )
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

                            if(message.content.startsWith(`${prefix}badd` )) {
                                if(message.member.roles.cache.find(r => r.name === "Donations")) {
                                    userid2 = message.mentions.members.first().toString()
                                    let query = `SELECT * FROM bufferpoints WHERE userid = ?`
                                        db.get(query, [userid2], (err, row) => {
                                            if(err) throw err;
                                let splitMessage = message.content.split(" ");
                                bufferstoadd = splitMessage[2];
                                    if(!userid2) {
                                        message.channel.send('Please mention somebody!');
                                    } else {
                                        if(row === undefined) {
                                            let insert = db.prepare(`INSERT INTO bufferpoints VALUES (?, ?)`)
                                            insert.run(userid2, bufferstoadd);
                                            const bufferembed = new Discord.MessageEmbed()
                                            .setColor(`#FF6600`)
                                            .setTitle(`🧾 Buffers Receipt!`)
                                            .setDescription(`Buffers added to: ${userid2}`)
                                            .addFields(
                                                {name: 'Buffers added: ', value: bufferstoadd},
                                                {name: 'Total Bufferchecks:', value: bufferstoadd},
                                                {name: 'Confirmed by:', value: `<@${message.author.id}>`}
                                            )
                                            .setTimestamp()
                                            .setFooter('nigels is gay')
                                                message.channel.send(bufferembed)
                                          } else {
                                              let tax2 = row.points + Number(bufferstoadd)
                                              db.run(`UPDATE bufferpoints SET points = ? WHERE userid = ?`, [tax2, userid2])
                                              const topembed = new Discord.MessageEmbed()
                                            .setColor(`#FF6600`)
                                            .setTitle(`🧾 Donation Receipt!`)
                                            .setDescription(`Buffers added to: ${userid2}`)
                                            .addFields(
                                                {name: 'Buffers added: ', value: bufferstoadd},
                                                {name: 'Total Bufferchecks:', value: tax2},
                                                {name: 'Confirmed by:', value: `<@${message.author.id}>`}
                                            )
                                            .setTimestamp()
                                            .setFooter('nigels is gay')
                                                message.channel.send(topembed)
                                          }
                                    
                                    }
                
                
                                
                        })
                                    } else {
                                        message.channel.send('no permsLLL');
                                    }
                            }
                            if(message.content.startsWith(`${prefix}bremove` )) {
                                if(message.member.roles.cache.find(r => r.name === "Donations")) {
                                    userid2 = message.mentions.members.first().toString()
                                    let query = `SELECT * FROM bufferpoints WHERE userid = ?`
                                        db.get(query, [userid2], (err, row) => {
                                            if(err) throw err;
                                let splitMessage = message.content.split(" ");
                                bufferstoremove = splitMessage[2];
                                    if(!userid2) {
                                        message.channel.send('Please mention somebody!');
                                    } else {
                                        if(row === undefined) {
                                            message.channel.send("Can't remove anything!")
                                          } else {
                                              let tax3 = row.points - Number(bufferstoremove)
                                              db.run(`UPDATE bufferpoints SET points = ? WHERE userid = ?`, [tax3, userid2])
                                              const bufferembed = new Discord.MessageEmbed()
                                            .setColor(`#FF6600`)
                                            .setTitle(`🧾 Donation Receipt!`)
                                            .setDescription(`Buffers removed from: ${userid2}`)
                                            .addFields(
                                                {name: 'Buffers removed: ', value: bufferstoremove},
                                                {name: 'Total Bufferchecks:', value: tax3},
                                                {name: 'Confirmed by:', value: `<@${message.author.id}>`}
                                            )
                                            .setTimestamp()
                                            .setFooter('nigels is gay')
                                                message.channel.send(bufferembed)
                                          }
                                    
                                    }
                
                
                                
                        })
                                    } else {
                                        message.channel.send('no permsLLL');
                                    }
                            }
                            if(message.content.startsWith(`${prefix}dm`)){
                                if(message.member.roles.cache.find(r => r.name === "Donations")) {
                                    const userd = message.mentions.members.first()
                                    const args = message.content.slice(prefix.lenght).trim().split(/ +/g);
                                    let messagemr = args.slice(2).join(" ")
                                    if (!args[0]) return message.reply('you need to provide a role')
                                    if (!args[1]) return message.reply('you need to provide a message')
                                    const role = message.mentions.roles.first()
                                    message.guild.roles.cache.get(role.id).members.forEach(member => member.send(messagemr))
                                        
                                        
                                                     
                            } } 
                            if(message.content.startsWith(`${prefix}gay`)){
                                userid = message.mentions.members.first()
                                if(!userid){
                                    userid = message.author.id
                                    gaypercentage = Math.ceil(Math.random() * 101)
                                    const gayemebed = new Discord.MessageEmbed()
                                    .setColor(`#FF00FF`)
                                    .setDescription(`🏳️‍🌈 <@${userid}> is **${gaypercentage}%** gay! 🏳️‍🌈`)
                                    message.channel.send(gayemebed)
                                } else {
                                    gaypercentage = Math.ceil(Math.random() * 101)
                                    const gayemebed = new Discord.MessageEmbed()
                                    .setColor(`#FF00FF`)
                                    .setDescription(`🏳️‍🌈 ${userid} is **${gaypercentage}%** gay! 🏳️‍🌈`)
                                    message.channel.send(gayemebed)
                                }
                            }  
                            if(message.content.startsWith(`${prefix}black`)){
                                userid = message.mentions.members.first()
                                if(!userid) {
                                    userid = message.author.id
                                    blackpercentage = Math.ceil(Math.random() * 101)
                                    if(blackpercentage >= 50){
                                        const blackembed = new Discord.MessageEmbed()
                                        .setColor('#000000')
                                        .setDescription(`<@${userid}> is black 🖤`)
                                        message.channel.send(blackembed)
                                    } else {
                                        const blackembed = new Discord.MessageEmbed()
                                        .setColor('#FFFFFF')
                                        .setDescription(`<@${userid}> is not black 🤍`)
                                        message.channel.send(blackembed)
                                    }
                                } else {
                                    blackpercentage = Math.ceil(Math.random() * 101) 
                                    if(blackpercentage >= 50){
                                        const blackembed = new Discord.MessageEmbed()
                                        .setColor('#000000')
                                        .setDescription(`${userid} is black 🖤`)
                                        message.channel.send(blackembed)
                                    } else {
                                        const blackembed = new Discord.MessageEmbed()
                                        .setColor('#FFFFFF')
                                        .setDescription(`${userid} is not black 🤍`)
                                        message.channel.send(blackembed)
                                    }
                                }
                            }
                            if(message.content.startsWith(`${prefix}coinflip`)) {
                                coinflip = Math.ceil(Math.random() * 2)
                                if(coinflip ===2){
                                    const coinembed = new Discord.MessageEmbed()
                                    .setDescription("It landed on **tails!**")
                                    message.channel.send(coinembed)
                                } else if (coinflip === 1){
                                    const coinembed = new Discord.MessageEmbed()
                                    .setDescription("It landed on **heads!**")
                                    message.channel.send(coinembed)
                                }
                            }
                            if(message.content.startsWith(`${prefix}ginger`)){
                                userid5 = message.mentions.members.first()
                                if(!userid5) {
                                    userid5 = message.author.id
                                    gingerpercentage = Math.ceil(Math.random() * 101)
                                    if(gingerpercentage >= 50){
                                        const gingerembed = new Discord.MessageEmbed()
                                        .setColor('#ca5116')
                                        .setDescription(`<@${userid5}> is ginger 🐵`)
                                        message.channel.send(gingerembed)
                                    } else {
                                        const gingerembed = new Discord.MessageEmbed()
                                        .setColor('#ca5116')
                                        .setDescription(`<@${userid5}> is not ginger 🙈`)
                                        message.channel.send(gingerembed)
                                    }
                                } else {
                                    gingerpercentage = Math.ceil(Math.random() * 101) 
                                    if(gingerpercentage >= 50){
                                        const gingerembed = new Discord.MessageEmbed()
                                        .setColor('#ca5116')
                                        .setDescription(`${userid} is ginger 🐵`)
                                        message.channel.send(gingerembed)
                                    } else {
                                        const gingerembed = new Discord.MessageEmbed()
                                        .setColor('#ca5116')
                                        .setDescription(`${userid} is not ginger 🙈`)
                                        message.channel.send(gingerembed)
                                    }
                                }
                            }
                            



                        })
                        
                        
                        
                            

                                
        
    
 client.login(process.env.BOT_TOKEN);
