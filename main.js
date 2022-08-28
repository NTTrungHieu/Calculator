var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

start();

function start(){
  var input = $("#input");
  var buttons = $$(".numbers div");
  var operator = $$(".operators div");
  var dot = $("#dot");
  var clear = $("#clear");
  var equal = $(".equal");
  // ÷
  for(let i= 0; i<buttons.length; i++){
    buttons[i].onclick=function(){
      input.innerText+=buttons[i].innerText;
    }
  }

  for(let i=0; i<operator.length; i++){
    operator[i].onclick= function(){
      if(!testNumber(input.innerText.slice(-1))){
        input.innerText= input.innerText.substring(0,input.innerText.length-1)+operator[i].innerText;
      }
      else{
        input.innerText+=operator[i].innerText;
      }
    }
  }
  // when click the dot the number will be float
  dot.onclick = function(){
    if(testNumber(input.innerText.slice(-1))){
      input.innerText+=dot.innerText;
    }
  }

  equal.onclick = function(){
    let Number = /\d+\.\d+|\d+/g;
    let operatorArr = input.innerText.split(Number);
    operatorArr = operatorArr.slice(1,operatorArr.length-1)

    let str = input.innerText;
    let numbArr = str.match(Number);

    
    let d = operatorArr.indexOf("÷")
    while(d!=-1){
      numbArr.splice(d,2,divide(parseFloat(numbArr[d]),parseFloat(numbArr[d+1])));
      operatorArr.splice(d,1);
      d = operatorArr.indexOf("÷");
    }

    let multi = operatorArr.indexOf("×")
    while(multi!=-1){
      numbArr.splice(multi,2,multiply(parseFloat(numbArr[multi]),parseFloat(numbArr[multi+1])));
      operatorArr.splice(multi,1);
      multi = operatorArr.indexOf("×");
    }
    let total= numbArr[0];
    for(let i=1; i<numbArr.length; i++){
      switch(operatorArr[i-1]){
        case "+":
          total = add(parseFloat(total),parseFloat(numbArr[i]));
          break;
        case "-":
          total = minus(parseFloat(total),parseFloat(numbArr[i]));
          break;
      }
    }
    input.innerText= total;
  }

  clear.onclick = function(){
    input.innerText='';
  }
}

function testNumber(number){
  var check = /\d/;
  return check.test(number);
}

function add(total,number){
  return total+number;
}
function multiply(total,number){
  return total*number;
}
function minus(total,number){
  return total-number;
}
function divide(total,number){
  if(number!=0)
    return total/number;
  else return false;
}

