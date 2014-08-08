define(['Backbone'],
function(Backbone){
  var Random = Backbone.Model.extend({
    defaults : {
    }
  },
  {
    RandomizeFactions : function(numPlayers, factions){
      var _factions = [];
      for (var i = 0; i < factions.length; i++) {
        if (factions.models[i].get('enabled')){
          _factions.push(factions.models[i]);
        }
      }
      if (numPlayers * 2 > _factions.length) {
        // console.warn('not enough factions');
        SmashApp.alert('Not enough enabled factions for randomization.', 'Wait!');
        return [];
      }
      var outArray = [];
      // console.log(_factions);
      for (var j = 0; j < numPlayers; j++) {
        var tempArray = [];
        //
        var ind = _factions[Math.floor(Math.random()*_factions.length)];
        tempArray.push(ind);
        _factions.splice(_factions.indexOf(ind), 1);
        //
        ind = _factions[Math.floor(Math.random()*_factions.length)];
        tempArray.push(ind);
        _factions.splice(_factions.indexOf(ind), 1);
        //
        outArray.push(tempArray);
      }
      return outArray;
    }
  });
  return Random;
});
