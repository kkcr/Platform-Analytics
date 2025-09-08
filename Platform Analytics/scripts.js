const rightCon = document.getElementById("mrightcon");
const defaultHome = rightCon.innerHTML;

const headers = document.querySelectorAll(".overview_header");

headers.forEach(header => {
    header.addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;

        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }

        const allClosed = [...document.querySelectorAll(".tut_overview")]
            .every(section => section.style.display === "none" || section.style.display === "");
        
        if (allClosed) {
            rightCon.innerHTML = defaultHome;
        }
    });
});

const links = document.querySelectorAll(".tut_overview a");

links.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const file = this.getAttribute("data-file");

        links.forEach(l => l.classList.remove("active"));

        this.classList.add("active");

        fetch(file)
            .then(response => response.text())
            .then(data => {
                rightCon.innerHTML = data;
            })
            .catch(err => {
                rightCon.innerHTML = "<p style='color:red;'>Error loading content.</p>";
                console.error(err);
            });
    });
});
