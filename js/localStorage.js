// Global variables

var petName;
var pet;
var petCollection;


function initialize() 
	{
		var allPets;
		// if there is nothing in localStorage, do nothing!
		// If there is something in localStorage
		// get string, return to usable info with JSON parse and assign to a variable.
		// loop through the variable and create 1 button for each element
		// add pet_name to button.

		if(localStorage.petCollection)
			{
				allPets = [];				
				allPets = JSON.parse(localStorage.getItem('petCollection'));
			}	


		// loop through allPets array and create a button each time. Add the pet name to the button
		for(i=1; i<allPets.length; i++)
			{
				console.log(allPets[i]);
				console.log(allPets[i].pet_name);
				$("#startPageButtonArea").append("<a data-role='button' data-theme = 'c' href=#informationSummary data-corners='true' data-shadow='true' data-wrapperels='span' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c' onclick='getPet()'><span class='ui-btn-inner'><span class='ui-btn-text'>" + allPets[i].pet_name + "</span></span></a>");
			}

		//reset allPets array to empty again in case things change the next time this page is accessed.
		//allPets.length = 0;

	}



// +++++++++++++++   This function deletes a pet from localStorage - +++++++++++++++
// !!!!!!!!   it will need to be changed to reflect key pair values !!!!!!!!
function clearPet() 
	{

	}


// ++++++++++++++ A way of collecting data for a specific pet.  ++++++++++++++++++
// !!!!!! Need to pull the infor from tbPets array !!!!!!!
function getPet() 
	{
		console.log("getPet called.");

		//for (var i in pet) {
		//	console.log(pet[i]);  // this is returning each character of the string
		//	var allpet = JSON.parse(pet[i]);  // getting an unexpected end error
		//	console.log(allpet.pet_name);
		//}

	}

// Adds a pet to the JSON array, creates array if no array exists (first time it is clicked)
function createPet() 
	{
		// ***** Step 1 : check if localStorage contains anything
		// if not - Create something to put pets in and put in LocalStorage

		if(!localStorage.petCollection)
			{
				// create array to hod the pet objects
				petCollection = [];
				// create a blank pet object
				pet = {};
				// push the new pet object into the petCollection array
				petCollection.push(pet);  // removed (localStorage.getItem('petCollection'))
				// save this to localStorage for later
				localStorage.setItem('petCollection', JSON.stringify(petCollection));
			}


		// ***** Step 2
		// create new pet object
		// collect data from form
		// assign to pet object

		pet = {
			pet_name: document.getElementById("textinput1").value,
			pet_breed: document.getElementById("textinput2").value,
			vet_name: document.getElementById("textinput3").value,
			vet_contact: document.getElementById("textinput4").value,
			vet_oohcontact: document.getElementById("textinput5").value,
			ins_name: document.getElementById("textinput6").value,
			ins_contact: document.getElementById("textinput7").value,
			ins_policyNo: document.getElementById("textinput8").value,
			pet_age: document.getElementById("textinput9").value,
			pet_weight: document.getElementById("textinput10").value,
			tmt_flea: document.getElementById("textinput11").value,
			tmt_worm: document.getElementById("textinput12").value,
			tmt_jabs: document.getElementById("textinput13").value
		}

		// create button for the new pet if one exists in that part of the petCollection

		$("#startPageButtonArea").append("<a data-role='button' data-theme = 'c' href=#informationSummary data-corners='true' data-shadow='true' data-wrapperels='span' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c' onclick='getPet()'><span class='ui-btn-inner'><span class='ui-btn-text'>" + pet.pet_name + "</span></span></a>");

		// collect local storage and convert to usable format

		var allCurrentPets = JSON.parse(localStorage.getItem('petCollection'));

		console.log('All current pets stored are: ' + allCurrentPets);

		// push newly made pet object into ex-localStorage thing
		// 
		allCurrentPets.push(pet);

		console.log('current pet is: ' + pet.pet_name)

		// JSON stringify
		// put back in localStorage

		localStorage.setItem('petCollection', JSON.stringify(allCurrentPets));
	}
	