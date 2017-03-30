/**************************
**  Glass Family ViewModel
***************************/
//helper functions
function createStringPair(name, value) {
    return name + "=" + value + ";";
}

//Member model
function GlassFamilyMember(initialShirtColor, initialGender, initialPantColor, initialDressColor, initialType) {
    var self = this;
    this.memberName = ko.observable();
    this.shirtColor = ko.observable(initialShirtColor);
    this.pantColor = ko.observable(initialPantColor);
    this.dressColor = ko.observable(initialDressColor);
    this.gender = ko.observable(initialGender);
    this.memberType = ko.observable(initialType);
    this.isMale = ko.computed(function () {
        return self.gender().optionValue == "Male";
    });

    //property returns a formatted string that represents the values for this family member
    this.memberDetailString = function () {
        var details = "";
        details = createStringPair("Type", self.memberType().optionValue);
        details += createStringPair("Name", self.memberName());
        details += createStringPair("Gender", self.gender().optionText);

        if (self.isMale()) {
            details += createStringPair("Shirt", self.shirtColor().colorText);
            details += createStringPair("Pants", self.pantColor().colorText);
        } else {
            details += createStringPair("Dress", self.dressColor().colorText);
        }
        return details;
    };
}

//Family model
function GlassFamilyModel() {
    var self = this;
    // Non-editable Lists
    this.colorList = [
        { colorText: "Amazon Green", styleName: "color-amazonGreen" },
        { colorText: "Black", styleName: "color-black" },
        { colorText: "Crystal Opal Pink", styleName: "colorPink" },
        { colorText: "Dark Green", styleName: "color-darkGreen" },
        { colorText: "Lilac", styleName: "color-lilac" },
        { colorText: "Medium Blue", styleName: "color-mediumBlue" },
        { colorText: "Persimmon", styleName: "color-persimmon" },
        { colorText: "Red", styleName: "color-red" },
        { colorText: "Sunflower", styleName: "color-sunflower" },
        { colorText: "Turquoise Blue", styleName: "color-turquoiseBlue" },
        { colorText: "White", styleName: "color-white" }
    ];

    this.memberTypeList = [
    { optionText: "Adult", optionValue: "Adult" },
    { optionText: "Child", optionValue: "Child" }
    ];

    this.memberGenderList = [
        { optionText: "Male", optionValue: "Male" },
        { optionText: "Female", optionValue: "Female" }
    ];

    this.priceList = [
        { memberNumber: 1, price: 35, priceDisplay: "$35.00" },
        { memberNumber: 2, price: 40, priceDisplay: "$40.00" },
        { memberNumber: 3, price: 45, priceDisplay: "$45.00" },
        { memberNumber: 4, price: 50, priceDisplay: "$50.00" },
        { memberNumber: 5, price: 55, priceDisplay: "$55.00" },
        { memberNumber: 6, price: 60, priceDisplay: "$60.00" },
        { memberNumber: 7, price: 65, priceDisplay: "$65.00" }
    ];

    // Properties
    this.maxNumberOfMembers = 7;
    this.numberOfVisibleMembers = ko.observable(2);
    this.familyName = ko.observable();
    this.familyMembers = ko.observableArray([
        new GlassFamilyMember(self.colorList[1], self.memberGenderList[0], self.colorList[1], self.colorList[1], self.memberTypeList[0]),
         new GlassFamilyMember(self.colorList[1], self.memberGenderList[1], self.colorList[1], self.colorList[1], self.memberTypeList[0]),
         new GlassFamilyMember(self.colorList[1], self.memberGenderList[0], self.colorList[1], self.colorList[1], self.memberTypeList[0]),
         new GlassFamilyMember(self.colorList[1], self.memberGenderList[0], self.colorList[1], self.colorList[1], self.memberTypeList[0]),
         new GlassFamilyMember(self.colorList[1], self.memberGenderList[0], self.colorList[1], self.colorList[1], self.memberTypeList[0]),
         new GlassFamilyMember(self.colorList[1], self.memberGenderList[0], self.colorList[1], self.colorList[1], self.memberTypeList[0]),
        new GlassFamilyMember(self.colorList[1], self.memberGenderList[0], self.colorList[1], self.colorList[1], self.memberTypeList[0])
    ]);
    this.itemName = ko.computed(function () {
        return self.numberOfVisibleMembers() + " Person Glass Family";
    });

    this.editMode = ko.observable(true);

    this.totalPrice = ko.computed(function () {
        return self.priceList[self.numberOfVisibleMembers() - 1].price;
    });
    this.totalDisplayPrice = ko.computed(function () {
        return self.priceList[self.numberOfVisibleMembers() - 1].priceDisplay;
    });
}




var model = new GlassFamilyModel();
//var cookies;
//var jsonData = "";

//for (var block = 0; block < 10; block++) {
//    var value = $.cookie("modelJSON_" + block);
//    if (value)
//        jsonData += value;
//    else
//        break;
//}

//if (jsonData) {
//    var modelJSON = JSON.parse(jsonData);
//    model.familyName(modelJSON.familyName);
//   THE ABOVE WORKS... BUT WOULD BE LABOURIOUS TO POPULATE ALL CHILDREN, LOOK INTO THE MAPPING PLUGIN
//}



// Activates knockout.js
ko.applyBindings(model);