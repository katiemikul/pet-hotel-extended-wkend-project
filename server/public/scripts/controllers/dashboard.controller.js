app.controller('DashboardController', ['$http', function($http) {
    let self=this;
    self.message = "Welcome to the Dashboard Page";
    
    self.pet={details: []};

    self.owner={details: []};

    self.newPet={};

    self.resetNewPet = function() {
        self.newTPet = {
            pet_name: '',
            breed: '',
            color: '',
            check_in: 'yes',
        };
    }
    self.resetNewPet();

    self.displayPets = function(){
        console.log('display pets');
        $http({
            method: 'GET',
            url: '/dashboard',
        })
        .then(function (response) {
            console.log('display all pets', response);
            self.pet.details = response.data;
        })
        .catch(function (error) {
            console.log('error on /dashboard GET', error);
        });
    }
    self.displayPets();

    self.addPets = function(){
        console.log('adding pets');
        $http({
            method: 'POST',
            url: '/dashboard',
            data: self.newPet,
        })
        .then(function (response) {
            console.log('added a new pet', response);
            self.newPet = response.data.results;
            self.displayPets();
            self.resetNewPet();
        })
        .catch(function (error) {
            console.log('error on /dashboard Post', error);
        });
    }

    self.displayOwnersDB = function(){
        console.log('display owners for dashboard');
        $http({
            method: 'GET',
            url: '/owners',
        })
        .then(function (response) {
            console.log('display all owners', response);
            self.owner.details = response.data;
        })
        .catch(function (error) {
            console.log('error on /owners GET to dashboard', error);
        });
    }
    self.displayOwnersDB();

    self.deletePet = function (petToDelete) {
        console.log('the pet to delete,', petToDelete);
        
        if(confirm("Are you sure you want to delete this pet?")) {
            // request to server to delete this pet
            $http({
                method: 'DELETE',
                url: `/dashboard/${petToDelete.id}`
            })
                .then(function (response) {
                    console.log('successful delete');
                    self.displayPets();
                    self.displayOwnersDB();
                })
                .catch(function (error) {
                    console.log('error on delete to /dashboard');
                });
        } else {
            console.log('do NOT delete');

        }
        
    }

}])
