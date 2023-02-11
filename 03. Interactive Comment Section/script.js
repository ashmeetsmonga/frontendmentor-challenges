const commentsContainer = document.getElementById("comments-container");

const populateComments = (data) => {
	const { comments } = data;
	console.log(comments);
	comments.forEach((comment) => {
		const commentEl = getCommentUI(comment);
		const commentChildren = document.createElement("div");
		commentChildren.classList.add("flex", "gap-6", "pl-4");
		commentChildren.innerHTML = `<div class="bg-lightGray my-2 self-stretch items-stretch w-2"></div><div id='comment-children-container-${comment.id}'></div>`;
		commentsContainer.appendChild(commentEl);
		commentsContainer.appendChild(commentChildren);
		comment?.replies.forEach((reply) => {
			let commentChildContainer = document.getElementById(
				`comment-children-container-${comment.id}`
			);
			const commentChildEl = getCommentUI(reply);
			console.log(commentChildEl);
			commentChildContainer.appendChild(commentChildEl);
		});
		console.log(commentChildren);
	});
};

const getComments = async () => {
	const data = await fetch("./data.json");
	const comments = await data.json();
	populateComments(comments);
};
getComments();

function getCommentUI(comment) {
	const commentEl = document.createElement("div");
	commentEl.innerHTML = `
        <div class="w-full bg-white my-2 rounded-2xl p-4 flex gap-6 sm:p-6">
        <div class="hidden sm:block">
            <div
                class="bg-lightGray px-4 py-2 rounded-xl flex flex-col items-center justify-around gap-1"
            >
                <span class="text-lightGrayishBlue font-700 text-xl">+</span
                ><span class="text-moderateBlue font-700">${comment.score}</span
                ><span class="text-lightGrayishBlue font-700 text-xl">-</span>
            </div>
        </div>
        <div>
            <div class="w-full flex items-center gap-4">
                <img class="w-10 h-10" src="${comment.user.image.png}" alt="profile-photo" />
                <div class="font-700 text-darkBlue">${comment.user.username}</div>
                <div class="text-grayishBlue">${comment.createdAt}</div>
                <div class="hidden ml-auto sm:block">
                    <div class="flex items-center gap-2">
                        <img class="w-4 h-4" src="./images/icon-reply.svg" alt="" />
                        <span class="text-moderateBlue font-700">Reply</span>
                    </div>
                </div>
            </div>
            <div class="mt-4 text-grayishBlue">
            ${comment.content}
            </div>
            <div class="flex justify-between items-center mt-4 sm:hidden">
                <div class="bg-lightGray px-4 py-2 rounded-xl flex gap-4">
                    <span class="text-lightGrayishBlue font-700">+</span
                    ><span class="text-moderateBlue font-700">${comment.score}</span
                    ><span class="text-lightGrayishBlue font-700">-</span>
                </div>
                <div class="flex items-center gap-2">
                    <img class="w-4 h-4" src="./images/icon-reply.svg" alt="" />
                    <span class="text-moderateBlue font-700">Reply</span>
                </div>
            </div>
        </div>
    </div>
        `;
	return commentEl;
}
