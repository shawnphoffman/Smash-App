define(['Backbone'],
function(Backbone){
  var Alerts = Backbone.Model.extend({},
  {
    AddPlayer: function() {
      SmashApp.prompt('What is your name?', function(data){
        var player = new Player();
        if (data === undefined || data === '') {
          var num = players.length + 1;
          player.set({name:'Player '+num});
        } else {
          player.set({name:data.replace(/[^\w]/ig, '')});
        }
        players.add(player);
      });
    },
    EditPlayer: function(player) {
      // console.log(player);

      if (player !== undefined) {
        var oldName = player.get('name');
        SmashApp.prompt('Please enter a name?', function(data){
          if (data === undefined || data === '') {
            var pos;
            for (var i=0; i<players.length; i++){
              if (players.models[i] == player){
                pos = i + 1;
              }
            }
            player.set({name:'Player '+pos});
          } else {
            player.set({name:data.replace(/[^\w]/ig, '')});
          }
          players.persist();
          Alerts.RenamePlayerScore(oldName, player.get('name'));
          players.renderView();
        });
      }
    },
    RenamePlayerScore: function(oldName, newName){
      scores.forEach(function(score){
        if (score.get('name') == oldName){
          score.set('name', newName);
        }
      });
      scores.persist();
      players.renderView();
    },
    ApplyScores: function(){
      players.forEach(function(player){
        player.set('score', 0);
      });
      scores.forEach(function(score){
        for(var i=0; i<players.length; i++){
          if (players.models[i].get('name') == score.get('name')){
            players.models[i].set('score', (players.models[i].get('score')*1+score.get('score')));
          }
        }
      });
      players.persist();
      players.renderView();
    },
    AddPoints: function(points, name) {
      // console.log(name + ' - ' + points);
      var point = new Score();
      point.set('score', points);
      point.set('name', name);
      scores.add(point);
      Alerts.ApplyScores();
    },
    AddPointAction: function(player){
      SmashApp.actions([
        [
          {text: 'Add Points for ' + _(player.get('name')).capitalize(), label:true},
          {text: 'Add 1 Point', onClick:function(){
            Alerts.AddPoints(1, player.get('name'));
          }},
          {text: 'Add 2 Points', onClick:function(){
            Alerts.AddPoints(2, player.get('name'));
          }},
          {text: 'Add 3 Points', onClick:function(){
            Alerts.AddPoints(3, player.get('name'));
          }},
          {text: 'Add 4 Points', onClick:function(){
            Alerts.AddPoints(4, player.get('name'));
          }},
          {text: 'Add 5 Points', onClick:function(){
            Alerts.AddPoints(5, player.get('name'));
          }},
          {text: 'Add 6 Points', onClick:function(){
            Alerts.AddPoints(6, player.get('name'));
          }},
          {text: 'Add 7 Points', onClick:function(){
            Alerts.AddPoints(7, player.get('name'));
          }},
          {text: 'Add 8 Points', onClick:function(){
            Alerts.AddPoints(8, player.get('name'));
          }},
          {text: 'Go Back', onClick:function(){
            Alerts.BasePlayerAction(player);
          }},
        ]
      ]);
    },
    RemovePointAction: function(player){
      SmashApp.actions([
        [
          {text: 'Remove Points for ' + _(player.get('name')).capitalize(), label:true},
          {text: 'Remove 1 Point', onClick:function(){
            Alerts.AddPoints(-1, player.get('name'));
          }},
          {text: 'Remove 2 Points', onClick:function(){
            Alerts.AddPoints(-2, player.get('name'));
          }},
          {text: 'Remove 3 Points', onClick:function(){
            Alerts.AddPoints(-3, player.get('name'));
          }},
          {text: 'Remove 4 Points', onClick:function(){
            Alerts.AddPoints(-4, player.get('name'));
          }},
          {text: 'Remove 5 Points', onClick:function(){
            Alerts.AddPoints(-5, player.get('name'));
          }},
          {text: 'Remove 6 Points', onClick:function(){
            Alerts.AddPoints(-6, player.get('name'));
          }},
          {text: 'Remove 7 Points', onClick:function(){
            Alerts.AddPoints(-7, player.get('name'));
          }},
          {text: 'Remove 8 Points', onClick:function(){
            Alerts.AddPoints(-8, player.get('name'));
          }},
          {text: 'Go Back', onClick:function(){
            Alerts.BasePlayerAction(player);
          }},
        ]
      ]);
    },
    BasePlayerAction: function(player){
      SmashApp.actions(
      [
        [
          {text: 'Actions for ' + _(player.get('name')).capitalize(), label:true},
          {text:'Add Points', onClick:function(){
            Alerts.AddPointAction(player);
          }},
          {text:'Subtract Points', onClick:function(){
            Alerts.RemovePointAction(player);
          }},
          {text:'Review Points', onClick:function(){
            Alerts.ReviewPointsByName(player.get('name'));
          }},
          {text:'Edit Name', onClick:function(){
            Alerts.EditPlayer(player);
          }}
        ]
      ]);
    },
    ReviewPointsByName: function(name){
      var temp = '';
      for (var i=0; i<scores.length; i++){
        if (scores.models[i].get('name') == name) {
          var val = scores.models[i].get('score') > 0 ? '+'+scores.models[i].get('score') : scores.models[i].get('score');
          var label = Math.abs(scores.models[i].get('score')) <= 1 ? 'point' : 'points';
          temp += '<b>Points Revision #' + ((i*1)+1) + '</b>: ' + val + ' ' + label + '<br />';
        }
      }
      if (temp === '') { temp = 'No score history available for '+ name +'.'; }
      SmashApp.alert(temp, 'Score History for ' + name);
    },
    ReviewPoints: function(){
      var temp = '';
      for (var i=0; i<scores.length; i++){
        var val = scores.models[i].get('score') > 0 ? '+'+scores.models[i].get('score') : scores.models[i].get('score');
        var label = Math.abs(scores.models[i].get('score')) <= 1 ? 'point' : 'points';
        temp += '<b>Points Revision #' + ((i*1)+1) + '</b>: ' + val + ' ' + label + ' to '+ scores.models[i].get('name') +'<br />';
      }
      if (temp === '') { temp = 'No score history available.'; }
      SmashApp.alert(temp, 'Score History');
    }
  });
  return Alerts;
});
