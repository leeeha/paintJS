// Canvas는 Context를 갖고 있는 html의 한 요소인데, 
// 우리는 이걸로 픽셀을 다룰 수 있게 된다! 
// Context는 캔버스의 픽셀에 접근해서 컨트롤 하는 역할! (2d, 3d)
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// 선의 색상과 두께 변경에 사용 
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");

// 버튼 토글해서 Fill, Paint 모드 변경 
const mode = document.getElementById("jsMode");

// Save 버튼 클릭해서 이미지 저장하기 
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// 캔버스를 css가 아니라 '픽셀'로 다루려면, 그 크기를 지정해줘야 한다!!! 
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; // 캔버스의 기본 배경색 설정 
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR; // 선의 색상  
ctx.fillStyle = INITIAL_COLOR; // 채울 색상 
ctx.lineWidth = 2.5; // 선의 두께 

let painting = false;
let filling = false;

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
    ctx.strokeStyle = color;  
    ctx.fillStyle = color; 
}

function handleRangeChange(event){
    const size = event.target.value;;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling){
        filling = false;
        mode.innerText = "Fill"; 
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

// 마우스 우클릭으로 이미지 저장하는 거 방지
function handleCM(event){
    event.preventDefault();  
}

function handleSaveClick(){
    // 캔버스의 데이터를 이미지로 얻기 
    const image = canvas.toDataURL(); // 기본은 png 

    // 다운로드 링크 만들기 
    const link = document.createElement("a");
    link.href = image; 
    link.download = "PaintJS"; 

    // 클릭을 가짜로 만들기
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);

    // 마우스를 클릭해서 페인팅을 시작하면 true, 마우스를 다시 놓으면 false
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting); // 캔버스 벗어나는 경우 
    
    // Fill 모드에서 클릭하면 캔버스가 전부 색상으로 채워지도록 
    canvas.addEventListener("click", handleCanvasClick);

    // 이미지 저장 버튼 
    canvas.addEventListener("contextmenu", handleCM);
}

// 각 컬러 버튼을 클릭하면 strokeStyle 색상이 변경되도록 이벤트 처리 
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
    );
    
    if(range){
        range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}