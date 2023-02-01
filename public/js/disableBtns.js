/**
 * @file Disable dropdown buttons which do not have content
 */

dropdownBtns = document.getElementsByClassName("dropdown-menu");
for (let btn of dropdownBtns) {
    if (btn.childElementCount < 1) {
        btnTag = btn.previousSibling.previousSibling;
        btnTag.classList.add("disabled");
    }
}