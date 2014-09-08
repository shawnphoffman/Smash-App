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
            // console.log('faction updated started');

            window.factions.persist();
            window.grouped = _.groupBy(window.factions.models, function (unit) { return unit.get("parent"); });
            this.renderView();

            // console.log('faction updated ended');
        },
        persist: function () {
            // console.log('faction persist started');

            window.localStorage.factions = JSON.stringify(this);

            // console.log('faction updated ended');
        },
        renderView: function () {
            // console.log('faction renderView started');

            $("#faction-selection").empty();
            var headTemp = _.template($('#faction-header-template').html());
            var heads = Object.keys(window.grouped);
            var container = document.createDocumentFragment();
            for(var i=0; i < heads.length; i++) {
              $(container).append(headTemp({'parent':heads[i]}));
            }
            $("#faction-selection").append(container);
            window.factions.each(function(faction){
              var view = new FactionView({model: faction});
              $("."+faction.get('parent').replace(/[^\w]/ig, '')).append(view.render().el);
            }, this);

            // console.log('faction renderView ended');
        }
    });
    return FactionList;
  }
);
