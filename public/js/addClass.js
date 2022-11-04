let classes;
const addClassBtn = document.getElementById("addClass");
const classesContainer = document.getElementById("classesContainer");
const dashboardId = window.location.href.substring().split("/")[4];
classesContainer.classList.add("mb-3");
const deleteClassBtns = document.querySelectorAll(".delete-class-btn");
const axios = require('axios');

for (btn of deleteClassBtns) {
    btn.addEventListener("click", async evt => {
        const classToRemove = evt.currentTarget.parentNode.parentNode;
        currentClassNumber = evt.currentTarget.getAttribute("id").split("_")[1];
        // Test:
        // await axios.post(`/courseDashboards/${dashboard._id}/${currentClassNumber}?_method=DELETE`);
        classToRemove.remove();
        const numberOfClasses = document.querySelectorAll("#classesContainer > .class-card").length;
        for (classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .card-title")) {
            classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
            if (classNumber > currentClassNumber) {
                classElement.innerHTML = `Aula ${classNumber}`;
            }
        }
        for (classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .delete-class-btn")) {
            classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
            if (classNumber > currentClassNumber) {
                classElement.setAttribute("id", `deleteClass_${classNumber - 1}`);
            }
        }
        for (classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .btn-primary")) {
            classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
            if (classNumber > currentClassNumber) {
                classElement.setAttribute("href", `/courseDashboards/${dashboardId}/${classes - 1}`);
            }
        }
        document.getElementById("numberOfClasses").value--;
        classes--;
    })
}

addClassBtn.addEventListener("click", () => {
    classes = document.getElementById("numberOfClasses").value * 1;
    const classCard = document.createElement("div");
    classCard.setAttribute("id", `class_${classes}`);
    classCard.classList.add("card", "class-card", "col-4");
    classCard.innerHTML = `
    <div class="card-body">
        <h5 class="card-title" id="titleAula">Aula ${classes + 1}</h5>
        <h6 id="titleAula">Título</h6>
        <a class="btn btn-primary" href="/courseDashboards/${dashboardId}/${classes}">Editar aula</a>
        <button class="btn btn-danger delete-class-btn" type="button" id="deleteClass_${classes}">Deletar aula</button>
    </div>`;
    classesContainer.appendChild(classCard);
    document.getElementById(`deleteClass_${classes}`).addEventListener("click", evt => {
        const classToRemove = evt.currentTarget.parentNode.parentNode;
        currentClassNumber = evt.currentTarget.getAttribute("id").split("_")[1];
        classToRemove.remove();
        const numberOfClasses = document.querySelectorAll("#classesContainer > .class-card").length;
        for (classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .card-title")) {
            classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
            if (classNumber > currentClassNumber) {
                classElement.innerHTML = `Aula ${classNumber}`;
            }
        }
        for (classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .delete-class-btn")) {
            classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
            if (classNumber > currentClassNumber) {
                classElement.setAttribute("id", `deleteClass_${classNumber - 1}`);
            }
        }
        for (classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .btn-primary")) {
            classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
            if (classNumber > currentClassNumber) {
                classElement.setAttribute("href", `/courseDashboards/${dashboardId}/${classes - 1}`);
            }
        }
        document.getElementById("numberOfClasses").value--;
        classes--;
    });
    document.getElementById("numberOfClasses").value++;
    classes++;
});