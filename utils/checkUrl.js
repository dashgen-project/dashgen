// Check if material is on e-disciplinas
// Return false if some material is not
// Return true if all material is
const isMoodle = classesArray => {
    const edisciplinas = 'https://edisciplinas';
    if (classesArray.length) {
        for (individualClass of classesArray) {
            for (let [materialType, material] of Object.entries(individualClass.preClassMaterial.essential)) {
                for (let i = 0; i < 3; i++) {
                    if (materialType !== 'video' && materialType !== 'externalLink') {
                        if (material[i]) {
                            if (material[i].substring(0, 20) !== edisciplinas) {
                                console.log(material[i]);
                                return false;
                            }
                        }
                    }
                }
            }
            for (let [materialType, material] of Object.entries(individualClass.preClassMaterial.nonEssential)) {
                for (let i = 0; i < 3; i++) {
                    if (materialType !== 'video' && materialType !== 'externalLink') {
                        if (material[i]) {
                            if (material[i].substring(0, 20) !== edisciplinas) {
                                console.log(material[i]);
                                return false;
                            }
                        }
                    }
                }
            }
            for (let [materialType, material] of Object.entries(individualClass.forClassMaterial.essential)) {
                for (let i = 0; i < 3; i++) {
                    if (materialType !== 'video' && materialType !== 'externalLink') {
                        if (material[i]) {
                            if (material[i].substring(0, 20) !== edisciplinas) {
                                console.log(material[i]);
                                return false;
                            }
                        }
                    }
                }
            }
            for (let [materialType, material] of Object.entries(individualClass.forClassMaterial.nonEssential)) {
                for (let i = 0; i < 3; i++) {
                    if (materialType !== 'video' && materialType !== 'externalLink') {
                        if (material[i]) {
                            if (material[i].substring(0, 20) !== edisciplinas) {
                                console.log(material[i]);
                                return false;
                            }
                        }
                    }
                }
            }
            for (let [materialType, material] of Object.entries(individualClass.postClassMaterial.essential)) {
                for (let i = 0; i < 3; i++) {
                    if (materialType !== 'video' && materialType !== 'externalLink') {
                        if (material[i]) {
                            if (material[i].substring(0, 20) !== edisciplinas) {
                                console.log(material[i]);
                                return false;
                            }
                        }
                    }
                }
            }
            for (let [materialType, material] of Object.entries(individualClass.postClassMaterial.nonEssential)) {
                for (let i = 0; i < 3; i++) {
                    if (materialType !== 'video' && materialType !== 'externalLink') {
                        if (material[i]) {
                            if (material[i].substring(0, 20) !== edisciplinas) {
                                console.log(material[i]);
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    return true;
}

exports.isMoodle = isMoodle;