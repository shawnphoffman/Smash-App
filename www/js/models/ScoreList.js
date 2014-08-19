define([
  'Backbone',
  'models/Score',
  'static/alerts'
],
  function(Backbone, Score, Alerts){
    ScoreList = Backbone.Collection.extend({
      model: Score,
      initialize: function(){
        this.on('add', function () {
            // console.log('score added');
            this.compileScores();
            this.persist();
        });
        this.on('reset', function () {
            // console.log('scorelist reset');
            this.compileScores();
            this.persist();
        });
      },
      compileScores: function(){
        Alerts.ApplyScores();
      },
      persist: function(){
        // console.log('score persist started');
        window.localStorage.scores = JSON.stringify(this);
        // console.log('score persist ended');
      },
      clearScores: function(){
        scores.reset();
      }
    });

    return ScoreList;
  }
);
