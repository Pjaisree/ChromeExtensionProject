let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// Get leads from localStorage
const leadsFromLocalStorage = JSON.parse(
    localStorage.getItem("myLeads")
);

// Load saved leads when the extension starts
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// SAVE TAB button
tabBtn.addEventListener("click", function() {
    chrome.tabs.query(
        { active: true, currentWindow: true },
        function(tabs) {
            myLeads.push(tabs[0].url);

            localStorage.setItem(
                "myLeads",
                JSON.stringify(myLeads)
            );

            render(myLeads);
        }
    );
});

// Render leads on the page
function render(leads) {
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank">
                    ${leads[i]}
                </a>
            </li>
        `;
    }

    ulEl.innerHTML = listItems;
}

// DELETE ALL button
deleteBtn.addEventListener("dblclick", function() {
    localStorage.removeItem("myLeads");

    myLeads = [];

    render(myLeads);
});

// SAVE INPUT button
inputBtn.addEventListener("click", function() {
    let link = inputEl.value.trim();

    // Don't save empty input
    if (link === "") {
        return;
    }

    // Add https:// if the user didn't type it
    if (
        !link.startsWith("http://") &&
        !link.startsWith("https://")
    ) {
        link = "https://" + link;
    }

    // Add the link to the array
    myLeads.push(link);

    // Save to localStorage
    localStorage.setItem(
        "myLeads",
        JSON.stringify(myLeads)
    );

    // Clear input
    inputEl.value = "";

    // Display leads
    render(myLeads);
});
