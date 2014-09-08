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
            // console.log('score added started');

            this.compileScores();
            this.persist();

            // console.log('score added ended');
        });
        this.on('reset', function () {
            // console.log('scorelist reset started');

            this.compileScores();
            this.persist();

            // console.log('scorelist reset ended');
        });
      },
      compileScores: function(){
        // console.log('compileScores started');

        Alerts.ApplyScores();

        // console.log('compileScores ended');
      },
      persist: function(){
        // console.log('score persist started');

        window.localStorage.scores = JSON.stringify(this);

        // console.log('score persist ended');
      },
      clearScores: function(){
        scores.reset(null, {silent:true});
      }
    });

    return ScoreList;
  }
);
