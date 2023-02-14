const mainImage = document.getElementById("main-image");
const mainImageModal = document.getElementById("main-image-modal");
const thumbnailImages = document.querySelectorAll(".thumbnail-image");
const modal = document.getElementById("modal");
const modalCloseBtn = document.getElementById("modal-close-btn");

let isModalOpen = false;

function closeModal() {
	isModalOpen = false;
	modal.classList.add("hidden");
}

function openModal() {
	isModalOpen = true;
	modal.classList.remove("hidden");
}

function changeImage() {
	thumbnailImages.forEach((image) => {
		const parentDiv = image.parentElement;
		image.classList.remove("opacity-50");
		parentDiv.classList.remove("outline", "outline-2", "outline-orange");
	});

	const parentDiv = this.parentElement;
	this.classList.add("opacity-50");
	parentDiv.classList.add("outline", "outline-2", "outline-orange");

	const mainImageSrc = this.src.replace("-thumbnail", "");
	mainImage.src = mainImageSrc;
	mainImageModal.src = mainImageSrc;
}

thumbnailImages.forEach((image) => image.addEventListener("click", changeImage));

mainImage.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);
