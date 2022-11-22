// let classes;
// const addClassBtn = document.getElementById("addClass");
// const classesContainer = document.getElementById("classesContainer");
// const dashboardId = window.location.href.substring().split("/")[4];
// classesContainer.classList.add("mb-3");
// const deleteClassBtns = document.querySelectorAll(".delete-class-btn");

// for (let btn of deleteClassBtns) {
//     btn.addEventListener("click", async evt => {
//         const classToRemove = evt.currentTarget.parentNode.parentNode;
//         let currentClassNumber = evt.currentTarget.getAttribute("id").split("_")[1];
//         // Test:
//         // await axios.post(`/courseDashboards/${dashboard._id}/${currentClassNumber}?_method=DELETE`);
//         classToRemove.remove();
//         const numberOfClasses = document.querySelectorAll("#classesContainer > .class-card").length;
//         for (let classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .card-title")) {
//             classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
//             if (classNumber > currentClassNumber) {
//                 classElement.innerHTML = `Aula ${classNumber}`;
//             }
//         }
//         for (let classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .delete-class-btn")) {
//             classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
//             if (classNumber > currentClassNumber) {
//                 classElement.setAttribute("id", `deleteClass_${classNumber - 1}`);
//             }
//         }
//         for (let classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .btn-primary")) {
//             classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
//             if (classNumber > currentClassNumber) {
//                 classElement.setAttribute("href", `/courseDashboards/${dashboardId}/${classes - 1}`);
//             }
//         }
//         document.getElementById("numberOfClasses").value--;
//         classes--;
//     })
// }

// addClassBtn.addEventListener("click", () => {
//     classes = document.getElementById("numberOfClasses").value * 1;
//     const classCard = document.createElement("div");
//     classCard.setAttribute("id", `class_${classes}`);
//     classCard.classList.add("card", "class-card", "col-4");
//     // Test with input elemtn:
//     classCard.innerHTML = `
//     <div class="card-body">
//         <h5 class="card-title" id="titleAula">Aula ${classes + 1}</h5>
//         <h6 id="titleAula">Título</h6>
//         <input class="d-none" type="number" name="dashboard[classes][${classes}][classNumber]" value="${classes}">
//         <a class="btn btn-primary" href="/courseDashboards/${dashboardId}/${classes}">Editar aula</a>
//         <button class="btn btn-danger delete-class-btn" type="button" id="deleteClass_${classes}">Deletar aula</button>
//     </div>`;
//     classesContainer.appendChild(classCard);
//     document.getElementById(`deleteClass_${classes}`).addEventListener("click", evt => {
//         const classToRemove = evt.currentTarget.parentNode.parentNode;
//         let currentClassNumber = evt.currentTarget.getAttribute("id").split("_")[1];
//         classToRemove.remove();
//         const numberOfClasses = document.querySelectorAll("#classesContainer > .class-card").length;
//         // Improve this sequence of loops. That's sad.
//         for (let classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .card-title")) {
//             let classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
//             if (classNumber > currentClassNumber) {
//                 classElement.innerHTML = `Aula ${classNumber}`;
//             }
//         }
//         for (let classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .delete-class-btn")) {
//             let classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
//             if (classNumber > currentClassNumber) {
//                 classElement.setAttribute("id", `deleteClass_${classNumber - 1}`);
//             }
//         }
//         for (let classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > input")) {
//             let classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
//             if (classNumber > currentClassNumber) {
//                 classElement.setAttribute("name", `dashboard[classes][${classes - 1}]`);
//                 classElement.setAttribute("value", `${classes - 1}`);
//             }
//         }
//         for (let classElement of document.querySelectorAll("#classesContainer > .class-card > .card-body > .btn-primary")) {
//             let classNumber = classElement.parentNode.parentNode.getAttribute("id").split("_")[1];
//             if (classNumber > currentClassNumber) {
//                 classElement.setAttribute("href", `/courseDashboards/${dashboardId}/${classes - 1}`);
//             }
//         }
//         document.getElementById("numberOfClasses").value--;
//         classes--;
//     });

//     document.getElementById("numberOfClasses").value++;
//     classes++;
// });