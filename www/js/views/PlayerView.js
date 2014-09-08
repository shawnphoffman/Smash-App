define(['Backbone', 'models/Player', 'static/alerts'],
  function(Backbone, Player, Alerts) {

      PlayerView = Backbone.View.extend( {
          tagName:  "li",

          className: 'swipeout',

          model: Player,

          events: {
            'click .player-data' : 'toggle'
          },

          template: _.template($('#player-template').html()),

          toggle: function() {
            // console.log('player toggle started');

            var t = $('.swipeout-opened');
            if (t.length > 0){
              return false;
            } else {
              var player = this.model;
              Alerts.BasePlayerAction(player);
            }

            // console.log('player toggle ended');
          },

          render: function() {
            // console.log('player render started');

            var temp = this.template(this.model.toJSON());
            this.$el.html(temp);
            return this;
          }
      });

  }
);
