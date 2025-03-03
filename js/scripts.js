document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".video");

    videos.forEach(video => {
        // Ensure video is muted for autoplay policies
        video.muted = true;

        video.addEventListener("mouseenter", () => {
            if (video.readyState >= 2) { // Ensure video is loaded
                video.play();
            }
        });

        video.addEventListener("mouseleave", () => {
            video.pause();
        });
    });


    const serviceSelect = document.getElementById("service");
    const subjectField = document.getElementById("subject");

    // Hide subject field by default
    subjectField.style.display = "none";
    
    serviceSelect.addEventListener("change", function () {
        if (serviceSelect.value === "Other") {
            subjectField.style.display = "block";
            subjectField.setAttribute("required", "true"); // Make required
        } else {
            subjectField.style.display = "none";
            subjectField.removeAttribute("required"); // Remove required when hidden
        }
    });

    //event listener for the emailJS form
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault(); //prevent page reload

        sendMail(); //call sendMail function
    });

    // Smooth scroll to "about" section
    document.getElementById("scroll-down").addEventListener("click", function () {
        document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    });
});

//emailJS function to send mail
function sendMail() {
    let parms = {
        subject: document.getElementById("subject").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        service: document.getElementById("service").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_4d3tyrs", "template_qzp4507", parms)
    .then(
        function(response) {
            alert("Email sent successfully!");
            console.log("SUCCESS", response);
        }, 
        function(error) {
            alert("Failed to send email.");
            console.log("FAILED", error);
        }
    );
}