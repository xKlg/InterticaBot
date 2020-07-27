const Discord = require("discord.js");
const bot = new Discord["Client"]();
const request = require("request")
const moment = require("moment")
const prefix = "-";
function run(){bot["login"]("")["then"](()=>{console["log"]("Loggined_To_Copypaste_Bot");bot["user"]["setActivity"](`${prefix}help`, {type:"PLAYING"});bot["user"]["setStatus"]("idle")})}
bot["setMaxListeners"](3)


bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "help"){
const Embed = new Discord["MessageEmbed"]()
["setTitle"]("Our Info About Bot:")
["addField"]("Prefix And Add The \nBot And Server \nSupport:",`( ${prefix} ) ${prefix}invite`,true)
["addField"]("Public Commands",`-invite,-botinfo,-roles,-banner,-mc,-avatar @mention - server,-ping,-server bots,-link,-corona,-user`, true)
["addField"]("Admins Commands",`-ban,-show,-hide,-close,-open,-kick,-mute,-unmute,-role` ,true)
return message["channel"]["send"]({embed: Embed})
}})

bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "user"){
message["delete"]()
const member = message["mentions"]["users"]["first"]() || message["author"]
const Embed = new Discord["MessageEmbed"]()
["setAuthor"](member["username"],member["avatarURL"]())
["setColor"]("black")
["addField"]("Discord Info :",`
Name: ${member["username"]}
Discriminator: ${member["discriminator"]}
ID: ${member["id"]}
Joined Discord: ${moment(member["createdAt"])["format"](`D/M/YYYY h:mm`)}
Bot: ${member["bot"]}
Playing: ${member.presence.activities || "None."}
Status: ${member["presence"]["status"]}
`)
["addField"]("Server info :",`
Last message: ${member["lastMessage"]}
Joined: ${moment(member["joinedAt"])["format"](`D/M/YYYY h:mm`)}
Roles: ${message["guild"]["member"](member)["roles"]["cache"]["map"](r => r)}
`)
return message["channel"]["send"]({embed: Embed})  
}})

bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "botinfo"){
const Embed = new Discord["MessageEmbed"]()
["setAuthor"](bot["user"]["username"], bot["user"]["avatarURL"]())
["addField"]("Servers:",`> ${bot["guilds"]["cache"]["size"]}`,true)
["addField"]("Channels:",`> ${bot["channels"]["cache"]["size"]}`,true)
["addField"]("Users:",`> ${bot["users"]["cache"]["size"]}`,true)
["addField"]("Owners",`> <@ID> <@ID> <@ID> <@ID> <@ID> <@ID> <@ID> \n> <@ID> <@ID> `,true)
["setFooter"](message["author"]["username"])
["setColor"]("black")
["setTimestamp"]()
return message["channel"]["send"]({embed: Embed})
}})


bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "roles"){
const roles = message["guild"]["roles"]["cache"]["map"](m => `${m["name"]}                   members ${m["members"]["size"]}`).join("\n")
return message["channel"]["send"]("```"+roles+"```")
}})

bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "banner"){
if(message["guild"]["banner"] == null){
return message["channel"]["send"]("**> This server doesn't have a banner!**")
}else{const Embed = new Discord["MessageEmbed"]()
["setDescription"]("**Server Banner: "+message["guild"]["bannerURL"]+"**")
return message["channel"]["send"]({embed: Embed})
}}})

bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "ban"){
if(!message["guild"]["member"](message["author"])["hasPermission"]("BAN_MEMBERS"))
return message["channel"]["send"]("**You do not have Ban Members permissions:interrobang:**")
if(!message["guild"]["member"](bot["user"])["hasPermission"]("BAN_MEMBERS")) return;
const member = message["mentions"]["users"]["first"]()
if(!member) return message["channel"]["send"]()
if(member["id"] == message["author"]["id"]) return;
if(member["id"] == bot["user"]["id"]) return;
if(!message["guild"]["member"](member)["bannable"]) return;
const reason = message["content"]["split"](" ")["slice"](2)["join"](" ")
if(!reason) return message["channel"]["send"]("Your Must Type The Reason :x: !")
message["guild"]["member"](member)["ban"]({reason: reason})
const Embed = new Discord["MessageEmbed"]()
['setDescription'](`
Member has been banned <@${member["id"]}>
reason : ${reason}`)
}})

bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "kick"){
if(!message["guild"]["member"](message["author"])["hasPermission"]("KICK_MEMBERS"))
return message["channel"]["send"]("**You do not have Kick Members permissions:interrobang:**")
if(!message["guild"]["member"](bot["user"])["hasPermission"]("KICK_MEMBERS")) return;
const member = message["mentions"]["users"]["first"]()
if(!member) return message["channel"]["send"]()
if(member["id"] == message["author"]["id"]) return;
if(member["id"] == bot["user"]["id"]) return;
if(!message["guild"]["member"](member)["kickable"]) return;
const reason = message["content"]["split"](" ")["slice"](2)["join"](" ")
if(!reason) return message["channel"]["send"]("Your Must Type The Reason :x: !")
message["guild"]["member"](member)["kick"]({reason: reason})
const Embed = new Discord["MessageEmbed"]()
['setDescription'](`
Member has been kicked <@${member["id"]}>
reason : ${reason}`)
}})

bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "ping"){
return message["channel"]["send"]("```js\nTime taken: "+`${Date["now"]() - message["createdTimestamp"]}`+" ms\nServer API: "+Math["floor"](bot["ws"]["ping"])+" ms```")
}})

bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "mc"){
return message["channel"]["send"]("**> MemberCounter: "+message["guild"]["memberCount"]+"**")
}})

bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "avatar"){
const member = message["mentions"]["members"]["first"]() || message["author"];
const embed = new Discord["MessageEmbed"]()
["setAuthor"](member["tag"], member["avatarURL"]())
["setTitle"](bot["user"]["username"])
["setURL"](member["avatarURL"]())
["setImage"](member["avatarURL"]())
["setColor"]("black")
["setFooter"](`Requested By : ${message["author"]["tag"]}`, message["author"]["avatarURL"]())
message["channel"]["send"](embed);
}})

bot["on"]("message", message => {
if(message["content"] == prefix + "server bots"){
return message["channel"]["send"](message["guild"]["members"]["cache"]["filter"](user => user["user"]["bot"])["map"](r => r)["join"](", "))
}})
    
bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "link"){
const Embed1 = new Discord["MessageEmbed"]()["setDescription"]("**Done Check Your DM! if it not sent to u please open your dm and tryagain.**")["setColor"]("RANDOM")
const Embed2 = new Discord["MessageEmbed"]()
["setDescription"](`مدة الرابط : يوم
عدد استخدامات الرابط : 10`)
["setColor"]("RANDOM")
message["channel"]["createInvite"]({thing: true,maxUses: 10,maxAge: 86400})
["then"](invite => {
message["author"]["send"]({embed: Embed2})})
message["author"]["send"](invite["url"])
message["channel"]["send"]({embed:Embed1})["then"](m => m["delete"]({timeout: 3000}))
}})

bot["on"]("message", async message => {
const args = message["content"]["split"](/[ ]+/);
const word = args["slice"](1)["join"](" ");
if (message["content"]["startsWith"](prefix + "corona")) {
try {if(!word)
return message["reply"]("Usage: **-corona <country>**\nEx: `-corona egypt`");
request({json: true,url: "https://corona.lmao.ninja/v2/countries/" + word},(err, res, json) => {
if (err) {message["reply"]("There was an error!");}else{
const embed = new Discord["MessageEmbed"]()
["setTitle"](`Corona In ${json["country"]}`)
["setDescription"](`**Total Cases: **${json["cases"]}\n**Total Deaths: **${json["deaths"]}\n**Total Recoverd: **${json["recovered"]}\n**Today Cases: **${json["todayCases"]}\n**Today Deaths: **${json["todayDeaths"]}`)
["setColor"]("#e32a19");
message["channel"]["send"](embed)}})}catch (err) {
message["channel"]["send"]("There was an error!\n" + err)["catch"]();
}}});

bot["on"]("message", message => {
if(message["content"] === prefix + "hide") {
if(!message["guild"]["member"](message["author"])["hasPermission"]('ADMINISTRATOR')) return message["reply"]("> **You Don't Have MANAGE MESSAGES Perms!**");
message["channel"]["createOverwrite"](message["guild"]["id"], {VIEW_CHANNEL: false})
message["channel"]["send"]("**> Done.**")
}});
    
bot["on"]("message", message => {
if(message["content"] === prefix + "show") {
if(!message["guild"]["member"](message["author"])["hasPermission"]('ADMINISTRATOR')) return message["reply"]("> **You Don't Have MANAGE MESSAGES Perms!**");
message["channel"]["createOverwrite"](message["guild"]["id"], {VIEW_CHANNEL: true})
message["channel"]["send"]("**> Done.**")
}});

bot["on"]("message", message => {
if(message["content"] === prefix + "close") {
if(!message["guild"]["member"](message["author"])["hasPermission"]('ADMINISTRATOR')) return message["reply"]("> **You Don't Have MANAGE MESSAGES Perms!**");
message["channel"]["createOverwrite"](message["guild"]["id"], {SEND_MESSAGES: false})
message["channel"]["send"]("**> Done.**")
}});
    
bot["on"]("message", message => {
if(message["content"] === prefix + "open") {
if(!message["guild"]["member"](message["author"])["hasPermission"]('ADMINISTRATOR')) return message["reply"]("> **You Don't Have MANAGE MESSAGES Perms!**");
message["channel"]["createOverwrite"](message["guild"]["id"], {SEND_MESSAGES: true})
message["channel"]["send"]("**> Done.**")
}});   

bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "mute"){
if(!message["guild"]["member"](message["author"])["hasPermission"]("MANAGE_ROLES"))
return message["reply"]("**> You Don't Have `Manage roles` permission**")
if(!message["guild"]["member"](message["author"])["hasPermission"]("MANAGE_ROLES")) return;
const muteRole = message["guild"]["roles"]["cache"]["find"](role => role["name"] === "Muted")
if(!muteRole) return message["reply"]("**Make Role With Name: Muted!**")
const member = message["mentions"]["users"]["first"]()
if(!member) return message["reply"]("**Mention Anybody Please!**")
message["guild"]["member"](member)["roles"]["add"](muteRole)
return message["reply"]("**Done Muted Him!**")
}})

bot["on"]("message", message => {
const command = message["content"]["toLowerCase"]()["split"](" ")[0]
if(command == prefix + "unmute"){
if(!message["guild"]["member"](message["author"])["hasPermission"]("MANAGE_ROLES"))
return message["reply"]("**> You Don't Have `Manage roles` permission**")
if(!message["guild"]["member"](message["author"])["hasPermission"]("MANAGE_ROLES")) return;
const muteRole = message["guild"]["roles"]["cache"]["find"](role => role["name"] === "Muted")
if(!muteRole) return message["reply"]("**Make Role With Name: Muted!**")
const member = message["mentions"]["users"]["first"]()
if(!member) return message["reply"]("**Mention Anybody Please!**")
message["guild"]["member"](member)["roles"]["remove"](muteRole)
return message["reply"]("**Done UnMuted Him!**")
}})

bot["on"]("message", message => {
const commmand = message["content"]["toLowerCase"]()["split"](" ")[0];
if(commmand == prefix + "role"){
if(!message["guild"]["member"](message["author"])["hasPermission"]("MANAGE_ROLES"))
return message["reply"]("**> You Don't have `Manage role` permssions!**");
if(!message["guild"]["member"](bot["user"])["hasPermission"]("MANAGE_ROLES")) return
const member = message["mentions"]["users"]["first"]();
if(!member) return message["channel"]["send"]("**:interrobang: | I can't find the member**");
const role = message["guild"]["roles"]["cache"]["find"](role => role["name"]["startsWith"](message["content"]["split"](" ")["slice"](2)["join"](" ")));
if(!role) return;if(message["guild"]["member"](member)["roles"]["cache"]["find"](c => c["id"] === role["id"]))
return message["guild"]["member"](member)["roles"]["remove"](role)["then"](() => {
const Embed1 = new Discord["MessageEmbed"]()["setDescription"]("**:white_check_mark: | Succesufly removed the role from the user**")
message["channel"]["send"]({embed: Embed1});
})["catch"](err => {console["log"](err["message"]);});
message["guild"]["member"](member)["roles"]["add"](role)["then"](() => {
const Embed2 = new Discord["MessageEmbed"]()["setDescription"]("**:white_check_mark: Changed role "+role["name"]+"**")
message["channel"]["send"]({embed: Embed2});
})["catch"](err => {console["log"](err["message"]);});
}})    

run()
