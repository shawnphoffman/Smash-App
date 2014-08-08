define([
    'Backbone',
    'models/Faction'
], function (Backbone, Faction) {
    FactionList = Backbone.Collection.extend({
        model: Faction,
        url: "js/static/factions.json",
        initialize: function () {
            this.on('reset', function () {
                // console.log('faction collection reset');
                this.updated();
            });

            this.on('fetch', function () {
                // console.log('faction collection fetched');
                this.updated();
            });
        },
        updated: function () {
            window.factions.persist();
            window.grouped = _.groupBy(window.factions.models, function (unit) { return unit.get("parent"); });
            this.renderView();
        },
        persist: function () {
            // console.log('saving shit');
            window.localStorage.factions = JSON.stringify(this);
        },
        log: function () {
            // console.log(this);
        },
        renderView: function () {
            var headTemp = _.template($('#faction-header-template').html());
            var heads = Object.keys(window.grouped);
            for(var i=0; i < heads.length; i++) {
              $("#faction-selection").append(headTemp({'parent':heads[i]}));
            }
            window.factions.each(function(faction){
              var view = new FactionView({model: faction});
              $("."+faction.get('parent').replace(/[^\w]/ig, '')).append(view.render().el);
            }, this);
        }
    });
    return FactionList;
  }
);
