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
            var t = $('.swipeout-opened');
            if (t.length > 0){
              return false;
            } else {
              var player = this.model;
              Alerts.BasePlayerAction(player);
            }
          },

          render: function() {
            var temp = this.template(this.model.toJSON());
            this.$el.html(temp);
            return this;
          }
      });

  }
);
