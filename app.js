// Canvas�� Context�� ���� �ִ� html�� �� ����ε�, 
// �츮�� �̰ɷ� �ȼ��� �ٷ� �� �ְ� �ȴ�! 
// Context�� ĵ������ �ȼ��� �����ؼ� ��Ʈ�� �ϴ� ����! (2d, 3d)
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// ���� ����� �β� ���濡 ��� 
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");

// ĵ������ css�� �ƴ϶� '�ȼ�'�� �ٷ����, �� ũ�⸦ ��������� �Ѵ�!!! 
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; // ���� 
ctx.lineWidth = 2.5; // �β� 

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
        // ĵ���� ���� � (x, y)�� path(line)�� �������� �� �� �ִ�.  
        //console.log("creating path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y); // path�� ������ 
    }else{
        // ���콺�� Ŭ���� path�� ���������� ���� (x, y)���� 
        // ���콺�� �����̴� ���� ���� �׸���. 
        //console.log("creating line in ", x, y);
        ctx.lineTo(x, y);
        ctx.stroke(); // �̰� �ؾ� ���� �׷���! 
        //ctx.closePath(); // �̰� �ϸ� �������� ������. 
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // �������̵� 
}

function handleRangeChange(event){
    const size = event.target.value;;
    ctx.lineWidth = size;
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);

    // ���콺�� Ŭ���ؼ� �������� �����ϸ� true, ���콺�� �ٽ� ������ false
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting); // ĵ���� ����� ��� 
}

// �� �÷� ��ư�� Ŭ���ϸ� strokeStyle ������ ����ǵ��� �̺�Ʈ ó�� 
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange);
}