const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d")
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")
const saveBtn = document.getElementById("jsSave")

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700

// 조작하고자 하는 픽셀들의 너비를 설정. css와 같게 해주자.
canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

// 픽셀에 접근하는 context의 기본 파라미터를 설정 + canvas의 기본배경은 흰색
ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.strokeStyle = INITIAL_COLOR
ctx.lineWidth = 2.5
ctx.fillStyle = INITIAL_COLOR

// 디폴트 상태값을 저장
let painting = false
let filling = false

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

function handleColorClick(event) {
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color
    ctx.fillStyle = color
}

function handleRangeChange(event) {
    const size = event.target.value
    ctx.lineWidth = size
}

// Brush / Fill상태를 번갈아간다
function handleModeClick() {
    if (filling === true) {
        filling = false
        mode.innerText = "Fill"
    } else {
        filling = true
        mode.innerText = "Brush"
    }
}

// Brush / Fill상태에 따라서 캔버스를 클릭했을 때 다르게 행동
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

// contextmenu를 기본이벤트 비활성화
function handleCM(event) {
    console.log(event)
    event.preventDefault()
}

// 저장버튼 활성화
function handleSaveClick() {
    const image = canvas.toDataURL()
    const link = document.createElement("a")
    link.href = image
    link.download = "paintJS[EXPERT♥]"
    link.click()
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach((eachDiv) => eachDiv.addEventListener("click", handleColorClick))

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}
