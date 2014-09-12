define(['Backbone', 'models/Faction'],
function(Backbone, Faction) {

    FactionView = Backbone.View.extend( {
        tagName:  "li",

        className: 'faction-item',

        model: Faction,

        events: {
            'click input.toggle' : 'toggle'
        },

        template: _.template($('#faction-template').html()),

        toggle: function() {
          console.log('faction toggle started');

            this.model.set('enabled', !this.model.get('enabled'));
            window.factions.persist();

          console.log('faction toggle ended');
        },

        render: function() {
          console.log('faction render started');

            var temp = this.template(this.model.toJSON());
            this.$el.html(temp);
            return this;
        }
    });

    return FactionView;
}
);
