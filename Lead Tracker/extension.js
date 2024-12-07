let myLeads = []
const inputEl = document.getElementById("input_el")
const inputBtn = document.getElementById("input_btn")
const ulel = document.getElementById("saved_el")
const tabBtn = document.getElementById("tab_btn")
const deletebutton = document.getElementById("delete-btn")


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deletebutton.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})



function render(leads) {
    let listItems = ""
    for(let i=0; i<leads.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
    </li>`
        }
    ulel.innerHTML = listItems
}