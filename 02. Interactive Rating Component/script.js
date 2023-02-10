const ratings = document.querySelectorAll("#ratings div");
const submitButton = document.querySelector("button");
const finalRating = document.querySelector("#final-rating");
const ratingContainer = document.querySelector("#rating-container");
const submitContainer = document.querySelector("#submit-container");

let rating;

function selectRating() {
	rating = this.innerText;
	ratings.forEach((rating) => {
		rating.classList.remove("bg-primaryOrange", "text-white");
		rating.classList.add(
			"bg-neutralDarkBlue",
			"hover:bg-neutralMediumGray",
			"text-neutralLightGray"
		);
	});
	this.classList.remove(
		"bg-neutralDarkBlue",
		"hover:bg-neutralMediumGray",
		"text-neutralLightGray"
	);
	this.classList.add("bg-primaryOrange", "text-white");
}

ratings.forEach((rating) => rating.addEventListener("click", selectRating));

function submitRating() {
	if (!rating) return;
	finalRating.innerText = rating;

	ratingContainer.classList.toggle("hidden");
	submitContainer.classList.toggle("hidden");
}

submitButton.addEventListener("click", submitRating);
