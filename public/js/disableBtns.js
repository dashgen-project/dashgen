// Disable dropdowns which don't have elements inside

dropdownBtns = document.getElementsByClassName("dropdown-menu");
for (let btn of dropdownBtns) {
    if (btn.childElementCount < 1) {
        btnTag = btn.previousSibling.previousSibling;
        btnTag.classList.add("disabled");
    }
}