

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
