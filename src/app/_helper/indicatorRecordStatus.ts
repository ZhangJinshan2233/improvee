import {
    differenceInCalendarYears
} from 'date-fns';
export function get_record_status(record, userInfo?) {
    let newRecord=JSON.parse(JSON.stringify(record))
    let { name, value } = record;
    let { dateOfBirth, height, gender } = userInfo
    let age = differenceInCalendarYears(new Date(), new Date(dateOfBirth))
    let trimedname = name.replace(/\s/g, "")
    if (indicatorStatus[trimedname] !== undefined) {
        let handlerStatus = indicatorStatus[trimedname]
        newRecord.status = handlerStatus(+value, height, gender, age)
    }
    return  newRecord
}
//wellness 
export function set_weight_status (value, height) {
    let status = '';
    let BMI = +((value) * 10000 / (height * height)).toFixed(1);
    switch (true) {
        case (BMI < 18.5): status = "Underweight";
            break;
        case (BMI <= 24.9): status = "Normal"
            break;
        case (BMI <= 29.9): status = 'Overweight'
            break;
        case (BMI >= 30): status = 'Obese'
            break;
        default: status = ''
            break
    }
    return status
}

let set_Waist_status = (value, height, gender) => {
    let status = '';
    if (gender == 'female') {
        switch (true) {
            case (value < 80): status = "Ideal";
                break;
            case (value <= 88): status = "High Risk"
                break;
            case (value > 88): status = 'Very High Risk'
                break;
            default: status = ''
                break
        }
    } else {
        switch (true) {
            case (value < 94): status = "Ideal";
                break;
            case (value <= 102): status = "High Risk"
                break;
            case (value > 102): status = 'Very High Risk'
                break;
            default: status = ''
                break
        }
    }

    return status
}
let set_Muscle_status = (value, height, gender, age) => {
    let status = '';
    if (gender === 'female') {
        switch (true) {
            case (age <= 39): status = set_status_based_on_value(value, 24.3, 30.3, 35.3, 35.4)
                break;
            case (age <= 59): status = set_status_based_on_value(value, 24.1, 30.1, 35.1, 35.2)
                break;
            case (age <= 80): status = set_status_based_on_value(value, 23.9, 29.9, 34.9, 35.0)
                break;
            case (age > 80): status = set_status_based_on_value(value, 23.9, 29.9, 34.9, 35.0)
                break;
            default: status = ''
                break
        }
    } else {
        switch (true) {
            case (age <= 39): status = set_status_based_on_value(value, 33.3, 39.3, 44.0, 44.1)
                break;
            case (age <= 59): status = set_status_based_on_value(value, 33.1, 39.1, 43.8, 43.9)
                break;
            case (age <= 80): status = set_status_based_on_value(value, 32.9, 38.9, 43.6, 43.7)
                break;
            case (age > 80): status = set_status_based_on_value(value, 32.9, 38.9, 43.6, 43.7)
                break;
            default: status = ''
                break
        }
    }
    return status
}

let set_Fat_status = (value, height, gender, age) => {
    let status = '';
    if (gender === 'female') {
        switch (true) {
            case (age <= 39): status = set_status_based_on_value(value, 21, 32, 38, 39)
                break;
            case (age <= 59): status = set_status_based_on_value(value, 23, 33, 39, 40)
                break;
            case (age <= 80): status = set_status_based_on_value(value, 24, 35, 41, 42)
                break;
            case (age > 80): status = set_status_based_on_value(value, 24, 35, 41, 42)
                break;
            default: status = ''
                break
        }
    } else {
        switch (true) {
            case (age <= 39): status = set_status_based_on_value(value, 8, 19, 24, 25)
                break;
            case (age <= 59): status = set_status_based_on_value(value, 11, 21, 27, 28)
                break;
            case (age <= 80): status = set_status_based_on_value(value, 13, 24, 29, 30)
                break;
            case (age > 80): status = set_status_based_on_value(value, 13, 24, 29, 30)
                break;
            default: status = ''
                break
        }
    }
    return status
}
let set_status_based_on_value = (value, lowValue, normalValue, heighValue, veryHighValue) => {
    let status = '';
    switch (true) {
        case (value < lowValue): status = "Low";
            break;
        case (value <= normalValue): status = "Normal"
            break;
        case (value <= heighValue): status = 'High'
            break;
        case (value >= veryHighValue): status = 'Very high'
            break;
        default: status = ''
            break;
    }
    return status
}
//medical
let set_SystolicBP_status = (value) => {

    let status = '';
    switch (true) {
        case (value <= 130): status = "​Normal BP";
            break;
        case (value <= 139): status = "Borderline"
            break;
        case (value <= 159): status = "High"
            break;
        case (value > 160): status = 'Very high'
            break;
        default: status = ''
            break
    }
    return status
};

let set_DiastolicBP_status = (value) => {
    let status = '';
    switch (true) {
        case (value <= 80): status = "​Normal BP";
            break;
        case (value <= 89): status = "Borderline"
            break;
        case (value <= 99): status = "High"
            break;
        case (value > 100): status = 'Very high'
            break;
        default: status = ''
            break
    }
    return status
}

let set_TotalCholesterol_status = (value) => {
    let status = '';
    switch (true) {
        case (value < 5.2): status = "Desirable";
            break;
        case (value <= 6.1): status = "Borderline High"
            break;
        case (value > 6.2): status = 'High'
            break;
        default: status = ''
            break
    }
    return status
}
let set_HDLCholesterol_status = (value) => {
    let status = '';
    switch (true) {
        case (value <= 1.5): status = "Desirable";
            break;
        case (value >= 1.6): status = 'High'
            break;
        default: status = ''
            break
    }
    return status
}
let set_LDLCholesterol_status = (value) => {
    let status = '';
    switch (true) {
        case (value < 3.4): status = "Desirable";
            break;
        case (value <= 4.0): status = "Borderline"
            break;
        case (value <= 4.8): status = "High"
            break;
        case (value >=4.9): status = 'Very high'
            break;
        default: status = ''
            break
    }
    return status
}

let set_Triglyceride_status = (value) => {
    let status = '';
    switch (true) {
        case (value <2.3): status = "Desirable";
            break;
        case (value <= 4.4): status = "High"
            break;
        case (value >=4.5): status = 'Very high'
            break;
        default: status = ''
            break
    }
    return status
}

let set_BloodGlucose_status = (value) => {
    let status = '';
    switch (true) {
        case (value <=6.0): status = "Excellent";
            break;
        case (value <= 8.0): status = "Good"
            break;
        case (value <=10.0): status = "Acceptable"
            break;
        case (value >10.0): status = 'Poor'
            break;
        default: status = ''
            break
    }
    return status
}

//Fitness
let setHandGripRSratus=(value)=>{
    
}


let indicatorStatus = {
    weight: set_weight_status,
    waist: set_Waist_status,
    muscle: set_Muscle_status,
    fat: set_Fat_status,
    SystolicBP: set_SystolicBP_status,
    DiastolicBP: set_DiastolicBP_status,
    TotalCholesterol: set_TotalCholesterol_status,
    HDLCholesterol: set_HDLCholesterol_status,
    LDLCholesterol:set_LDLCholesterol_status,
    Triglyceride:set_Triglyceride_status,
    BloodGlucose:set_BloodGlucose_status
}