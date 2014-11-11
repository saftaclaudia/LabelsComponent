
$(document).ready(function() {
	var labels = labelsComponents('labels');
	var hobbies = labelsComponents('hobbies');
	console.log(labels.getNumber);
	console.log(hobbies.getNumber);
	labels.addLabel('food');
	hobbies.addLabel('painting');
	labels.maxInput(10);
	hobbies.maxInput(10);
});
