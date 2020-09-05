const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d")

// 조작하고자 하는 픽셀들의 너비를 설정. css와 같게 해주자.
canvas.width = 700
canvas.height = 700

// 픽셀에 접근하는 context의 파라미터를 설정할거야
ctx.strokeStyle = "#2c2c2c"
ctx.lineWidth = 2.5

// 마우스를 클릭했을 때 painting은 true가 될거야
let painting = false

function stopPainting() {
    painting = false
}
function startPainting() {
    painting = true
}

// 패스를 만들자
function onMouseMove(event) {
    const x = event.offsetX
    const y = event.offsetY
    // 패스의 시작점은 클릭하는 시점까지로 옮겨져야 한다
    if (!painting) {
        ctx.beginPath()
        ctx.moveTo(x, y)
    } else {
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}
function onMouseDown(event) {
    painting = true
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
}
