define(['Backbone'],
  function(Backbone){
    Player = Backbone.Model.extend({
        defaults: {
            name: "Player Name",
            score: 0,
            order: 0
        }
    });
    return Player;
  }
);
