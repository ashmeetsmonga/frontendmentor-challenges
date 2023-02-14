const mainImage = document.getElementById("main-image");
const thumbnailImages = document.querySelectorAll(".thumbnail-image");

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
}

thumbnailImages.forEach((image) => image.addEventListener("click", changeImage));
