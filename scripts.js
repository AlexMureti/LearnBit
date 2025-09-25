//checkCode function 
function checkCode() {
    let userInput = document.getElementById("code").value;
    userInput = userInput.trim(); // Remove leading/trailing spaces
    if (userInput === ""){
        alert("please enter code");   
    }
        else {
            document.getElementById('feedback').innerText = "Thinking...";
            setTimeout(() => { document.getElementById('feedback').innerText = "Your code is correct!"; 
                addProgress('Checked: ' + userInput.substring(0, 20) + '...');
                document.getElementById('code').value = '';
            }, 2000);
        }

}
// AddProgress function to add items to progress list
function addProgress(task) {
    let list = document.getElementById('progress'); // Find the progress list
    let item = document.createElement('li'); // Create a new list item
    item.innerHTML = `<input type="checkbox"> ${task}`; // Add checkbox and text
    list.appendChild(item); // Add item to list
}