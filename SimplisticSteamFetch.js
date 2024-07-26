
async function SteamFetch() {
    const url = 'https://corsproxy.io/?' + encodeURIComponent('https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=70F175A9A5F1FBF5EBD95C8DFFEF849E&steamids=76561198324195037');
    //definetely didnt succumb to the ai's cock and ask for help
    try {

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`fuck`);
        }
        
        const data = await response.json();
        const player = data.response.players[0];
    

    const pfp = document.getElementById("SteamPFP");
    //   console.log("Setting PFP...");
    pfp.src = player.avatarfull;
    //   console.log("PFP Set!");

    // Getting the persona state, its just a status indicator like Discord.
    if (player.personastate == 1) {
        pfp.style.borderColor = "Green";
        document.getElementById("Name").style.color = "Green";
    } else if (player.personastate == 2) {
        pfp.style.borderColor = "Orange";
    } else if (player.personastate == 3) {
        pfp.style.borderColor = "Orange";
        document.getElementById("Name").style.color = "Orange";
    } else {
        pfp.style.borderColor = "#4f4f4f";
        document.getElementById("Name").style.color = "#4f4f4f";
    }

    // Getting the persona username (thats just what your username is displayed to everyone as), and the users real name, if displayed.

    const name = document.getElementById("Name");
    //  console.log("Profile username:");
    // console.log(player.personaname);
    const username = player.personaname;
    //  console.log("Profile Real Name");
    if (player.realname == undefined) {
        // console.log("Real name not found, omitting it");
        const realname = "";
        name.innerHTML = username;
    } else {
        //     console.log("If it goes here with it being undefined, ill kill myself");
        const realname = '"' + player.realname + '"';
        name.innerHTML = "" + username + " " + realname;
    }
    // Checking if user is playing a game
    if (player.gameid == undefined) {
        //    console.log("Not playing a game currently");
    } else {
        //getting game id
        const opa = document.getElementById("Controller").style.opacity;
        document.getElementById("Controller").style.opacity = 1;
        document.getElementById("GameImage").innerHTML = "Playing " + data.response.players[0].gameextrainfo;
    }

    // Checking if CORS got blocked or not

    if (document.getElementById("Name").innerHTML == "null") {

        console.log("CORS proxy failed, displaying error text to user");
        document.getElementById("CORSCheck").style.opacity = 1;

    } else {
        console.log("CORS proxy succeeded, heres the data I found.")
        document.getElementById("CORSCheck").style.opacity = 0;
        // listing all values gotten
        
    const dataset = [player.avatarfull, player.personastate, player.personaname, player.gameid];
    console.log(dataset);
    }
} catch (error) {
    console.error(`fucking uhhhhh:`, error);
}
}

console.log("First Run");
SteamFetch();
console.log("Running Code in 10000 ms");
setInterval(SteamFetch, 10000);
