define([
  'Backbone',
  'models/Player'
],
  function(Backbone, Player){
    PlayerList = Backbone.Collection.extend({
        model: Player,
        initialize: function() {
          this.on('reset', function () {
              // console.log('player collection reset');
              this.updated();
          });

          this.on('fetch', function () {
              // console.log('player collection fetched');
              this.updated();
          });

          this.on('add', function () {
              // console.log('player added to collection');
              this.updated();
          });
        },
        updated: function () {
          // console.log('updated started');
          window.players.persist();
          window.players.renderView();
          // console.log('updated ended');
        },
        persist: function() {
          // console.log('persist started');
          window.localStorage.players = JSON.stringify(this);
          // console.log('persist ended');
        },
        renderView: function() {
          // console.log('renderView started');

          $('ul.players').html('');
          var factionTemp = _.template($('#player-faction-template').html());
          players.forEach(function(player){
            var view = new PlayerView({model:player});
            // console.log(view.render().el);
            $('ul.players').append(view.render().el);
            var playerFactions = player.get('factions');
            if (playerFactions !== undefined && playerFactions !== null) {
              playerFactions.forEach(function(faction){
                var target = ".factions-"+player.get('name').split(' ').join('');
                $(target).append(factionTemp({'color': faction.color, 'name':faction.shortName || faction.name }));
              });
            }
          });

          // console.log('renderView ended');
        },
        remove: function(name){
          // console.log('remove started');

          var player = this.getByName(name);
          var list = [];
          for(var i=0; i < players.length; i++){
            if (players.models[i] == player[0]) {

            } else {
              list.push(players.models[i]);
            }
          }
          var newScores = _.filter(scores.models, function(score){
            return score.get('name').split(' ').join('') !== name;
          });
          // console.log(scores.models);
          // console.log(newScores);
          scores.reset(newScores);

          players.reset(list);

          // console.log('remove ended');
        },
        getByName: function(name){
         return this.filter(function(val) {
            return val.get("name").split(' ').join('') === name;
          });
        },
        clearScores: function(){
          players.forEach(function(player){
            player.set('score', 0);
          });
          scores.clearScores();
          players.updated();
        },
        clearFactions: function(){
          players.forEach(function(player){
            player.set('factions', null);
          });
          players.updated();
        }
    });
    return PlayerList;
  }
);
