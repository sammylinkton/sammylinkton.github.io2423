async function SteamFetch() {
    const urlsteam =
        "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=70F175A9A5F1FBF5EBD95C8DFFEF849E&steamids=76561198324195037";
    const meow = await fetch(urlsteam);
    const data = await meow.json();
    const player = data.response.players[0];
    // Setting the PFP

    const pfp = document.getElementById("SteamPFP");
    //   console.log("Setting PFP...");
    pfp.src = data.response.players[0].avatarfull;
    //   console.log("PFP Set!");

    // Getting the persona state, its just a status indicator like Discord.
    if (data.response.players[0].personastate == 1) {
        pfp.style.borderColor = "Green";
        document.getElementById("Name").style.color = "Green";
    } else if (data.response.players[0].personastate == 2) {
        pfp.style.borderColor = "Orange";
    } else if (data.response.players[0].personastate == 3) {
        pfp.style.borderColor = "Orange";
        document.getElementById("Name").style.color = "Orange";
    } else {
        pfp.style.borderColor = "#4f4f4f";
        document.getElementById("Name").style.color = "#4f4f4f";
    }

    // Getting the persona username (thats just what your username is displayed to everyone as), and the users real name, if displayed.

    const name = document.getElementById("Name");
    //  console.log("Profile username:");
    // console.log(data.response.players[0].personaname);
    const username = data.response.players[0].personaname;
    //  console.log("Profile Real Name");
    if (data.response.players[0].realname == undefined) {
        // console.log("Real name not found, omitting it");
        const realname = "";
        name.innerHTML = username;
    } else {
        //     console.log("If it goes here with it being undefined, ill kill myself");
        const realname = '"' + data.response.players[0].realname + '"';
        name.innerHTML = "" + username + " " + realname;
    }
    // Checking if user is playing a game
    if (data.response.players[0].gameid == undefined) {
        //    console.log("Not playing a game currently");
    } else {
        //getting game id
        const opa = document.getElementById("Controller").style.opacity;
        document.getElementById("Controller").style.opacity = 1;
        document.getElementById("GameImage").innerHTML = "Playing " + data.response.players[0].gameextrainfo;
    }

    // listing all values gotten

    const dataset = [player.avatarfull, player.personastate, player.personaname, player.gameid];
    console.log(dataset);
}

console.log("First Run");
SteamFetch();
console.log("Running Code in 5000 ms");
setInterval(SteamFetch, 5000);
