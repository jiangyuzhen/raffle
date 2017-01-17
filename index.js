
// var padLeft = function(val, sed='0000'){
//   return sed.substring(0, sed.length - val.length) + val
// }
//
// for (var i = 1; i <= 72; i++) {
//   var img = document.createElement('img');
//   img.className = `person_${padLeft(i.toString())}`;
//   img.style.display = 'none';
//   document.body.appendChild(img);
//   window.setTimeout(function(){
//     document.body.removeChild(img);
//   },0);
// }

angular.module('mpjApp', []).controller('MpjController', function ($scope, $http, $interval, $timeout) {

  var prizeTypes = [
    {"type":"幸运奖", 'total':25, "everyNum":5},
    {"type":"三等奖", 'total':10, "everyNum":5},
    {"type":"二等奖", 'total':2, "everyNum":1},
    {"type":"一等奖", 'total':1, "everyNum":1}
  ]

  var persions = [];
  $scope.winner = [];
  $scope.winnerList = [[],[],[],[]]
  var winnerIndex = [];
  $scope.prizeType = prizeTypes[0];
  $scope.prizeNum = 0;
  $scope.enterNum = 0;
  $scope.show = false;
  var Switch = true; //true＝可以开始　false＝停止
  var timer;

  function init(){
    // 初始化数据
    persions = names.persons;
  	// $http.get('./name.json').success(function(data) {
  	// 	persions = data.persons;
  	// })
  }

  var menuZone = angular.element(document);
  var audio = document.getElementById('audio');
  menuZone.bind("keyup", function (event) {
    // 开始
    if (event.keyCode == 13 &&  Switch && $scope.enterNum<4) {
      audio.src = './raffle.mp3';
      audio.play();
      $scope.show = true;
      $scope.winner = [];
      createInterval();
    }else if(event.keyCode == 13 &&  !Switch && $scope.enterNum<4){
      // 暂停
      RandomMusic();
      closeInterval();
    }

    if($scope.enterNum==4){
      $scope.$apply(function(){
        $scope.enterNum = 4;
      });
    }
  })

  // 开启定时器
  function createInterval() {
		timer = $interval(function () {
			$scope.winner = Random($scope.prizeType.everyNum);
		}, 100);
    Switch = false;
	}
  // 关闭定时器
  function closeInterval() {
    $interval.cancel(timer);
    $scope.$apply(function(){
      $scope.prizeNum　= $scope.prizeNum + $scope.prizeType.everyNum;
      $scope.winner = Random($scope.prizeType.everyNum);
    });
    devareWinner();
    Switch = true;
    if($scope.prizeType.total == $scope.prizeNum){
      $scope.enterNum ++;
      $scope.prizeType = prizeTypes[$scope.enterNum];
      $scope.prizeNum = 0;
    }
    // alert("确定已经领奖了吗？")
	}
  // 滚动
  function Random(n) {
    var arr = [];
    winnerIndex = [];
    for (var i = 0; i < n; i++) {
      var index = createRandom();
      arr.push(persions[index]);
    }
    return arr;
  }
  function createRandom() {
    var random = Math.random();
    var index = parseInt(random * (persions.length));
    if(winnerIndex.indexOf(index) != -1){
      return createRandom();
    }else{
      winnerIndex.push(index);
      return index;
    }
  }
  // 取出N个人员
  function devareWinner() {
    if(winnerIndex.length>1){
      winnerIndex.sort(function(a,b){
        return b - a ;
      })
    }
    winnerIndex.map(function(index,key){
      var OO = Object.assign({},persions[winnerIndex[key]],{"type":$scope.prizeType.type})
      $scope.winnerList[3-$scope.enterNum].push(OO);
      persions.splice(winnerIndex[key],1)
    });
  }

  function RandomMusic(){
    var index = parseInt(Math.random() * 4) + 1;
    audio.src = './raffle' + index + '.mp3';
    audio.play();
  }

  init();
});
