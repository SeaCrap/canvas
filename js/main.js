//通过id获取canvas:yyy
var yyy = document.getElementById('xxx');
//由于画圆划线函数用到了上下文  定义的上下文移到了另一个函数，获取不到，需要放在头部作为全局变量，这样用到上下文的函数都可以获取到了
var context = yyy.getContext('2d');

var lineWidth = 5

//自动设置canvas宽高
autoSetCanvasSize(yyy)

//监听鼠标
listenterurser(yyy)


var buttonState = false
pen.onclick = function(){
	buttonState = false
	pen.classList.add('active')
	eraser.classList.remove('active')
	clear.classList.remove('active')
}
eraser.onclick = function(){
	buttonState = true
	eraser.classList.add('active')
	pen.classList.remove('active')
	clear.classList.remove('active')
}
clear.onclick = function(){
	context.clearRect(0, 0, yyy.width, yyy.height);
}
down.onclick = function(){
	var url = yyy.toDataURL('image/png')
	var a = document.createElement('a')
	document.body.appendChild(a)
	a.href = url
	a.download = '我画的画'
	a.click()
}
// eraser.onclick = function(){
//   eraserEnabled = true //橡皮檫使用
//   actions.className = 'actions x' //开启x状态
// }
// brush.onclick = function(){
//   eraserEnabled = false //橡皮檫禁用
//   actions.className = 'actions'
// }
red.onclick = function(){
	context.fillStyle = 'red'
	context.strokeStyle = 'red'
	red.classList.add('active')
	green.classList.remove('active')
	blue.classList.remove('active')
}
green.onclick = function(){
	context.fillStyle = 'green'
	context.strokeStyle = 'green'
	green.classList.add('active')
	red.classList.remove('active')
	blue.classList.remove('active')
}
blue.onclick = function(){
	context.fillStyle = 'blue'
	context.strokeStyle = 'blue'
	blue.classList.add('active')
	green.classList.remove('active')
	red.classList.remove('active')
}

thin.onclick = function(){
	lineWidth = 5
}
thick.onclick = function(){
	lineWidth = 10
}

//画圆函数
function huayuan(x,y,radius){ 
  context.beginPath() 
  // context.fillStyle = 'green' //填充圆红色
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill()
}
//划线函数
function huaxian(x1,y1,x2,y2){
  context.beginPath();
  // context.strokeStyle = '#666' //线的颜色
  context.moveTo(x1,y1)//起点
  context.lineWidth = lineWidth
  context.lineTo(x2,y2)//终点
  context.stroke()
  context.closePath()
  
}

//自动设置canvas宽高函数
function autoSetCanvasSize(canvas){
    setCanvasSize()
  
    window.onresize = function(){
      setCanvasSize()
    }

    function setCanvasSize(){
      var pageWidth = document.documentElement.clientWidth   
      var pageHeight =document.documentElement.clientHeight    


      canvas.width = pageWidth  
      canvas.height = pageHeight
    }
}

//监听鼠标函数
function listenterurser(canvas){
  var using = false 
  var lastPoint = {
    x:undefined,  
    y:undefined
  }

  
  //特性检测
  if (document.body.ontouchstart !== undefined){
  //触屏设备
 	canvas.ontouchstart = function(aaa){
  		// console.log('开始摸我了')
  		var x = aaa.touches[0].clientX
    	var y = aaa.touches[0].clientY
    	// console.log(x,y)
    	using = true
    	if(buttonState){
      		context.clearRect(x-5,y-5,20,20)
    	}else{
        	lastPoint = {
          		'x':x,
          		'y':y  
        	}
    	}

  	}

  	canvas.ontouchmove = function(aaa){
    	// console.log('变摸边懂')
    	var x = aaa.touches[0].clientX
       	var y = aaa.touches[0].clientY
       	aaa.preventDefault();
       	if(!using){return}
       	if(buttonState){
        	context.clearRect(x-5,y-5,20,20)
       	}else{
           var newPoint = {
             'x':x,
             'y':y
           }
           huaxian(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
           lastPoint = newPoint
        }
  	}    
  	canvas.ontouchend = function(aaa){
    	// console.log('摸完了')
    	using = false
  	}

  }else{
		//非触屏设备
	canvas.onmousedown = function(aaa){
    	var x = aaa.clientX
    	var y = aaa.clientY
    	using = true
    	if(buttonState){
      		context.clearRect(x-5,y-5,20,20)
    	}else{
        	lastPoint = {
          		'x':x,
          		'y':y  
        	}
    	}
	//huayuan(x,y,3);
    }

   canvas.onmousemove = function(aaa){
       var x = aaa.clientX
       var y = aaa.clientY
       if(!using){return}
       if(buttonState){
         context.clearRect(x-5,y-5,20,20)
       }else{
           var newPoint = {
             'x':x,
             'y':y
           }
           huaxian(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
           lastPoint = newPoint
        }
    }
    canvas.onmouseup = function(aaa){
      using = false
    }
	}
}