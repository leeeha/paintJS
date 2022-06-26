// Canvas는 Context를 갖고 있는 html의 한 요소인데, 
// 우리는 이걸로 픽셀을 다룰 수 있게 된다! 
// Context는 캔버스의 픽셀에 접근해서 컨트롤 하는 역할! (2d, 3d)
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// 선의 색상과 두께 변경에 사용 
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");

// 캔버스를 css가 아니라 '픽셀'로 다루려면, 그 크기를 지정해줘야 한다!!! 
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; // 색상 
ctx.lineWidth = 2.5; // 두께 

let painting = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        // 캔버스 위의 어떤 (x, y)도 path(line)의 시작점이 될 수 있다.  
        //console.log("creating path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y); // path의 시작점 
    }else{
        // 마우스를 클릭한 path의 시작점부터 현재 (x, y)까지 
        // 마우스를 움직이는 내내 선을 그린다. 
        //console.log("creating line in ", x, y);
        ctx.lineTo(x, y);
        ctx.stroke(); // 이걸 해야 선이 그려짐! 
        //ctx.closePath(); // 이걸 하면 시작점이 고정됨. 
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // 오버라이드 
}

function handleRangeChange(event){
    const size = event.target.value;;
    ctx.lineWidth = size;
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);

    // 마우스를 클릭해서 페인팅을 시작하면 true, 마우스를 다시 놓으면 false
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting); // 캔버스 벗어나는 경우 
}

// 각 컬러 버튼을 클릭하면 strokeStyle 색상이 변경되도록 이벤트 처리 
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange);
}