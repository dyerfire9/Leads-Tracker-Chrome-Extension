// 
let data = ["Ducky", "Hello", "Abdul"].toString()
    // Function to download data to a file
function download(text, name, type) {
    let a = document.getElementById("a");
    let file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
}


let button = document.getElementById("btn")
button.addEventListener("click", download(data, 'myfilename.txt', 'text/plain'))