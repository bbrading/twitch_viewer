$(document).ready(function(){
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
  users.forEach(getUserInfo)
})

function getUserInfo(user) {
  $.getJSON(`https://api.twitch.tv/kraken/users/${user}?client_id=4f5qcm4xcubridq3dmcegvu5e7n0s8y`, getTwitchStream).fail(error)
}

function getTwitchStream(userJSON){
  $.getJSON(`https://api.twitch.tv/kraken/streams/${userJSON.name}?client_id=4f5qcm4xcubridq3dmcegvu5e7n0s8y`,
    function(json) { displayTwitchStream(userJSON, json) })
}

function displayTwitchStream(userJSON, streamJSON) {
  var stream
  if (streamJSON.stream === null) {
    stream = "Offline"
  } else {
    stream = streamJSON.stream.game
  }
  $("#display").append(`<div class = "userInfo"> <img src=${userJSON.logo} alt="No Logo" class="logo">
  <a href ="https://www.twitch.tv/${userJSON.name}" target = "_blank" class ="status">${stream}</a>
  <div class ="userName">${userJSON.name}</div></div>`)
}

function error(json) {
  $("#display").append(`<p>${json.responseJSON.message}</p>`)
}
