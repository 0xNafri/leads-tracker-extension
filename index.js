const inpuEl = document.getElementById("input-el")
const saveEl = document.getElementById("save-el")
const tabEl = document.getElementById("tab-el")
const delEl = document.getElementById("del-el")
const listEl = document.getElementById("leads-list")
let currentLeads = []
let leadsLocalStorage = JSON.parse(localStorage.getItem("leads"))


if(leadsLocalStorage) {
    currentLeads = leadsLocalStorage
    render(currentLeads)
}

function render(leads) {
    let listItems = ""
    for(let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>`
    }
    listEl.innerHTML = listItems
}


function pushLeads() {
    currentLeads.push(inpuEl.value)
    inpuEl.value = ""
    localStorage.setItem("leads", JSON.stringify(currentLeads))
    render(currentLeads)
}



function tabLeads() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        currentLeads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(currentLeads) )
        render(currentLeads)
    })

}

function delLeads () {
    localStorage.clear()
    currentLeads = []
    render(currentLeads)
}




saveEl.addEventListener("click", pushLeads)
tabEl.addEventListener("click", tabLeads)
delEl.addEventListener("click", delLeads)