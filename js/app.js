function isValidStudentNumber(value) {
    return /^24-\d{4}-\d{3}$/.test(value.trim());
}

function isValidPassword(value) {
    return (
        value.length >= 8 &&
        !/\s/.test(value) &&
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[@$!]/.test(value)
    );
}

if (typeof document !== "undefined") {

    const form = document.getElementById("registrationForm");

    const fullName = document.getElementById("fullName");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const course = document.getElementById("course");
    const terms = document.getElementById("terms");

    const passwordFeedback =
        document.getElementById("passwordFeedback");

    const successMessage =
        document.getElementById("successMessage");

    const registrationSummary =
        document.getElementById("registrationSummary");


    function error(input, errorId, message) {

        const errorElement =
            document.getElementById(errorId);

        errorElement.textContent = message;

        input.setAttribute(
            "aria-invalid",
            message ? "true" : "false"
        );
    }


    function validateFullName() {

        const value = fullName.value.trim();

        if (value === "") {
            error(
                fullName,
                "fullNameError",
                "Full name is required."
            );
            return false;
        }

        if (value.length < 2) {
            error(
                fullName,
                "fullNameError",
                "Full name must be at least 2 characters."
            );
            return false;
        }

        error(fullName, "fullNameError", "");
        return true;
    }


    function validateStudentNumber() {

        const value = studentNumber.value.trim();

        if (value === "") {
            error(
                studentNumber,
                "studentNumberError",
                "Student number is required."
            );
            return false;
        }

        if (!isValidStudentNumber(value)) {
            error(
                studentNumber,
                "studentNumberError",
                "Student number must be in the format 24-1234-123."
            );
            return false;
        }

        error(studentNumber, "studentNumberError", "");
        return true;
    }


    function validateEmail() {

        const value = email.value.trim();

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {
            error(
                email,
                "emailError",
                "Email address is required."
            );
            return false;
        }

        if (!pattern.test(value)) {
            error(
                email,
                "emailError",
                "Enter a valid email address."
            );
            return false;
        }

        error(email, "emailError", "");
        return true;
    }


    function validateMobileNumber() {

        const value = mobileNumber.value.trim();

        const pattern =
            /^(09\d{9}|\+639\d{9})$/;

        if (value === "") {
            error(
                mobileNumber,
                "mobileNumberError",
                "Mobile number is required."
            );
            return false;
        }

        if (!pattern.test(value)) {
            error(
                mobileNumber,
                "mobileNumberError",
                "Use 09XXXXXXXXX or +639XXXXXXXXX."
            );
            return false;
        }

        error(mobileNumber, "mobileNumberError", "");
        return true;
    }


    function validatePassword() {

        const value = password.value;

        if (value === "") {
            error(
                password,
                "passwordError",
                "Password is required."
            );
            return false;
        }

        if (!isValidPassword(value)) {
            error(
                password,
                "passwordError",
                "Password must be 8+ characters, contain an uppercase letter, a digit, @, $, or !, and contain no spaces."
            );
            return false;
        }

        error(password, "passwordError", "");
        return true;
    }


    function updatePasswordFeedback() {

        const value = password.value;

        if (value === "") {
            passwordFeedback.textContent = "";
            passwordFeedback.className = "feedback";
            return;
        }

        if (isValidPassword(value)) {

            passwordFeedback.textContent =
                "Password meets all requirements.";

            passwordFeedback.className =
                "feedback valid";

        } else {

            passwordFeedback.textContent =
                "Password does not meet all requirements.";

            passwordFeedback.className =
                "feedback invalid";
        }
    }


    function validateConfirmPassword() {

        if (confirmPassword.value === "") {
            error(
                confirmPassword,
                "confirmPasswordError",
                "Confirm password is required."
            );
            return false;
        }

        if (confirmPassword.value !== password.value) {
            error(
                confirmPassword,
                "confirmPasswordError",
                "Passwords do not match."
            );
            return false;
        }

        error(
            confirmPassword,
            "confirmPasswordError",
            ""
        );

        return true;
    }


    function validateCourse() {

        if (
            course.value !== "BSIT" &&
            course.value !== "BSCS"
        ) {
            error(
                course,
                "courseError",
                "Please select a course."
            );
            return false;
        }

        error(course, "courseError", "");
        return true;
    }


    function validateTerms() {

        if (!terms.checked) {
            error(
                terms,
                "termsError",
                "You must agree to the terms and conditions."
            );
            return false;
        }

        error(terms, "termsError", "");
        return true;
    }


    function displaySummary() {

        document.getElementById("summaryName").textContent =
            fullName.value.trim();

        document.getElementById("summaryStudentNumber").textContent =
            studentNumber.value.trim();

        document.getElementById("summaryEmail").textContent =
            email.value.trim();

        document.getElementById("summaryMobileNumber").textContent =
            mobileNumber.value.trim();

        document.getElementById("summaryCourse").textContent =
            course.value;

        registrationSummary.hidden = false;
    }


    function clearSummary() {

        document.getElementById("summaryName").textContent = "";
        document.getElementById("summaryStudentNumber").textContent = "";
        document.getElementById("summaryEmail").textContent = "";
        document.getElementById("summaryMobileNumber").textContent = "";
        document.getElementById("summaryCourse").textContent = "";

        registrationSummary.hidden = true;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();

        successMessage.textContent = "";
        registrationSummary.hidden = true;

        const nameOK = validateFullName();
        const studentOK = validateStudentNumber();
        const emailOK = validateEmail();
        const mobileOK = validateMobileNumber();
        const passwordOK = validatePassword();
        const confirmOK = validateConfirmPassword();
        const courseOK = validateCourse();
        const termsOK = validateTerms();

        updatePasswordFeedback();

        if (
            nameOK &&
            studentOK &&
            emailOK &&
            mobileOK &&
            passwordOK &&
            confirmOK &&
            courseOK &&
            termsOK
        ) {

            successMessage.textContent =
                "Registration details validated successfully!";

            displaySummary();
        }
    });


    password.addEventListener("input", function () {
        updatePasswordFeedback();

        if (password.value !== "") {
            validatePassword();
        }

        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }
    });


    fullName.addEventListener(
        "blur",
        validateFullName
    );


    studentNumber.addEventListener(
        "blur",
        validateStudentNumber
    );


    email.addEventListener(
        "blur",
        validateEmail
    );


    mobileNumber.addEventListener(
        "blur",
        validateMobileNumber
    );


    confirmPassword.addEventListener(
        "blur",
        validateConfirmPassword
    );


    course.addEventListener(
        "change",
        validateCourse
    );


    terms.addEventListener(
        "change",
        validateTerms
    );


    form.addEventListener("reset", function () {

        setTimeout(function () {

            const errors = [
                "fullNameError",
                "studentNumberError",
                "emailError",
                "mobileNumberError",
                "passwordError",
                "confirmPasswordError",
                "courseError",
                "termsError"
            ];

            errors.forEach(function (id) {
                document.getElementById(id).textContent = "";
            });


            const controls = [
                fullName,
                studentNumber,
                email,
                mobileNumber,
                password,
                confirmPassword,
                course,
                terms
            ];

            controls.forEach(function (control) {
                control.setAttribute(
                    "aria-invalid",
                    "false"
                );
            });


            passwordFeedback.textContent = "";
            passwordFeedback.className = "feedback";

            successMessage.textContent = "";

            clearSummary();

        }, 0);
    });
}


if (
    typeof module !== "undefined" &&
    module.exports
) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}
