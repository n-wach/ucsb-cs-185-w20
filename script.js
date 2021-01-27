

document.querySelectorAll(".gallery-item").forEach(
    (item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();

            let modalBack = document.createElement("div");
            modalBack.classList.add("modal-back");

            let modal = document.createElement("div");
            modal.classList.add("modal");

            const media = item.firstElementChild;

            let mediaClone = media.cloneNode(true);

            mediaClone.addEventListener("click", (event) => {
                event.stopPropagation();
            })

            mediaClone.controls = true;
            mediaClone.autoplay = true;
            modal.appendChild(mediaClone);

            modalBack.appendChild(modal);

            modalBack.addEventListener("click", () => {
                modalBack.remove();
            })

            document.body.append(modalBack);
        })
    }
);

let scrollButton = document.createElement("div");
scrollButton.classList.add("scroll-button");
scrollButton.textContent = "Scroll to Top";
scrollButton.style.opacity = "0";
scrollButton.style.pointerEvents = "none";
scrollButton.onclick = () => {
    window.scrollTo(0, 0);
}
document.body.appendChild(scrollButton);

document.onscroll = () => {
    let scroll = window.pageYOffset / window.innerHeight;
    if(scroll > 0.25) {
        scrollButton.style.opacity = "1";
        scrollButton.style.pointerEvents = "all";
    } else {
        scrollButton.style.opacity = "0";
        scrollButton.style.pointerEvents = "none";
    }
}

function checkEmail(event) {
    event.preventDefault();
    let status = document.querySelector("span.error");
    let email = document.querySelector("input[name='email']").value;
    if (email.indexOf("@") !== -1 && (email.endsWith(".com") || email.endsWith(".edu"))) {
        status.textContent = "Email successfully recorded.";
        status.style.color = "green";
    } else {
        status.textContent = "Invalid email address.";
        status.style.color = "red";
    }
}
