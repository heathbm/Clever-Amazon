$(document).ready(function()
{
    $.ajax({ url: '../php/sendmail.php' });
});

$("#slider").rangeSlider({
    bounds: {
        min: 0,
        max: 100
    },
    defaultValues: {
        min: 50,
        max: 100
    }
});

var url = "http://www.amazon.co.uk/s?";
var departmentSelected = false;

function getSlideValues() {
    return $("#slider").rangeSlider("values");
}

function resetUrl() {
    url = "http://www.amazon.co.uk/s?";
    departmentSelected = false;
}

function addAmpersand() {
    url += "&";
}

function emptyCheck(value) {
    return value != undefined || value != null || value == false;
}

function submit() {
    resetUrl();
    setNode();
    setKeywords();
    setLowPrice();
    setMaxPrice();
    setPercentages();
    setRating();
    setSort();
    setDeliveryOptions();
    sendToAmazon();
}

function setNode() {
    var department = $("#department option:selected").val();
    var subDepartment = $("#sub_category option:selected").val();

    url += "node=";

    if(department != "null") {
        departmentSelected = true;
    }

    if(emptyCheck(subDepartment)) {
        url += subDepartment;
    } else {
        url += department;
    }

    addAmpersand();
}

function setKeywords() {
    var keywords = $("#keywords").val();

    if(emptyCheck(keywords)) {
       url += "keywords=" +  keywords;
       addAmpersand();
    }
}

function setLowPrice() {
    var minPrice = $("#min_price_select option:selected").val();

    if(emptyCheck(minPrice)) {
        url += "low-price=" + minPrice;
        addAmpersand();
    }
}

function setMaxPrice() {
    var maxPrice = $("#max_price_select option:selected").val();

    if(emptyCheck(maxPrice)) {
        url += "high-price=" + maxPrice;
        addAmpersand();
    }
}

function setSort() {
    var sortBy = $("#sort_by option:selected").val();

    if(emptyCheck(sortBy)) {
        url += "sort=" + sortBy;
        addAmpersand();
    }
}

function setPercentages() {
    var silderValues = getSlideValues();
    var minPercentage = Math.round(silderValues.min);
    var maxPercentage = Math.round(silderValues.max);

    url += "pct-off=" + minPercentage + "-" + maxPercentage;
    addAmpersand();
}

function setRating() {
    var param = "p_72=";
    var addParam = false;

    if(isChecked("#5-star")) {
        addParam = true;
        param += "5";
    } else if(isChecked("#4-star")) {
        addParam = true;
        param += "4-";
    } else if(isChecked("#3-star")) {
        addParam = true;
        param += "3-";
    } else if(isChecked("#2-star")) {
        addParam = true;
        param += "2-";
    } else if(isChecked("#1-star")) {
        addParam = true;
        param += "1-";
    }

    if(addParam) {
        url += param;
        addAmpersand();
    }
}

function isChecked(id) {
    return $(id).is(":checked");
}

function setDeliveryOptions() {
    var freeDelivery = $("#free_delivery").is(":checked");
    var primeDelivery = $("#prime_delivery").is(":checked");

    if(freeDelivery == true && primeDelivery == true) {
        if(departmentSelected == true) {
            url += "p_76=419159031|419158031";
        } else {
            url += "p_76=1-|1|419159031|419158031";
        }
    } else if(freeDelivery == true) {
        url += "p_76=1";
    } else if(primeDelivery == true) {
        url += "p_76=1-";
    }
}

function sendToAmazon() {
    var win = window.open(url, '_blank');
    win.focus();
}



$('#department').change(function() {
    var Dept = $(this).val();
    populateSubCategroies(subCategroy[Dept]);
});

function populateSubCategroies(subCategroies) {
    $("#sub_category").empty();
    select = document.getElementById('sub_category');

    for ( property in subCategroies ) {
        option = document.createElement('option');
        option.value = property;
        option.text = subCategroies[property.toString()];
        select.add( option );
    }
}

var subCategroy = {

    "560798" : { // Electronics
    1345741031: 'Accessories',
    560834: 'Camera & Photo',
    3030781: 'Car & Vehicle Electronics',
    949408031: 'Computers & components',
    1345925031: 'eBook & Readers',
    4085821: 'HiFi & Audio',
    560858: 'Home Cinema, TV & Video',
    1340509031: 'Mobile Phones',
    560884: 'Portable Sound & Vision',
    1348422031: 'Radio Communication',
    389514011: 'Sat Nav, GPS & Navigation', 
    1340513031: 'Telephones, VOIP & Accessories'
    },

    "10745681" : { // furniture
    11712161: 'Beds',
    1345925031: 'Living Room',
    4085821: 'Tables',
    560858: 'TV Stands & Wall Brackets',
    2850808031: 'Bedroom',
    2850889031: 'Home Office',
    2850890031: 'Kitchen'
    },

    "11052671" : { // garden
        11714771: 'BBQ & Outdoor Dining',
        451114031: 'Bird & Wildlife Care',
        4583420031: 'Decking & Fencing',
        11714501: 'Carden Decor',
        11714171: 'Garden Furniture & Accessories',
        11714761: 'Mowers & Outdoor Power Tools',
        4270178031: 'Outdoor Heaters & Fire Pits',
        10709361: 'Outdoor Lighting',
        4364564031: 'Pools, Hot Tubs & Supplies'
    },

    "11052681" : { // kitchen
        3063457031: 'Arts & Crafts',
        14279821: 'Artwork',
        10709131: 'Bathroom',
        11716391: 'Bedding & Linens',
        376320011: 'Home Accessories',
        10709301: 'Indoor Lighting',
        3313444031: 'Laundry, Storage & Organisation'
    },

    "59624031" : { // baby
        60046031: 'Activity & Entertainment',
        364061031: 'Baby & Toddler Toys',
        60538031: 'Baby Carriers',
        1730632031: 'Baby Clothing',
        1902084031: 'Nursery',
        60043031: 'Pushchairs, Prams & Accessories'
    },

    "65801031" : { // health
        2991665031: 'Baby & Child Care',
        74129031: 'Bath & Body',
        66476031: 'Dental Care',
        2826465031: 'Diet & Nutrition',
        3787506031: 'Electronic Cigarettes & Accessories',
        2825218031: 'Medical Supplies & Equipment',
        2825219031: 'Medication & Remedies'
    },

    "79903031" : { // DIY
        1937992031: 'Building Supplies',
        1938263031: 'Electrical',
        1938353031: 'Hardware',
        1938722031: 'Kitchen & Bath Fixtures',
        1938784031: 'Painting Supplies & Tools',
        1939527031: 'Safety & Security'
    },

    "83450031" : { // clothing
        1731296031: 'Women',
        1730929031: 'Men',
        1730841031: 'Girls',
        1730756031: 'Boys',
        1730632031: 'Baby',
        1731041031: 'Novelty & Special Use'
    },

    "192413031" : { // Office
        9469007031: 'Art & Craft Supplies',
        197750031: 'Calendars & Planners',
        197746031: 'Office Electronics',
        197745031: 'Office Paper Products',
        197743031: 'Office Supplies',
        197748031: 'Pens, Pencils & Writing Supplies'
    },

    "193716031" : { // jewllery
        10382835031: 'Women',
        10382834031: 'Men',
        10382833031: 'Girls',
        10382832031: 'Boys',
        5831994031: 'Novelty & Special Use',
        197336031: 'Accessories'
    },

    "248877031" : { // car
        60036031: 'Baby Car Seats & Accessories',
        303891031: 'Car & Motorbike Care',
        3013843031: 'Car & Vehicle Electronics',
        301308031: 'Car Accessories',
        301309031: 'Car Parts',
        301311031: 'Motorbikes, Accessories & Parts'
    },

    "318949011" : { // sports
        4379836031: 'Bags & Backpacks',
        319545011: 'Camping & Hiking',
        324144011: 'Cycling',
        324129011: 'Fishing',
        319535011: 'Fitness',
        324115011: 'Golf',
        116189031: 'Sports & Outdoor Clothing',
        1770082031: 'Sports & Outdoor Shoes',
        461182031: 'Sports Technology',
        319542011: 'Water Sports'
    },

    "328228011" : { // watches
        10103527031: 'Women',
        10103528031: 'Men',
        10103529031: 'Girls',
        10103530031: 'Boys',
        199485031: 'Accessories'
    },

    "340837031" : { // music
        406551031: 'Bass Guitars & Gear',
        407674031: 'DJ & VJ Equipment',
        5496113031: 'Drums & Percussion',
        406550031: 'Guitars & Gear',
        267378: 'Scores, Songbooks & Lyrics'
    },

    "340840031" : { // pets
        451109031: 'Cats',
        451110031: 'Dogs',
        451111031: 'Fish & Aquatic Pets',
        471521031: 'Horses',
        451113031: 'Small Animals'
    },

    "355005011" : { // stuff
        1769551031: 'Handbags & Shoulder Bags',
        1769533031: 'Shoe Accessories',
        1769609031: 'Shoes',
        11967999031: 'Wallets, Card Cases & Money Organizers'
    },

    "595312" : { // toys
        364046031: 'Arts & Crafts',
        364061031: 'Baby & Toddler Toys',
        5231675031: 'Die-Cast & Toy Vehicles',
        364108031: 'Fancy Dress',
        364143031: 'Games',
        5230707031: 'Hobbies',
        364248031: 'Jigsaws & Puzzles',
        364234031: 'Party Supplies',
        364240031: 'Soft Toys'
    },

    "676193011" : { // videogames
        676194011: 'Action & Shooter',
        676201011: 'Adenture',
        676202011: 'Arcade & Platform',
        676209011: 'Racing',
        676215011: 'Simulation',
        676219011: 'Sports',
        676233011: 'Strategy'
    },

    "229816" : { // music
        557264: 'Blues',
        499368: 'Childrens Music, Plays & Stories',
        697386: 'Classical',
        231177: 'Country',
        231183: 'Dance & Electronic',
        231219: 'Easy Listening',
        358899031: 'Folk',
        690892: 'Hard Rock & Metal',
        231193: 'Indie & Alternative',
        231201: 'Jazz',
        694208: 'Pop',
        231239: 'Rock'
    },

    "266239" : { // books
        91: 'Art, Architecture & Photography',
        67: 'Biography',
        68: 'Business, Finance & Law',
        69: 'Childrens Books',
        71: 'Computing & Internet',
        72: 'Crime, Thrillers & Mystery',
        496792: 'Education Studies & Teaching',
        62: 'Fiction',
        74: 'Health, Family & Lifestyle',
        65: 'History',
        64: 'Home & Garden',
        57: 'Science & Nature',
        60: 'Society, Politics & Philosophy'
    }
}