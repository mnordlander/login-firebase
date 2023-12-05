
function redirectIfNotAuthenticated() {
    firebase.auth().onAuthStateChanged(function (user) {

        if (!user) {
            // User is not signed in, redirect to login.html
            window.location.href = "login.html";
        }
    });
}

// Call the function to redirect if not authenticated
redirectIfNotAuthenticated();


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        let userName = firebase.auth().currentUser.displayName;
        document.getElementById('welcomeMessage').innerText = 'Welcome ' + userName + '!';

        if (window.location.href === 'http://127.0.0.1:5501/home.html') {
            let homePage = document.querySelector('title');
            homePage.innerHTML = 'Welcome ' + userName;
        }
        // Logout button click event listener
        document.getElementById("logout").addEventListener("click", function () {
            firebase.auth().signOut().then(function () {
                // User is logged out, redirect to login page
                window.location.href = "login.html";
            }).catch(function (error) {
                console.log("Error occurred during logout:", error);
            });
        });
    } else if (userName === null) {
        // If lost connection with firebase and still get vaidated
        window.location.href = "login.html";
    } else {
        // User is not logged in, redirect to login page
        window.location.href = "login.html";
    }

    // alt code for checking validation
    // if( !user || username === null){} 
});

function displayMembers(members) {
    const memberList = document.getElementById("member-list");

    memberList.innerHTML = ""; // Clear previous member list

    members.forEach(function (member) {
        const firstName = member.firstName;
        const lastName = member.lastName;
        const fullName = firstName + " " + lastName;

        const memberItem = document.createElement("p");
        memberItem.textContent = fullName;

        memberList.appendChild(memberItem);
    });
}


// Show firebase members first and last name
function getUsers() {
    const db = firebase.firestore();

    db.collection("users")
        .get()
        .then(function (querySnapshot) {
            // ev. change const members vaible to let?
            const members = [];
            querySnapshot.forEach(function (doc) {
                const memberData = doc.data();
                members.push(memberData);
            });
            displayMembers(members);
        })
        .catch(function (error) {
            console.log("Error getting users:", error);
        });
}

