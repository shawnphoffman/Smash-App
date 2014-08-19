require.config({
    baseUrl: './js/',
    paths: {
        jquery       : 'dist/jquery.min',
        underscore   : 'dist/underscore',
        Backbone     : 'dist/backbone-min',
        framework7   : 'dist/framework7.min'
    },
    shim: {
        framework7: {
            exports: 'Framework7'
        }
    }
});

require([
  'static/randomize',
  'static/alerts',
  'models/Faction',
  'models/FactionList',
  'views/FactionView',
  'models/Player',
  'models/PlayerList',
  'views/PlayerView',
  'models/Score',
  'models/ScoreList',
  'framework7'
  ], function(Random, Alerts, Faction, FactionList, FactionView, Player, PlayerList, PlayerView, Score, ScoreList){

    // Da SmashApp
    SmashApp = new Framework7({
        modalTitle: 'Smash App'
    });
    $$ = Framework7.$;

    _.mixin({
      capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
      }
    });

    // Load up dem factions
    factions = new FactionList();
    var ex = window.localStorage.factions;
    var version = window.localStorage.smashAppVersion;
    if (ex === undefined || (version === undefined || version !== '1.0.1')) {
      // console.log('New faction set');
        factions.reset(returnFactions());
        window.localStorage.smashAppVersion = '1.0.1';
    }
    else {
        var arr = JSON.parse(ex);
        factions.reset(arr);
    }

    // Load Players
    players = new PlayerList();
    var pl = window.localStorage.players;
    if (pl !== undefined) {
      // console.log('fetching players from localstorage');
      var arr2 = JSON.parse(pl);
      players.reset(arr2);
    }

    // Load Scores
    scores = new ScoreList();
    var sc = window.localStorage.scores;
    if (sc !== undefined) {
      // console.log('fetching scores from localstorage');
      var arr3 = JSON.parse(sc);
      scores.reset(arr3);
    }

    // Add a Player handler
    $('#addPlayerIcon').on('click', function(){
      Alerts.AddPlayer();
    });

    // Randomize factions handler
    $('#randomizeFactions').on('click', function() {
        // console.log('randomize start');
        var random = Random.RandomizeFactions(players.length, window.factions);
        for (var i = 0; i < random.length; i++){
          players.models[i].set({'factions':random[i]});
        }

        players.persist();
        players.reset(JSON.parse(window.localStorage.players));
        // console.log('randomize ended');
    });

    // Review scores
    $('#reviewScores').on('click', function() {
        Alerts.ReviewPoints();
    });

    // Clear players
    $('#clearPlayers').on('click', function() {
        players.reset();
        scores.reset();
    });

    // Clear scores
    $('#clearScores').on('click', function() {
        players.clearScores();
    });

    // Clear factions
    $('#clearFactions').on('click', function() {
        players.clearFactions();
    });

    // Shit
    $('.label-checkbox').on('click', function(e){
      // console.log(this);
      e.preventDefault();
      var g = $(this).find('.toggle');
      // console.log(g);
      g.click();
      // console.log('clicked2');
    });

    // Delete item
    $$('.todo-items-list').on('delete', '.swipeout', function () {
        var name = $$(this).find('.item-content').attr('data-name');
        // console.log(name);
        players.remove(name);
    });

    function returnFactions(){
      var js = JSON.parse('[ { "name" : "Robots", "parent" : "Core Set", "enabled" : true, "color" : "black" }, { "name" : "Zombies", "parent" : "Core Set", "enabled" : true, "color" : "red" }, { "name" : "Pirates", "parent" : "Core Set", "enabled" : true, "color" : "yellow" }, { "name" : "Ninjas", "parent" : "Core Set", "enabled" : true, "color" : "blue" }, { "name" : "Tricksters", "parent" : "Core Set", "enabled" : true, "color" : "green" }, { "name" : "Wizards", "parent" : "Core Set", "enabled" : true, "color" : "purple" }, { "name" : "Dinosaurs", "parent" : "Core Set", "enabled" : true, "color" : "green" }, { "name" : "Aliens", "parent" : "Core Set", "enabled" : true, "color" : "green" }, { "name" : "Shapeshifters", "parent" : "Science Fiction Double Feature", "enabled" : false, "color" : "purple" }, { "name" : "Super Spies", "parent" : "Science Fiction Double Feature", "enabled" : false, "color" : "grey", "shortName" : "Spies" }, { "name" : "Cyborg Apes", "parent" : "Science Fiction Double Feature", "enabled" : false, "color" : "yellow", "shortName" : "Apes" }, { "name" : "Time Travelers", "parent" : "Science Fiction Double Feature", "enabled" : false, "color" : "green", "shortName" : "Travelers" }, { "name" : "Miskatonic University", "parent" : "The Obligatory Cthulhu Set", "enabled" : false, "color" : "blue", "shortName" : "Miskatonic" }, { "name" : "Innsmouth", "parent" : "The Obligatory Cthulhu Set", "enabled" : false, "color" : "green", "shortName" : "" }, { "name" : "Elder Things", "parent" : "The Obligatory Cthulhu Set", "enabled" : false, "color" : "orange", "shortName" : "Elder" }, { "name" : "Cthulhu Cultists", "parent" : "The Obligatory Cthulhu Set", "enabled" : false, "color" : "purple", "shortName" : "Cultists" }, { "name" : "Bear Cavalry", "parent" : "Awesome Level 9000", "enabled" : false, "color" : "black", "shortName" : "Bears" }, { "name" : "Steampunks", "parent" : "Awesome Level 9000", "enabled" : false, "color" : "orange" }, { "name" : "Ghosts", "parent" : "Awesome Level 9000", "enabled" : false, "color" : "red" }, { "name" : "Killer Plants", "parent" : "Awesome Level 9000", "enabled" : false, "color" : "green", "shortName" : "Plants" }, { "name" : "Vampires", "parent" : "Monster Smash", "enabled" : false, "color" : "red" }, { "name" : "Mad Scientists", "parent" : "Monster Smash", "enabled" : false, "color" : "black", "shortName" : "Scientists" }, { "name" : "Giant Ants", "parent" : "Monster Smash", "enabled" : false, "color" : "grey", "shortName" : "Ants" }, { "name" : "Werewolves", "parent" : "Monster Smash", "enabled" : false, "color" : "yellow" } ,{"name":"The Geeks","parent":"The Big Geeky Box","enabled":false,"color":"orange","shortName":"Geeks"} ]');
      // console.log(js);
      return js;
    }
});
