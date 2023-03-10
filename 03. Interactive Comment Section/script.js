const commentsContainer = document.getElementById("comments-container");
let currentUser;
const populateComments = (comments) => {
	comments.forEach((comment) => {
		const commentEl = getCommentUI(comment);
		commentsContainer.appendChild(commentEl);
		if (!comment.replies.length) return;
		const commentChildren = document.createElement("div");
		commentsContainer.appendChild(commentChildren);
		getCommentChildren(commentChildren, comment);
	});
};

const populateUserDetails = (user) => {
	console.log(user.image.png);
	document.getElementById("user-img-mobile").src = user.image.png;
	document.getElementById("user-img-desktop").src = user.image.png;
};

const getComments = async () => {
	const res = await fetch("./data.json");
	const data = await res.json();
	currentUser = data.currentUser;
	console.log(currentUser);
	populateComments(data.comments);
	populateUserDetails(data.currentUser);
};
getComments();

function getCommentChildren(commentChildren, comment) {
	commentChildren.classList.add("flex", "gap-6", "pl-4");
	commentChildren.innerHTML = `<div class="bg-lightGray my-2 self-stretch items-stretch w-2"></div><div id='comment-children-container-${comment.id}'></div>`;
	comment.replies.forEach((reply) => {
		let commentChildContainer = document.getElementById(`comment-children-container-${comment.id}`);
		const commentChildEl = getCommentUI(reply, true);
		commentChildContainer.appendChild(commentChildEl);
	});
}

function getCommentUI(comment, isChild = false) {
	const commentEl = document.createElement("div");
	const curUser = comment.user.username === currentUser.username;
	commentEl.innerHTML = `
        <div class="w-full bg-white my-2 ${
					!isChild && comment.replies.length === 0 ? "mb-4" : ""
				} rounded-2xl p-4 flex gap-6 sm:p-6">
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
                <div class="font-700 text-darkBlue">${comment.user.username} </div>${
		curUser ? "<div class='bg-moderateBlue text-white py-0.5 px-2 rounded-md'>you</div>" : ""
	}
                <div class="text-grayishBlue">${comment.createdAt}</div>
                <div class="hidden ml-auto sm:block">

                    ${
											curUser
												? `<div class="flex items-center gap-4">
                                        <div class='flex gap-2 items-center'>
                                        <img class="w-4 h-4" src="./images/icon-delete.svg" alt="" />
                <span class="text-softRed font-700">Delete</span>
                </div>
                <div class='flex gap-2 items-center'>
                <img class="w-4 h-4" src="./images/icon-edit.svg" alt="" />
                <span class="text-moderateBlue font-700">Edit</span>
            </div></div>`
												: `<div class="flex items-center gap-2">
                    <img class="w-4 h-4" src="./images/icon-reply.svg" alt="" />
                    <span class="text-moderateBlue font-700">Reply</span>
                </div>`
										}
                </div>
            </div>
            <div class="mt-4 text-grayishBlue">
            ${
							isChild
								? `<span class='font-bold text-moderateBlue'>@${comment.replyingTo}</span> ${comment.content}`
								: `${comment.content}`
						} 
            </div>
            <div class="flex justify-between items-center mt-4 sm:hidden">
                <div class="bg-lightGray px-4 py-2 rounded-xl flex gap-4">
                    <span class="text-lightGrayishBlue font-700">+</span
                    ><span class="text-moderateBlue font-700">${comment.score}</span
                    ><span class="text-lightGrayishBlue font-700">-</span>
                </div>
                ${
									curUser
										? `<div class="flex items-center gap-4">
                                        <div class='flex gap-2 items-center'>
                                        <img class="w-4 h-4" src="./images/icon-delete.svg" alt="" />
                <span class="text-softRed font-700">Delete</span>
                </div>
                <div class='flex gap-2 items-center'>
                <img class="w-4 h-4" src="./images/icon-edit.svg" alt="" />
                <span class="text-moderateBlue font-700">Edit</span>
            </div></div>`
										: `<div class="flex items-center gap-2">
                    <img class="w-4 h-4" src="./images/icon-reply.svg" alt="" />
                    <span class="text-moderateBlue font-700">Reply</span>
                </div>`
								}
            </div>
        </div>
    </div>
        `;
	return commentEl;
}
