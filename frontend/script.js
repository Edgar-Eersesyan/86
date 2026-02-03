let $ = s => document.querySelector(s);

$("#btn").onclick = function() {
    let inputName = $("#regName").value.trim();
    let inputEmail = $("#regEmail").value.trim();
    let inputPassword = $("#regPassword").value;
    let inputPassword2 = $("#regPassword2").value;
    let isAdmin = $("#regIsAdmin").checked;

    let answer = true;
    if (inputName.length <= 2) {
        alert("Please enter Name");
        answer = false;
    } else if (inputEmail === "") {
        alert("Please enter Email");
        answer = false;
    } else if (inputPassword.length < 6) {
        alert("Password must be at least 6 characters");
        answer = false;
    } else if (inputPassword2 !== inputPassword) {
        alert("Passwords do not match");
        answer = false;
    }

    if (answer === true) {

        let users = JSON.parse(localStorage.getItem("users") || "[]");

        let newUser = {
            id: Date.now(),
            name: inputName,
            email: inputEmail,
            password: inputPassword,
            role: isAdmin ? "admin" : "user",
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully");

        $("#regName").value = ""
        $("#regEmail").value = "";
        $("#regPassword").value = "";
        $("#regPassword2").value = "";
        $("#regIsAdmin").checked = false;
    }
}


$("#btnLogin").onclick = function() {
    let email = $("#loginEmail").value.trim();
    let password = $("#loginPassword").value;
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = users.find(res =>res.email === email && res.password === password);

    if(user) {
        localStorage.setItem("session", JSON.stringify(user))

        alert("Login successful")
        $("#guestArea").classList.add("d-none")
        $("#appArea").classList.remove("d-none")

        $("#profileName").value = user.name
        $("#profileEmail").value = user.email
        $("#profileRole").value = user.role
        $("#profileId").value = user.id

        if(user.role === "admin") {
            $("#adminTabBtn").classList.remove("d-none")
        } else {
            $("#adminTabBtn").classList.add("d-none")
        }

    } else {
        alert("Invalid email or password!");
    }
};
