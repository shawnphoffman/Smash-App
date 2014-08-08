define(['Backbone', 'models/Faction'],
function(Backbone, Faction) {

    FactionView = Backbone.View.extend( {
        tagName:  "li",

        className: 'faction',

        model: Faction,

        events: {
            'click .toggle' : 'toggle'
        },

        template: _.template($('#faction-template').html()),

        toggle: function() {
            this.model.set('enabled', !this.model.get('enabled'));
            window.factions.persist();
        },

        render: function() {
            var temp = this.template(this.model.toJSON());
            this.$el.html(temp);
            return this;
        }
    });

    return FactionView;
}
);
