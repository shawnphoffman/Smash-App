var myApp = new Framework7({
    modalTitle: 'Smash App'
});

// Expose Internal DOM library
var $$ = Framework7.$;

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("resume", this.onresume, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    onresume: function(){
        app.receivedEvent('resume');
    }
};

// Change statusbar bg when panel opened/closed
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

var factions = { 'factions' : [
    {
      'name' : 'Robots',
      'set' : 'base'
    },
    {
      'name' : 'Zombies',
      'set' : 'base'
    },
    {
      'name' : 'Pirates',
      'set' : 'base'
    },
    {
      'name' : 'Ninjas',
      'set' : 'base'
    },
    {
      'name' : 'Tricksters',
      'set' : 'base'
    },
    {
      'name' : 'Wizards',
      'set' : 'base'
    },
    {
      'name' : 'Dinosaurs',
      'set' : 'base'
    },
    {
      'name' : 'Aliens', 
      'set' : 'base'
    },
    {
      'name' : 'Shapeshifters',
      'set' : 'Science Fiction Double Feature'
    },
    {
      'name' : 'Super Spies',
      'set' : 'Science Fiction Double Feature'
    },
    {
      'name' : 'Cyborg Apes',
      'set' : 'Science Fiction Double Feature'
    },
    {
      'name' : 'Time Travelers',
      'set' : 'Science Fiction Double Feature'
    },
    {
      'name' : 'Miskatonic University',
      'set' : 'The Obligatory Cthulhu Set'
    },
    {
      'name' : 'Innsmouth',
      'set' : 'The Obligatory Cthulhu Set'
    },
    {
      'name' : 'Elder Things',
      'set' : 'The Obligatory Cthulhu Set'
    },
    {
      'name' : 'Cthulhu Cultists',
      'set' : 'The Obligatory Cthulhu Set'
    },
    {
      'name' : 'Bear Cavalry',
      'set' : 'Awesome Level 9000'
    },
    {
      'name' : 'Steampunks',
      'set' : 'Awesome Level 9000'
    },
    {
      'name' : 'Ghosts',
      'set' : 'Awesome Level 9000'
    },
    {
      'name' : 'Killer Plants',
      'set' : 'Awesome Level 9000'
    }
  ]
}



$('#clearScores').on('click', function(){
  console.log('ClearScores clicked.');
});

$('#randomizeFactions').on('click', function(){
  console.log('RandomizeFactions clicked.');
});

$('#generalSettings').on('click', function(){
  console.log('GeneralSettings clicked.');
});

$('#addPlayerIcon').on('click', function(){
  console.log('addPlayerIcon clicked.');
});
