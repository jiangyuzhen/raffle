angular.module('mpjApp', []).controller('MpjController', function ($sce,$scope, $interval, $timeout) {
  
  var vm = this;
  // init
  var prizeTypes = [
    {"type":"幸运奖", 'total':25, "everyNum":5},
    {"type":"三等奖", 'total':10, "everyNum":5},
    {"type":"二等奖", 'total':2, "everyNum":1},
    {"type":"一等奖", 'total':1, "everyNum":1}
  ]

  var timer = null;
  var defaultMusic = './raffle.mp3';
  var secUrl = $sce.trustAsResourceUrl;

  vm.prizeTypes = prizeTypes;
  vm.round = -1;
  vm.win = [];
  vm.winList = [[],[],[],[]];
  vm.audioSrc = defaultMusic;
  
  document.addEventListener('keyup',keyUpEvent);

  function keyUpEvent(){
    event.keyCode === 13 && (timer ? $scope.$apply(stop) : $scope.$apply(start));
  }

  function start(){
    vm.audioSrc = defaultMusic;
    if(vm.round < 0 || (vm.winList[vm.round].length === vm.prizeTypes[vm.round].total)){
      vm.round ++;
    }
    timer = $interval(function(){
      let i = 0;
      let sameList = [];
      let winner = [];
      while(i !== vm.prizeTypes[vm.round].everyNum){
        let index = parseInt(Math.random() * 72);
        let p = names.persons[index];
        if(p.type || ~sameList.indexOf(index)){
          continue;
        }
        sameList.push(index);
        winner[i++] = p;
      }
      vm.win = winner;
    },100)
  }

  function stop(){
    $interval.cancel(timer);
    timer = null;
    vm.win.map(function(p){
      p.type = prizeTypes[vm.round].type;
      return p;
    })
    vm.winList[vm.round] = vm.winList[vm.round].concat(vm.win);
    if(vm.round === prizeTypes.length-1){
      vm.round = 4;
      vm.winList.reverse();
      document.removeEventListener('keyup',keyUpEvent);
    }
    vm.audioSrc = './raffle' + (parseInt(Math.random() * 4) + 1) + '.mp3'
  }

});
