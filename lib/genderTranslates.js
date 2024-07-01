export function gT(str, gender) {
    // console.log("gender:", gender);
    if (gender == "чоловіча" || gender == undefined) return str
    else {
        switch (str) {
            case "доцент":
                return "доцентка";
            case "професор":
                return "професорка";
            case 'завідувач кафедрою':
                return 'завідувачка кафедрою';
            case "заступник завідувача кафедрою":
                return "заступниця завідувача кафедрою";
            case "старший викладач":
                return "старша викладачка";
            case "викладач":
                return "викладачка";
            case "асистент":
                return "асистентка";
            case "провідний інженер":
                return "провідна інженерка";
            case "інженер 2-ї категорії":
                return "інженерка 2-ї категорії";
            case "інженер 1-ї категорії":
                return "інженерка 1-ї категорії";
            case "лаборант":
                return "лаборантка";
            case "":
                return "";
            case "":
                return "";
            case "":
                return "";
            case "":
                return "";
            case "":
                return "";
            case "":
                return "";
            case "":
                return "";
            default:
                console.log("Something went wrong");
        }
    }

}
