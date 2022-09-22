let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if(!myLeads.includes(tabs[0].url)){ // TODO: CHECK FUCNTIONALITY of duplicate links - Lines 16 & 47-48
            myLeads.push(tabs[0].url)
        }
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
    createFile(formattext(myLeads), 'My Leads.txt', 'text/plain')

}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    if(!myLeads.includes(inputEl.value)){
        myLeads.push(inputEl.value)
    }
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

function createFile(text, name, type) {
    let link = document.getElementById("a");
    let file = new Blob([text], { type: type });
    link.href = URL.createObjectURL(file);
    link.download = name;
}

function formattext(data) {
    let text = ``
    for (let i = 0; i < data.length; i++) {
        text += data[i] + '\n'
    }
    return text
}